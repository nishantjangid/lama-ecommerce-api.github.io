const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripe");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then( () => console.log("Connection successfull"))
.catch(err => console.log(`Something went wrong ${err}`));

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/users", authRoutes);

// PRODUCT ROUTES
app.use("/api/products", productRoutes);

// CART ROUTES
app.use("/api/carts", cartRoutes);

// ORDER ROUTES
app.use("/api/orders", orderRoutes);

// STRIPE ROUTES
app.use("/api/checkout", stripeRoutes);

app.listen(process.env.APP_PORT, () => {
    console.log(`Server is up to running on port ${process.env.APP_PORT}`);
})