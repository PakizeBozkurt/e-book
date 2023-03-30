import React from "react";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import BookLibrary from "./components/BookLibrary";
import BookReader from "./components/BookReader";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BookLibrary />} />
        <Route path="/books/:id" element={<BookReader />} />
      </Routes>
    </div>
  );
}

export default App;
