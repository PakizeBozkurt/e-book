import React from "react";
import "./Search.css";
export default function Search({
  placeholder,
  value,
  setValue,
  searchClick,
  focus,
}) {
  const handleOnchange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="search-section">
      <div className="position-relative">
        <input
          placeholder={"Search for something..."}
          type="text"
          value={value}
          onChange={handleOnchange}
          autoFocus={focus}
        />
        <button
          type="button"
          className="input-clear"
          onClick={() => setValue("")}
          style={{ display: value ? "" : "none" }}
        >
          x
        </button>
      </div>
      <button type="button" onClick={(e) => searchClick(e)}>
        Search
      </button>
    </div>
  );
}
