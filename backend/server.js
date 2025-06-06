require('dotenv').config();
const express = require("express")
const cors = require("cors")
const path = require("path");

const connectDB = require('./config/db')

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');

const app = express()

app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/uploads', express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Routes
app.use("/auth", authRoutes)
app.use("/product", productRoutes)
app.use("/category", categoryRoutes)

// Connection
const PORT = process.env.PORT || 3000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    })
})



