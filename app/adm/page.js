"use client";
import { useState } from "react";
import path from "path";
import TextEditor from "../component/new_texteditor";

export default function ItemsPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);


  const [file, setFile] = useState(null);
  const [customName, setCustomName] = useState(""); // Store custom name
  const [altname,setAltname]=useState("")//altname
  const [message, setMessage] = useState("");
  const [ext, setExt] = useState("");

  const [seodes,setSeodes]=useState("");
  const [seoauthor,setSeoauthor]=useState("");
  
  const handleFileChange = async(e) => {
    const selectedFile =  e.target.files[0]
    setFile(selectedFile);
    console.log(selectedFile,"thisis file")
    const extension = path.extname(selectedFile.name);  // or selectedFile.name.split('.').pop();
    const Validext=["png", "jpeg", "jpg"]
    if (!extension in Validext){
      setFile(null);
      alert("only png ,jpeg,jpg valid");
    }
    setExt(extension);
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
    
    if (!altname.trim()) {
      setMessage("Please enter a alt name for file.");
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


  //   useEffect(() => {
  //   async function fetchItems() {
  //     try {
  //       const res = await fetch("/api/new_api");
  //       const data = await res.json();
  //       if (data.success) {
  //         setItems(data.data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching items:", error);
  //     }
  //   }
  //   fetchItems();
  // }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title || !text || !slug||!customName||!altname) return alert("Please enter properly");
    if (!slug) return alert("Please enter a slug"); // ✅ Ensure slug is provided
  
    if (!customName || !ext) {
      alert("Custom name or file extension is missing!");
      return;
    }
  
    const image = `/uploads/${customName}${ext}`;
    const imagealt = altname;
  
    const seo = {  
      description: seodes,
      author: seoauthor,
      seokeywords: keywords,
    };
  
    const payload = { slug, title, text, image, imagealt, seo }; // ✅ Added slug
  
    try {
      const res = await fetch("/api/new_api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (data.success) {
        setSlug(""); // ✅ Clear slug after submission
        setTitle("");
        setText("");
        setCustomName("");
        setAltname("");
        setExt("");
        setFile(null);
        setSeoauthor("");
        setSeodes("");
        setKeywords([]);
      } else {
        alert("Error adding/updating item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  





  //bkjkn knklxn 


//for adding element in db
  // async function handleSubmit(e) {
  //   e.preventDefault();
  //   if (!title || !text ) return alert("Please enter a title and text");
  //   const image=`/uploads/${customName}${ext}` ;
  //   const imagealt=altname;
  //   const seo = {  
  //     description: seodes, 
  //     author: seoauthor,
  //     seokeywords: keywords
  //   };
    

  //   const payload = { title, text,image,imagealt,seo};

  //   try {
  //     const res = await fetch("/api/new_api", {
  //       method:  "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     }); 

  //     const data = await res.json();
  //     if (data.success) {
       
       
  //       setTitle("");
  //       setText("");
  //       setEditingId(null);
  //       setCustomName("");
  //       setAltname("")
  //       setExt("");
  //       setFile(null)
  //       setSeoauthor("")
  //       setSeodes("")
  //       setKeywords([])
        
    
  //     } else {
  //       alert("Error adding/updating item");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }



  //endksnksdnflnfs



    // Function to add keywords
    // const handleKeyDown = () => {
    //   if (inputValue.trim() !== "") {
    //     setKeywords((prev) => [...prev, inputValue.trim()]);
    //     setInputValue(""); // Clear input
    //     alert("Keyword has been added");
    //   }
    // };
    const handleKeyDown = () => {
      if (inputValue.trim()) {
        setKeywords([...keywords, inputValue.trim()]);
        setInputValue("");
      }
    };
    
  
    // Function to handle editing a keyword
    const handleEditKeyword = (index) => {
      const newKeyword = prompt("Edit your keyword:", keywords[index]);
      if (newKeyword !== null && newKeyword.trim() !== "") {
        setKeywords((prev) => {
          const updatedKeywords = [...prev];
          updatedKeywords[index] = newKeyword.trim();
          return updatedKeywords;
        });
      }
    };
  
    // Function to delete a keyword on double-click
    const deleteKeyword = (index) => {
      setKeywords((prev) => prev.filter((_, i) => i !== index));
    };
  
  

 

  return (
   <div className="blog-container">
  <h1>📕 BLOG</h1>

  <form onSubmit={handleSubmit} className="blog-form">
  <div style={{
    display:"flex"
  }}>
    {/*upper */}
    <div style={{width:"55%"}}>
    <input
      type="text"
      placeholder="Slug"
      value={slug}
      onChange={(e) => setSlug(e.target.value)}
      className="input-field"
      style={{width:"25%"}}
    />
    
    <input
      type="text"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="input-field"
      style={{width:"40%"}}
      maxLength={25}

    />
    <div className="file-upload">
      <input type="file" onChange={handleFileChange}  />
      <input
        type="text"
        placeholder="Enter custom name for imagestore"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className="input-field"
        style={{width:"40%"}}
        

      />
      <input
        type="text"
        placeholder="Enter alt name for SEO"
        value={altname}
        onChange={(e) => setAltname(e.target.value)}
        className="input-field"
        style={{width:"40%"}}

      />
    </div>
    </div>
  {/*seo  */}  <div className="seo">
      
    <h3>SEO</h3>

<input
  type="text"
  placeholder="Enter SEO description"
  value={seodes}
  onChange={(e) => setSeodes(e.target.value)}
  className="input-field"
/>

<input
  type="text"
  placeholder="Author"
  value={seoauthor}
  onChange={(e) => setSeoauthor(e.target.value)}
  className="input-field"
/>

<input
  type="text"
  placeholder="Enter keyword"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  className="input-field"
/>

<button type="button" onClick={handleKeyDown} className="add-btn">
  Add Keyword
</button>

<p>Keywords:</p>
<ul className="keyword-list">
  {keywords.map((item1, index) => (
    <li key={index} className="keyword-item" onDoubleClick={() => deleteKeyword(index)}>
      <button onClick={() => handleEditKeyword(index)} type="button" className="keyword-btn">
        {item1}
      </button>
      <span className="delete-icon">x</span>
    </li>
  ))}
</ul>



<button onClick={handleUpload} type="submit" className="submit-btn">
  Add
</button>
</div>
    </div>
    <TextEditor text={text} setText={setText}    
 /> {/* Pass state to editor */}

    

    <hr />

  </form>

  {message}

  <style>{`
    .blog-container {
      max-width: 90vw;
      margin: 30px auto ;
      padding: 20px;
      background: #fff;
      box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      width:100vw;
    }

    .blog-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .input-field {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .file-upload {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .add-btn {
      background: #007bff;
      color: white;
      padding: 8px 12px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .keyword-list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      list-style: none;
      padding: 0;
    }

    .keyword-item {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 5px 10px;
      border: 1px solid #007bff;
      border-radius: 5px;
      cursor: pointer;
    }

    .keyword-btn {
      background: none;
      border: none;
      color: #007bff;
      cursor: pointer;
    }

    .delete-icon {
      color: red;
      font-weight: bold;
      cursor: pointer;
    }

    .submit-btn {
      background: #28a745;
      color: white;
      padding: 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    .submit-btn:hover, .add-btn:hover {
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      .blog-container {
        max-width: 100%;
        padding: 15px;
      }

      .input-field {
        font-size: 14px;
        padding: 8px;
      }
    }
  `}</style>
</div>

  );
 }