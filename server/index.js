const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");

const app = express();
app.use(express.json);

//routes

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/blog", (req, res) => {
  res.send("welcome to blogs");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    const products = await Product.create(req, body);
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose.set("strictQuery", false); //if it shows error about strictQuery

mongoose
  .connect(
    "mongodb+srv://ashok:ashok@cluster2.pyrxxed.mongodb.net/sampletodocollection?retryWrites=true&w=majority&appName=Cluster2"
  )
  .then(() => {
    console.log("databse connected");
    app.listen(3000, () => console.log("node api app running on port 3000"));
  })
  .catch((error) => console.log(error));
