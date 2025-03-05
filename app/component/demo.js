"use client";
import { useState, useEffect } from "react";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [adminMode, setAdminMode] = useState(false);

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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !text) return alert("Please enter a title and text");

    const payload = { title, text };

    try {
      const res = await fetch("/api/new_api", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });

      const data = await res.json();
      if (data.success) {
        if (editingId) {
          setItems(items.map((item) => (item._id === editingId ? data.data : item)));
        } else {
          setItems([...items, data.data]);
        }
        setTitle("");
        setText("");
        setEditingId(null);
      } else {
        alert("Error adding/updating item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch("/api/new_api", {
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
    } catch (error) {
      console.error("Error:", error);
    }
  }
  async function handleEdit(id) {
    const item = items.find((item) => item._id === id);
    if (!item) return;
  
    // Pre-fill form with item details
    setTitle(item.title);
    setText(item.text);
    setEditingId(id);
    handleUpdate();
  }
  
  // Function to submit updated data
  async function handleUpdate(e) {
    e.preventDefault();
    
    if (!editingId || !title || !text) {
      return alert("Please enter a title and text");
    }
  
    const res = await fetch(`/api/new_api`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingId, title, text }),
    });
  
    const data = await res.json();
    if (data.success) {
      setItems(items.map(item => 
        item._id === editingId ? { ...item, title, text } : item
      ));
      setTitle("");
      setText("");
      setEditingId(null);
    } else {
      alert("Error updating item");
    }
  }
  
  

 

  return (
    <div>
      <h1>📕 BLOG</h1>
      <label style={{ margin: "20px" }}>
        <input type="checkbox" onChange={() => setAdminMode(!adminMode)} checked={adminMode} /> Admin
      </label>

      <form onSubmit={handleSubmit} style={{ margin: "20px" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ textAlign: "left", padding: "10px", height: "50px", width: "500px", resize: "none" }}
        />
        <br />
        <br />
        <textarea
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ height: "250px", width: "100%", padding: "20px", margin: "20px 0" }}
        />
        <br />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {editingId ? "Update" : "Add"}
        </button>
      </form>
{/**/ }
      {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", padding: "20px" }}>
        {items.slice(0, visi).map((dta) => (
          <div
            key={dta._id}
            style={{ border: "solid 2px black", padding: "20px", flex: "1 1 calc(25% - 20px)" }}
          >
            <h3>{dta.title}</h3>
            <p>{dta.text}</p>
          </div>
        ))}
      </div>
      {visi < items.length && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={handleLoadMore}>Load More +</button>
        </div>
      )} */}
{/**/}

      <ul style={{ visibility: adminMode ? "visible" : "hidden" }}>
        {items.map((item) => (
          <li key={item._id} className="p-3 bg-white shadow-md rounded flex justify-between items-center">
            <div>
              <span className="font-semibold">{item.title}</span> - {item.text}
            </div>
            <div>
              <button onClick={() => handleEdit(item._id)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                Edit
              </button>
              <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white p-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
 