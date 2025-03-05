'use client';
import { useState, useEffect } from 'react';

// Fetch items from the server
async function fetchItems() {
  const res = await fetch('/api/item');
  const data = await res.json();
  return data.data;
}

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [text1, setText1] = useState('');
  const [editing, setEditing] = useState(null);

  // Fetch items on initial load
  useEffect(() => {
    async function loadItems() {
      const itemsData = await fetchItems();
      setItems(itemsData);
    }
    loadItems();
  }, []);

  // Handle form submission (Create and Update)
  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !text1) return alert('Please enter title and text1');

    const body = { title, text1 };
    let res;
    if (editing) {
      // Update item
      res = await fetch(`/api/item/${editing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } else {
      // Create item
      res = await fetch('/api/item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    }

    const data = await res.json();
    if (data.success) {
      if (editing) {
        // Update the state with the updated item
        setItems(items.map((item) => (item._id === editing._id ? data.data : item)));
        setEditing(null);
      } else {
        // Add new item to state
        setItems([...items, data.data]);
      }
      setTitle('');
      setText1('');
    } else {
      alert('Error adding/updating item');
    }
  }

  // Handle delete operation
  async function handleDelete(itemId) {
    const res = await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
    const data = await res.json();
    if (data.success) {
      setItems(items.filter((item) => item._id !== itemId));
    } else {
      alert('Error deleting item');
    }
  }

  // Handle edit operation
  function handleEdit(item) {
    setTitle(item.title);
    setText1(item.text1);
    setEditing(item);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">📦 Item Manager</h1>

      {/* Form to add or edit item */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Text1"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          {editing ? '✏️ Update Item' : '➕ Add Item'}
        </button>
      </form>

      {/* Display all items */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="p-3 bg-white shadow-md rounded flex justify-between items-center">
            <div>
              <span className="font-semibold">{item.title}</span> - {item.text1}
            </div>
            <div>
              <button
                onClick={() => handleEdit(item)}
                className="text-yellow-500 hover:text-yellow-700 mr-2"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                🗑️ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
