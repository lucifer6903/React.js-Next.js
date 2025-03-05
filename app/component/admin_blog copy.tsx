"use client";
import { useState, useEffect } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [visi, setvisi] = useState(2);
  const [adminmode, setadminmode] = useState(false);
  let editMode=false;
  function handleloadmore() {
    setvisi(visi + 2);
  }

  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/new_api");
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    }
    fetchItems();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !text) return alert("Please enter a title and text");

    const payload = { title, text };
    const res = await fetch("/api/new_api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.success) {
      setItems([...items, data.data]);
      setTitle("");
      setText("");
    } else {
      alert("Error adding item");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const res = await fetch(`/api/new_api`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (data.success) {
      setItems(items.filter((item) => item._id !== id));
    } else {
      alert("Error deleting item");
    }
  }
  function handleEdit(id) {
    const item = items.find((item) => item._id === id);
    if (item) {
      setTitle(item.title);
      setText(item.text);
      setEditingId(id);
      
      editMode=false;
      const res = await fetch(`/api/new_api`, {
        method: "Update",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id,title,text}),
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter((item) => item._id !== id));
      } else {
        alert("Error deleting item");
      }

  
    }
  }

  return (
    <div >
      <h1>📕 BLOG</h1>
      <input
        style={{ margin: "20px" }}
        type="checkbox"
        onChange={() => setadminmode(!adminmode)}
        checked={adminmode}
      />
      admin
      <form onSubmit={handleSubmit} className="mb-4" style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          style={{
            textAlign: "left",     // Align text to the left
            verticalAlign: "top",  // Align text to the top (for single-line input)
            padding: "10px",       // Add padding for better spacing
            height: "200px",       // Set a reasonable height
            width: "100%",         // Make it fully responsive
            resize: "none",         
            height: "50px",
            width: "500px",
          
        }}
        />
        <br />
        <br />
        <input
          type="text"
          style={{
            height: "250px",
            width: "100%",
            padding: "20px",
            margin: "20px-20px-20px-20px",
            
          }}
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <br />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {editingId ? "Update" : "Click Add "}
        </button>
      </form>
      <div
        className="container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          alignItems: "center",
          margin: "auto",
          padding: "20px",
        }}
      >
        {items.slice(0, visi).map((dta, index) => (
          <div
            className="items"
            key={index}
            style={{
              border: "solid 2px black",
              margin: "auto",
              padding: "20px",
              flex: "1 1 calc(25% - 20px)",
            }}
          >
            <div>
              <h3>{dta.title}</h3>
              <h3> {dta.text}</h3>
            </div>
          </div>
        ))}
        {visi < items.length && (
          <div
            style={{
              textAlign: "center", // Center button at the bottom
              marginTop: "20px",
            }}
          >
            <button onClick={handleloadmore}>Load More "+" </button>
          </div>
        )}{" "}
      </div>
      <ul
        className="space-y-2"
        style={{ visibility: adminmode ? "visible" : "hidden" }}
      >
        {items.map((item) => (
          <li
            key={item._id}
            className="p-3 bg-white shadow-md rounded flex justify-between items-center"
          >
            <div>
              <span className="font-semibold">{item.title}</span> - {item.text}
            </div>
            <div>
              <button
                onClick={() => {handleEdit(item._id);editMode=true;}}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                / Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                x Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
