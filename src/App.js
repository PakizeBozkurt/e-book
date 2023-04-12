import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Content from "./pages/Content";
import Footer from "./pages/Footer";

import "./styles.css";

export default function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

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

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/subject/Study and Teaching"
          element={<Content subject="study_and_teaching" />}
        />
        <Route path="/subject/women" element={<Content subject="women" />} />
        <Route
          path="/subject/Study Skills"
          element={<Content subject="study_skills" />}
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
