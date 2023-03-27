import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BookLibrary from "./components/BookLibrary";
import BookReader from "./components/BookReader";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);

  // Fetch all books from the API
  useEffect(() => {
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <BookLibrary books={books} />
          </Route>
          <Route path="/books/:id">
            <BookReader />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
