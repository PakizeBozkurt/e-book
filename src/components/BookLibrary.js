import React from "react";
import { Link } from "react-router-dom";

function BookLibrary({ books }) {
  return (
    <div>
      <h1>My Library</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookLibrary;
