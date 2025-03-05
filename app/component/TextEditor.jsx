"use client";
import React, { useState,useEffect } from "react";

import dynamic from "next/dynamic";
// import CryptoJS from "crypto-js";


const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const TextEditor = () => {
  const [content, setContent] = useState("");
  // const [encryptedText, setEncryptedText] = useState("");

  // // Encrypt text
  // const handleEncrypt = () => {
  //   if (!secret_key) {
  //     console.error("Encryption key is missing!");
  //     return;
  //   }
  //   const cipher = CryptoJS.AES.encrypt(content, secret_key).toString();
  //   setEncryptedText(cipher);
  //   console.log("Encrypted:", cipher);
  // };

  // // Decrypt text
  // const handleDecrypt = () => {
  //   if (!secret_key) {
  //     console.error("Decryption key is missing!");
  //     return;
  //   }
  //   try {
  //     const bytes = CryptoJS.AES.decrypt(encryptedText, secret_key);
  //     const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  //     console.log("Decrypted:", decryptedText);
  //   } catch (error) {
  //     console.error("Decryption failed:", error);
  //   }
  // };

  // Save content (for testing)
  // const handleSubmit = () => {
  //   console.log("Saved Content:", content);
  // };

  return (
    <div>
      <JoditEditor value={content} onChange={(newContent) => setContent(newContent)} />
  
      
      {/* <button onClick={handleSubmit}>Save</button> */}
      {/* <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>

      <h3>Encrypted Text:</h3>
      <textarea readOnly value={encryptedText} style={{ width: "100%", height: "100px" }} /> */}
    </div>
  );
};

export default TextEditor;
