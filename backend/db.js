const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");

const DB_FILE = "products.db";
const CSV_FILE = "products.csv";

// Initialize SQLite database
const db = new sqlite3.Database(DB_FILE);

function createSchema() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      department TEXT
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
          "INSERT OR REPLACE INTO products (id, name, description, price, department) VALUES (?, ?, ?, ?, ?)"
        );
        products.forEach((product) => {
          stmt.run(
            product.id,
            product.name,
            product.description,
            product.price,
            product.department
          );
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
