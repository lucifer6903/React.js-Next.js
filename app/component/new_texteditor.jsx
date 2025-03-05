"use client";
import React from "react";
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = ({ text, setText }) => {
  
  return (
    <JoditEditor
      value={text}
      onChange={(newContent) => setText(newContent)} // Send data to the main page
    />
  );
};

export default TextEditor;
