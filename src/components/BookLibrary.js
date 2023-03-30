import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BookLibrary() {
  const [books, setBooks] = useState([]);

  // Fetch all books from the API
  useEffect(() => {
    fetch("http://localhost:3011/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);
  console.log(books);
  return (
    <div>
      <h1>My Library</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title, book.author, book.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookLibrary;
