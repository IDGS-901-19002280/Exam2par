const express = require("express");
const cors = require("cors");
const productsData = require("./products.json");

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json(productsData);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsData.products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
