const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const app = express();
const port = 3011;
const cors = require("cors");

// Connect to PostgreSQL database
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mybookapp",
  password: "CYFStudent123",
  port: 5432,
});

app.use(cors());

// Configure middleware

app.use(bodyParser.json());

app.get("/books", (req, res) => {
  // Retrieve all books from the database
  pool.query("SELECT * FROM books", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result.rows);
    }
  });
});

app.post((req, res) => {
  // Create a new book and save it to the database
  const book = req.body;
  const values = [book.title, book.author, book.content];
  pool.query(
    "INSERT INTO books (title, author, content) VALUES ($1, $2, $3) RETURNING *",
    values,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});

app.get((req, res) => {
  // Retrieve a specific book from the database
  const id = req.params.id;
  pool.query("SELECT * FROM books WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.json(result.rows[0]);
    }
  });
});

app.put((req, res) => {
  // Update a specific book in the database
  const id = req.params.id;
  const book = req.body;
  const values = [book.title, book.author, book.content, id];
  pool.query(
    "UPDATE books SET title = $1, author = $2, content = $3 WHERE id = $4 RETURNING *",
    values,
    (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result.rows[0]);
      }
    }
  );
});
app.delete((req, res) => {
  // Delete a specific book from the database
  const id = req.params.id;
  pool.query("DELETE FROM books WHERE id = $1", [id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
