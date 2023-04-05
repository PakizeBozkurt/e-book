import React from 'react'
import {Routes, Route} from "react-router";
import BookLibrary from './BookLibrary';
import BookReader from './BookReader';
import Search from './Search';

function Paths() {
  return (
    <div>
      <Routes>
      <Route path="/" element={<Search />} />
        <Route path="/" element={<BookLibrary />} />
        <Route path="/books/:id" element={<BookReader />} />
      </Routes>
    </div>
  );
}

export default Paths;
