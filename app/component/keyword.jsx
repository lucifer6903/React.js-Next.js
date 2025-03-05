"use client";
import React, { useState } from "react";

export default function Keyword() {
  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);

  // Function to add keywords
  const handleKeyDown = () => {
    if (inputValue.trim() !== "") {
      setKeywords((prev) => [...prev, inputValue.trim()]);
      setInputValue(""); // Clear input
      alert("Keyword has been added");
    }
  };

  // Function to handle editing a keyword
  const handleEditKeyword = (index) => {
    const newKeyword = prompt("Edit your keyword:", keywords[index]);
    if (newKeyword !== null && newKeyword.trim() !== "") {
      setKeywords((prev) => {
        const updatedKeywords = [...prev];
        updatedKeywords[index] = newKeyword.trim();
        return updatedKeywords;
      });
    }
  };

  // Function to delete a keyword on double-click
  const deleteKeyword = (index) => {
    setKeywords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter keyword"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="button" onClick={handleKeyDown}>
        Add Keyword
      </button>

      <p>Keywords:</p>
      <ul>
        {keywords.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
            onDoubleClick={() => deleteKeyword(index)} // Delete on double-click
          >
            <button onClick={() => handleEditKeyword(index)} type="button" >
              {item}
            </button>
            <span style={{ color: "black", fontWeight: "bold" }}>x</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
