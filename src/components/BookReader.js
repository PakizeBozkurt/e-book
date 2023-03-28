import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookReader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  // Fetch the book with the specified ID from the API
  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.log(error));
  }, [id]);

  return (
    <div>
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
