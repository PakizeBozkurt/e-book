import React from 'react'
import {Routes, Route} from "react-router";
import BookLibrary from './BookLibrary';
import BookReader from './BookReader';

function Paths() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookLibrary />} />
        <Route path="/books/:id" element={<BookReader />} />
      </Routes>
    </div>
  );
}

export default Paths;
