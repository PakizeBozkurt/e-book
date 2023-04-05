import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Content from "./pages/Content";
import Footer from "./pages/Footer";

import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const searchQuery = (e) => {
    setPageCount(1);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [pageCount]);

  const fetchData = () => {
    setLoading(true);
    fetch(
      "https://openlibrary.org/search.json?q=" +
        query +
        "&limit=10&page=" +
        pageCount
    )
      .then((res) => res.json())
      .then((data) => {
        data.numFound ? setData(data) : setData(null);
        setLoading(false);
      });
  };

  const prevClick = () => {
    setPageCount((prev) => prev - 1);
  };

  const nextClick = () => {
    setPageCount((prev) => prev + 1);
  };

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/design" element={<Content subject="design" />} />
        <Route
          path="/subject/programming"
          element={<Content subject="programming" />}
        />
        <Route
          path="/subject/finance"
          element={<Content subject="finance" />}
        />
        <Route
          path="/subject/exercise"
          element={<Content subject="exercise" />}
        />
        <Route
          path="/subject/management"
          element={<Content subject="management" />}
        />
      </Routes>
      <Footer />
    </div>
  );
}
