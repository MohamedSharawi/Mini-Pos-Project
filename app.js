const express = require("express");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const productRoutes = require("./routes/product.js");
const invoiceRoutes = require("./routes/invoice.js");
const authMiddleware = require("./middleware/authMiddleware.js");

dotenv.config({ path: "./config/.env" });
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();
app.use("/auth", authRoutes);
app.use("/products", authMiddleware, productRoutes);
app.use("/invoices", authMiddleware, invoiceRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
