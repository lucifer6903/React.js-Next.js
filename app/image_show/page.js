"use client";
import { useState, useEffect } from "react";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await fetch("/api/image");
      const data = await response.json();
      setImages(data.images || []);
    };

    fetchImages();
  }, []);

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Uploaded Images</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {images.length > 0 ? (
          images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Uploaded ${index}`}
              style={{ width: "100%", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)" }}
            />
          ))
        ) : (
          <p>No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}
