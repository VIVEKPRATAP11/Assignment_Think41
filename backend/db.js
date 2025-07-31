const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

const DB_FILE = "products.db";
const CSV_FILE = "products.csv";

// Initialize SQLite database
const db = new sqlite3.Database(DB_FILE);

function createSchema() {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS products`);
    db.run(`DROP TABLE IF EXISTS departments`);
    db.run(`CREATE TABLE departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL
    )`);
    db.run(`CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      department_id INTEGER,
      image TEXT,
      brand TEXT,
      rating TEXT,
      stock TEXT,
      color TEXT,
      features TEXT,
      FOREIGN KEY(department_id) REFERENCES departments(id)
    )`);
  });
}

function loadCSVData(callback) {
  const products = [];
  const departmentsSet = new Set();
  fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
      if (row.department) {
        departmentsSet.add(row.department.trim());
      }
    })
    .on("end", () => {
      db.serialize(() => {
        // Insert unique departments
        const deptInsert = db.prepare(
          "INSERT OR IGNORE INTO departments (name) VALUES (?)"
        );
        departmentsSet.forEach((dept) => {
          deptInsert.run(dept);
        });
        deptInsert.finalize();

        // Build department name to id map
        db.all("SELECT id, name FROM departments", (err, rows) => {
          if (err) {
            console.error("Error fetching departments:", err.message);
            if (callback) callback();
            return;
          }
          const deptMap = {};
          rows.forEach((row) => {
            deptMap[row.name] = row.id;
          });

          // Insert products with department_id
          const stmt = db.prepare(
            "INSERT OR REPLACE INTO products (id, name, description, price, department_id, image, brand, rating, stock, color, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
          );
          products.forEach((product) => {
            if (
              product.id &&
              product.name &&
              product.price &&
              product.department &&
              product.image &&
              product.brand &&
              product.rating &&
              product.stock &&
              product.color &&
              product.features
            ) {
              const deptId = deptMap[product.department.trim()];
              if (!deptId) {
                console.warn("No department id for:", product.department);
                return;
              }
              console.log("Inserting product:", product);
              stmt.run(
                product.id,
                product.name,
                product.description,
                product.price,
                deptId,
                product.image,
                product.brand,
                product.rating,
                product.stock,
                product.color,
                product.features,
                function (err) {
                  if (err) {
                    console.error(
                      "Error inserting product:",
                      product,
                      err.message
                    );
                  }
                }
              );
            } else {
              console.warn("Skipping incomplete product row:", product);
            }
          });
          stmt.finalize();
          if (callback) callback();
        });
      });
    });
}

function initDB(callback) {
  createSchema();
  loadCSVData(callback);
}

module.exports = {
  db,
  initDB,
};
