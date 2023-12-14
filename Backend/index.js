
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const Product = require("./models/ecommerceModel");
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cookieParser());
app.use(
  session({
    secret: 'abc123', // Change this to a secure secret key
    resave: false,
    saveUninitialized: true,
  })
);



mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!");
    console.log(err);
  });


// API endpoint to get products
app.get('/api/products', async (req, res) => {
    console.log("In route")
  const products = await Product.find();
  res.json(products);
});


app.post("/api/products", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = new Product({ name, price, description });
    const result = await product.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API endpoint to add a product to the cart
app.post('/api/cart/:productId', (req, res) => {
  
  const productId = req.params.productId;
  console.log("In route id:", productId)

  // Check if the cart exists in the session, if not, create it
  if(req.session.cart){
    console.log("Cart exists")
  }
  else{
    console.log("Cart does not exist")
  }
  req.session.cart = req.session.cart || [];

  console.log("Cart 1:", req.session.cart)
  // Add the product to the cart
  req.session.cart.push(productId);
  console.log("Cart 2:", req.session.cart)
  console.log(req.session)


  res.json({ cart: req.session.cart });
});

// API endpoint to get the products in the cart
app.get('/api/cart', async (req, res) => {
  // Retrieve product details from the cart
  console.log("Cart 3:", req.session)
  const cartProducts = await Product.find({ _id: { $in: req.session.cart } });
  console.log("Cart products:", cartProducts)

  res.json(cartProducts);
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
