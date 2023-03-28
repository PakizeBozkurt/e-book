const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// Connect to PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mylibrary',
  password: 'mypassword',
  port: 5432,
});

// Define a schema for the book model
// eslint-disable-next-line no-unused-vars
const bookSchema = {
  title: 'text',
  author: 'text',
  content: 'text',
};

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define routes for handling CRUD operations on books
const bookRouter = express.Router();

bookRouter.route('/')
  .get((req, res) => {
    // Retrieve all books from the database
    pool.query('SELECT * FROM books', (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result.rows);
      }
    });
  })
  .post((req, res) => {
    // Create a new book and save it to the database
    const book = req.body;
    const values = [book.title, book.author, book.content];
    pool.query('INSERT INTO books (title, author, content) VALUES ($1, $2, $3) RETURNING *', values, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result.rows[0]);
      }
    });
  });

bookRouter
  .route("/:id")
  .get((req, res) => {
    // Retrieve a specific book from the database
    const id = req.params.id;
    pool.query("SELECT * FROM books WHERE id = $1", [id], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.json(result.rows[0]);
      }
    });
  })
  .put((req, res) => {
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
  })
  .delete((req, res) => {
    // Delete a specific book from the database
    const id = req.params.id;
    pool.query("DELETE FROM books WHERE id = $1", [id], (err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.sendStatus(204);
      }
    });
  });

// Register the bookRouter and start the server
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
