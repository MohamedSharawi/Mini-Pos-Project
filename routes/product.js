const express = require("express");
const Product = require("../models/product.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, price, stock } = req.body;

  const newProduct = new Product({ name, price, stock });
  await newProduct.save();
  res.status(201).json(newProduct);
});

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.put("/:id", async (req, res) => {
  await Product.findByIdAndUpdate(req.params.id, req.body);
  res.send("Product updated");
});

router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted");
});

module.exports = router;
