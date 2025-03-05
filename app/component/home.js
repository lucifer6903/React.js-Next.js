"use client";

import React, { useEffect, useState } from "react";

function Home_page() {
  const [items, setItems] = useState([]); // State initialized as an array
  const [visi, setVisi] = useState(2);
  function handleLoadMore(){
    setVisi(visi+2);
  }


  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch("/api/new_api");
        const data = await res.json();
        if (data.success) {
          setItems(data.data);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchItems();
  }, []);

  return (
    <div>
      <h2>HOME</h2>
      
      {/* Properly render array data */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", padding: "20px" }} >
        {items.map((item) => (
          <div
          key={item._id}
          style={{ border: "solid 2px black", padding: "20px", flex: "1 1 calc(25%)", height:"190px" }}
        >
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </div>
        ))}
      </div>
      {visi < items.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleLoadMore}>Load More +</button>
        </div>
      )}

  
    </div>
  );
}

export default Home_page;
