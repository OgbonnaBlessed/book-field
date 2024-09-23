const port = 4000;
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb+srv://blessed:pDWARrMzRqbXJ5ky@cluster0.bpawe.mongodb.net/book-field")
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
        image_url: `http://localhost:${port}/images/${req.file.fieldname}`
    })
})

app.listen(port, (error) => {
    if (!error) {
        console.log("Server is running on port " + port)
    } else {
        console.log("Error :" + error);
    }
});