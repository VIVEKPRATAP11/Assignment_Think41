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

  app.get("/", (req, res) => {
    res.send("Backend is running and database is initialized!");
  });

  // GET /products - return all products or filter by department_id
  app.get("/products", (req, res) => {
    console.log("GET /products called");
    const departmentId = req.query.department_id;
    let query = `SELECT products.*, departments.name AS department_name FROM products LEFT JOIN departments ON products.department_id = departments.id`;
    let params = [];
    if (departmentId) {
      query += " WHERE products.department_id = ?";
      params.push(departmentId);
    }
    db.all(query, params, (err, rows) => {
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

  // GET /departments - return all departments
  app.get("/departments", (req, res) => {
    db.all("SELECT * FROM departments", [], (err, rows) => {
      if (err) {
        console.error("DB error:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json(rows);
    });
  });

  // Fallback 404 handler for all other routes
  app.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
