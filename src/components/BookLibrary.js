import React, { useState, useEffect } from "react";


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
          <div>
            <li key={book.id}>{book.title}</li>
            <li>{book.author}</li>
            <li>{book.description}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default BookLibrary;
