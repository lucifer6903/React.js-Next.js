'use client'
import React from 'react'
import { useState,useEffect } from 'react';
export default function Display(index) {
    const [items, setItems] = useState([]);
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
        <div className="title">
            {items[index].title}
        </div>
        <div className="blog">
            {items[index].text}
        </div>
    </div>
  )
}
