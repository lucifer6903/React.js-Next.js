'use client';
import { useState, useEffect } from 'react';

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [count, setCount] = useState(0); // ✅ Fix: Added count state

  // Fetch items from API
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch('/api'); // ✅ Fix: Correct API route
        const data = await res.json();
        if (data.success) {
          setItems(data.data);
        } else {
          console.error('Error fetching items:', data.error);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchItems();
  }, []); // ✅ Fix: No unnecessary dependencies

  // Handle form submission (Add new item)
  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !price) return alert('Please enter a title and text');

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: Number(count), name, price: String(price) }),
      });

      const data = await res.json();
      if (data.success) {
        setItems([...items, data.data]); // ✅ Fix: Update state
        setName('');
        setPrice('');
        setCount(count + 1);
      } else {
        alert('Error adding item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  }

  // Handle delete
  async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/items/${id}`, { // ✅ Fix: Correct DELETE endpoint
        method: 'DELETE',
      });

      const data = await res.json();
      if (data.success) {
        setItems(items.filter((item) => item._id !== id)); // ✅ Fix: Remove from UI
      } else {
        alert('Error deleting item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">📕 Blog</h1>

      {/* Form to add item */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          + Add Item
        </button>
      </form>

      {/* Display all items */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item._id} className="p-3 bg-white shadow-md rounded flex justify-between items-center">
            <span className="font-semibold">{item.name}</span> - 📕 {item.price}
            <button
              onClick={() => handleDelete(item._id)}
              className="bg-red-500 text-white p-1 rounded ml-2"
            >
              🗑️ Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
