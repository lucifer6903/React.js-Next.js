import React, { useEffect, useState } from 'react'

const [item,setitem]=useState([])

function Admin_form() {
    useEffect(()=>{
        async function fetchItems() {
            const res = await fetch("/api/new_api");
            const data =await res.json();
            if (data.success){
                setitem(data.data)

            }

            
        }
        fetchItems();
    },[]);
    async function handleSubmit() {
        
        
    }
  return (
    <div>
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


    </div>
  )
}

export default Admin_form
