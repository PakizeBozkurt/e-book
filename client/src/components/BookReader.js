import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Main.css"

function BookReader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // Fetch the book with the specified ID from the API
  useEffect(() => {
    fetch(`http://localhost:3011/books`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      {book ? (
        <>
          <h1>{book.title}</h1>
          <p>{book.content}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BookReader;
