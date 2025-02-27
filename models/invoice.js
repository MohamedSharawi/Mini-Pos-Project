const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["sale", "purchase"], required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 }
  }],
  total: { type: Number, required: true, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model("Invoice", invoiceSchema);

