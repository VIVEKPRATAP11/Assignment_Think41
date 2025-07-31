const express = require("express");
const { db, initDB } = require("./db");
const cors = require("cors");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Initialize database and load CSV data
initDB(() => {
  console.log("Database initialized and CSV data loaded.");
});

app.get("/", (req, res) => {
  res.send("Backend is running and database is initialized!");
});

// GET /products - return all products
app.get("/products", (req, res) => {
  console.log("GET /products called");
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      console.error("DB error:", err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET /products/:id - return product by id
app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(row);
  });
});

// Fallback 404 handler for all other routes
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
