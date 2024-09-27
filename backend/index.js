const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const { type } = require("os");

dotenv.config()

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGODB)
.then(() => {
    console.log('MongoDB is connected');
})
.catch((err) => {
    console.log(err)
});


// API creation
app.get("/", (req, res) => {
    res.send("Express app is running");
})

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage:storage });

// Creating upload endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products
const Product = mongoose.model("Product", {
    id:{
        type: Number,
        requred: true,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        reqiured: true,
    },
    priceCents:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }
});

// API to add all products

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;

    if(products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else {
        id = 1
    }

    // if (products.length > 0) {

    //     function Str_Random(length) {
    //         id = '';
    //         const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            
    //         // Loop to generate characters for the specified length
    //         for (let i = 0; i < length; i++) {
    //             const randomInd = Math.floor(Math.random() * characters.length);
    //             id += characters.charAt(randomInd);
    //         }
    //         return id;
    //     }

    //     Str_Random(20);
    // } else {
    //     id = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    // }
    

    const product = new Product({
        id: id,
        name: req.body.name,
        author: req.body.author,
        image: req.body.image,
        category: req.body.category,
        priceCents: req.body.priceCents,
    });

    await product.save();
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API to remove product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });

    res.json({
        success: true,
        name: req.body.name,
    })
})

// API to get all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    res.send(products);
});

// Schema for the user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData:{
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

app.post('/signup', async (req, res) => {
    let checkEmail = await Users.findOne({ email: req.body.email });

    if (checkEmail) {
        return res.status(400).json({ success: false, errors: "existing user found" });
    }

    let cart = {};

    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
        
    }

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save()

    const data = {
        user: {
            id: user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
});

// Creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });

    if (user) {
        const comparePassword = req.body.password === user.password;

        if (comparePassword) {
            const data = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });

        } else {
            res.json({ success: false, errors: "Wrong password"});
        }

    } else {
        res.json({ success: false, errors: "Incorrect email address"});
    }
});

// Create endpoint for newcollection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);

    res.send(newcollection);
})

// Create endpoint for popular data
app.get('/popular', async (req, res) => {
    let products = await Product.find({ category: "Trending" });
    let popular = products.slice(0, 4);

    res.send(popular);
});

// Create middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid"})
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();

        } catch (error) {
            res.status(401).send({ errors: "Please authenticate"})
        }
    }
}

// Creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    // console.log("Added", req.body.itemId);

    let userData = await Users.findOne({ _id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findByIdAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Added");
});

// Creating endpoint for adding products in cartdata
app.post('/removefromcart', fetchUser, async (req, res) => {
    // console.log("removed", req.body.itemId);

    let userData = await Users.findOne({ _id:req.user.id});

    if (userData.cartData[req.body.itemId] > 0) {
        userData.cartData[req.body.itemId] -= 1;
    }

    await Users.findByIdAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
});

// Creating endpoint to fetch cart data
app.post('/getcartitems', fetchUser, async (req, res) => {
    // console.log("Get Cart");

    let userData = await Users.findOne({ _id: req.user.id });
    res.json(userData.cartData);

})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port)
    } else {
        console.log("Error :" + error);
    }
});