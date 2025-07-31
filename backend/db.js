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
    db.run(`CREATE TABLE products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price TEXT,
      department TEXT,
      image TEXT,
      brand TEXT,
      rating TEXT,
      stock TEXT,
      color TEXT,
      features TEXT
    )`);
  });
}

function loadCSVData(callback) {
  const products = [];
  fs.createReadStream(CSV_FILE)
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
    })
    .on("end", () => {
      db.serialize(() => {
        const stmt = db.prepare(
          "INSERT OR REPLACE INTO products (id, name, description, price, department, image, brand, rating, stock, color, features) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        products.forEach((product) => {
          // Only insert if all required fields are present
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
            console.log("Inserting product:", product);
            stmt.run(
              product.id,
              product.name,
              product.description,
              product.price,
              product.department,
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
}

function initDB(callback) {
  createSchema();
  loadCSVData(callback);
}

module.exports = {
  db,
  initDB,
};
