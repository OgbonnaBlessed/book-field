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
    image: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        reqiured: true,
    },
    priceCent:{
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

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        priceCent: req.body.priceCent,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API to remove product
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API to get all products
app.get('/allproducts', async (req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
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

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port)
    } else {
        console.log("Error :" + error);
    }
});