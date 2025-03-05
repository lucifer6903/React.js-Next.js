"use client";
import { useState,useEffect,use } from "react";
import path from "path";
import dynamic from "next/dynamic";
import Image from "next/image";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

 
export default function ItemsPage({params}) {
  const resolvedParams = use(params); // Unwrapping params
  const id1 = resolvedParams?.id;
  const [blog, setBlog] = useState(null);
  const [file, setFile] = useState(null);
  const [ext, setExt] = useState("");


  console.log(blog?.text)
  const [imgsrc,setimgsrc]=useState("/loader/duck-loading.gif");///loader/duck-loading.gif//plain-loader

   useEffect(()=>{
    if(blog?.image){
      setimgsrc(blog.image)
    }
    if(blog?.title){
      setTitle(blog.title)
    }
    if(blog?.slug){
      setSlug(blog.slug)
    }
    if(blog?.imagealt){
      setAltname(blog?.imagealt)
    }
    if(blog?.text){
      setText(blog?.text)
    }
    if(blog?.image){
      setCustomName((blog?.image).replace("/uploads/",""))
    }
    if(blog?.seo[0]?.description){
      setSeodes(blog?.seo[0]?.description)
    }
    if(blog?.seo[0]?.author){
      setSeoauthor(blog?.seo[0]?.author)
    }
    if(blog?.seo[0]?.seokeywords){
      setKeywords(blog?.seo[0]?.seokeywords)
    }

    
  },[blog])



  
//start
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [slug, setSlug] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [keywords, setKeywords] = useState([]);
  


  // const [file, setFile] = useState(null);
  const [customName, setCustomName] = useState(""); // Store custom name
  const [altname,setAltname]=useState("")//altname
  // const [message, setMessage] = useState("");
  // const [ext, setExt] = useState("");

  const [seodes,setSeodes]=useState("");
  const [seoauthor,setSeoauthor]=useState("");
//end

//start 
  useEffect(() => {
    async function fetchItems() {
      try {
        const res = await fetch(`/api/updateentry/${id1}`);
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
        } 
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }

    if (id1) {
      fetchItems();
    }
  }, [id1]);





  // useEffect(()=>{
  //   if(blog?.title){
  //     setTitle(blog.title)
  //   }
  //   if(blog?.slug){
  //     setSlug(blog.slug)
  //   }
  
  //   if(blog?.seo[0]?.seokeywords){
  //     setKeywords(blog?.seo[0]?.seokeywords)
  //   }
    
  // },[blog])
  
  // const handleFileChange = async(e) => {
  //   const selectedFile =  e.target.files[0]
  //   setFile(selectedFile);
  //   console.log(selectedFile,"thisis file")
  //   const extension = path.extname(selectedFile.name);  // or selectedFile.name.split('.').pop();
  //   setExt(extension);
  // };
  
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
        console.log("Please select a file.");
        return;
      }
  
      if (!customName.trim()) {
        console.log("Please enter a custom name.");
        return;
      }
      
      if (!altname.trim()) {
        console.log("Please enter a alt name for file.");
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
      alert(data.message);
    };
  
  
  // const  = async () => {
  //   if (!file) {
  //     setMessage("Please select a file.");
  //     return;
  //   }

  //   if (!customName.trim()) {
  //     setMessage("Please enter a custom name.");
  //     return;
  //   }
    
  //   if (!altname.trim()) {
  //     setMessage("Please enter a alt name for file.");
  //     return;
  //   }


  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("customName", customName); // Send custom name to API

  //   const response = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   const data = await response.json();
  //   setMessage(data.message);
  // };


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
    if (!slug) return alert("Please enter a slug"); // ✅ Ensure slug is provided
  
    // if (!customName || !ext) {
    //   alert("Custom name or file extension is missing!");
    //   return;
    // }
  
    const image = `/uploads/${customName}${ext}`;
    const imagealt = altname;
  
    const seo = {  
      description: seodes,
      author: seoauthor,
      seokeywords: keywords,
    };
  
    const payload = { id1,slug, title, text ,seo,image,imagealt}; // ✅ Added slug
  
    try {
      const res = await fetch("/api/new_api", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await res.json();
      if (data.success) {
        console.log("success");
        // setSlug(""); // ✅ Clear slug after submission
        // setTitle("");
        // setText("");
        // setSeoauthor("");
        // setSeodes("");
        // setKeywords([]);
      } else {
        alert("Error adding/updating item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

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
      <Image src={imgsrc} alt="hello" width={100} height={100}  quality={10}/>
      <input type="file" onChange={handleFileChange}  />

       {/* <p>to change image choose the following file</p>
      <input type="file" onChange={handleFileChange} />  */}
      
      {/* <input
        type="text"
        placeholder="Enter custom name for imagestore"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        className="input-field"
        style={{width:"40%"}}

      /> */}
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



<button onClick={handleUpload}  type="submit" className="submit-btn">
  update
</button>
</div>
    </div>
    <JoditEditor
                    value={text}
                    onChange={(newContent) => setText(newContent)}
              
                  />     {/* Pass state to editor */}

    

    <hr />

  </form>

  {/* {message} */}

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