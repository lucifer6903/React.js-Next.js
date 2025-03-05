"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function RichTextEditor({ value, onChange }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      data={value}
      onChange={(event, editor) => {
        const data = editor.getData();
        onChange(data);
      }}
      config={{
        extraPlugins: [uploadAdapterPlugin],
      }}
    />
  );
}

// Image Upload Plugin for CKEditor
function uploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new ConsoleUploadAdapter(loader);
  };
}

// Custom Upload Adapter (Logs image data to console)
class ConsoleUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    
    // Read file as base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    return new Promise((resolve) => {
      reader.onload = () => {
        console.log("Image Uploaded:", reader.result); // Logs the image data
        resolve({ default: reader.result });
      };
    });
  }
}
