"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [customName, setCustomName] = useState(""); // Store custom name
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    if (!customName.trim()) {
      setMessage("Please enter a custom name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("customName", customName); // Send custom name to API

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setMessage(data.message);
  };

  return (
    <div>
      <h1>File Upload with Custom Name</h1>
      <input type="file" onChange={handleFileChange} />
      <input
        type="text"
        placeholder="Enter custom name"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
}
