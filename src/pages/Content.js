import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Book from "../components/Book/Book";
import Loader from "../components/Loader/Loader";

export default function Subject({ subject }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    fetch("https://openlibrary.org/subjects/" + subject + ".json")
      .then((res) => res.json())
      .then((data) => {
        data.work_count ? setData(data) : setData(null);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <button type="button" className="btn" onClick={() => navigate("/")}>
          Go to Home
        </button>
        <h2>{String(subject).toUpperCase()}</h2>
      </div>
      <div className="books-container">
        {data &&
          data.works.map((d, i) => {
            return (
              <Book
                key={i}
                title={d.title}
                author={d.authors && d.authors.map((d) => `${d.name}, `)}
                coverId={d.cover_id}
              />
            );
          })}
      </div>
      <Loader state={loading} />
    </>
  );
}
