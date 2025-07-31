const express = require("express");
const { initDB } = require("./db");
const app = express();
const port = 3001;

app.use(express.json());

// Initialize database and load CSV data
initDB(() => {
  console.log("Database initialized and CSV data loaded.");
});

app.get("/", (req, res) => {
  res.send("Backend is running and database is initialized!");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
