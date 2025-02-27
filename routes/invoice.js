const express = require("express");
const Invoice = require("../models/invoice.js");
const Product = require("../models/product.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();


router.post("/", authMiddleware, async (req, res) => {
  const { type, items } = req.body;
  let total = 0;

  for (let item of items) {
    const product = await Product.findById(item.product);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (type === "sale" && product.stock < item.quantity) {
      return res.status(400).json({ error: `Not enough stock for ${product.name}` });
    }

    total += product.price * item.quantity;

    product.stock += type === "sale" ? -item.quantity : item.quantity;
    await product.save();
  }

  const invoice = new Invoice({ userId: req.user.userId, type, items, total });
  await invoice.save();
  res.status(201).json(invoice);
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("userId", "name email").populate("items.product", "name price");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching invoices" });
  }
});

module.exports = router;
