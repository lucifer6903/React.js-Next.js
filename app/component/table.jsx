"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Import Jodit Editor (Client-side only)
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const BlogTable = () => {
  const [blog, setBlog] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedText, setEditedText] = useState("");
  const [editedslug, setEditedSlug] = useState("");
  const [editedimage, setEditedImage] = useState("");
  const router = useRouter();

  // Fetch Blogs from API
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/new_api");
        const data = await res.json();
        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  // Start Editing a Blog Post
  const handleEdit = (index) => {
    
    setEditIndex(index);
    setEditedTitle(blog[index]?.title);
    setEditedText(blog[index]?.text);
    setEditedSlug(blog[index]?.slug);
    setEditedImage(blog[index]?.image);
  };

  // Save the Edited Post (API Call)
  const handleSave = async (index) => {
    const id = blog[index]?._id;
    if (!id) {
      console.error("Invalid blog ID");
      return;
    }

    const updatedBlog = {
      id,
      title: editedTitle,
      text: editedText,
      slug: editedslug,
      image:editedimage,
    };

    try {
      const res = await fetch("/api/new_api", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      if (!res.ok) {
        console.error("Server error:", res.status, res.statusText);
        return;
      }

      const result = await res.json();
      if (result.success) {
        console.log("Updated successfully!");

        // Update state with new blog data
        const updatedBlogs = [...blog];
        updatedBlogs[index] = {
          ...updatedBlogs[index],
          title: editedTitle,
          text: editedText,
          slug: editedslug,
          image:editedimage
        };
        setBlog(updatedBlogs);
        setEditIndex(null);
      } else {
        console.error("Update failed:", result.error);
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  // Cancel Editing
  const handleCancel = () => {
    setEditIndex(null);
    setEditedTitle("");
    setEditedText("");
    setEditedSlug("");
  };

  // Delete Post (API Call)
  const handleDelete = async (index) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    const id = blog[index]?._id;

    try {
      const res = await fetch("/api/new_api", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        console.error("Delete failed:", res.status, res.statusText);
        return;
      }

      const result = await res.json();
      if (result.success) {
        console.log("Deleted successfully!");
        setBlog(blog.filter((_, i) => i !== index));
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };
    const handleFileChange = async(e) => {
      const selectedFile =  e.target.files[0]
      setFile(selectedFile);
      console.log(selectedFile,"thisis file")
      const extension = path.extname(selectedFile.name);  // or selectedFile.name.split('.').pop();
      setExt(extension);
    };
    
  
    const handleUpload = async () => {
   
  
  
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
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Slug</th>
            <th>Title</th>
            <th>Text</th>
            <th>image</th>
            {/* <th>image name for</th>

            <th>altname for image</th>
            <th>seo description</th>
            <th>seo author </th>
            <th>seo keyword</th> */}
            



            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blog.map((item, index) => (
            <tr key={item._id}>
              {/* Slug Column */}
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedslug}
                    onChange={(e) => setEditedSlug(e.target.value)}
                    className="editor"
                  />
                ) : (
                  <div> {item.slug}</div>
                )}
              </td>

              {/* Title Column */}
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="editor"
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: item.title }} />
                )}
              </td>

              {/* Text Column */}
              <td>
                {editIndex === index ? (
                  <JoditEditor
                    value={editedText}
                    onChange={(newContent) => setEditedText(newContent)}
                    className="editor"
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: item.text }} />
                )}
              </td>
              {/*image */}
              <td>
                {editIndex === index ? (
                  <div>                
                    <input type="file" onChange={handleFileChange} />
                    <button type="button" onClick={handleUpload}></button>
                  </div>


                
) : (
                  <div>
                    {" "}
                    {
                      <Image
                        src={item.image}
                        alt="hello"
                        quality={10}
                        width={170}
                        height={100}
                        priority
                      />
                    }
                  </div>
                )}
              </td>

              {/* Actions */}
              <td>
                {editIndex === index ? (
                  <>
                    <button
                      className="save-btn"
                      onClick={() => handleSave(index)}
                    >
                      Save
                    </button>
                    <button className="cancel-btn" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={()=>router.push(`/t/${item._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <style>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
          padding: 20px;
        }
        .styled-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 16px;
          text-align: left;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .styled-table th,
        .styled-table td {
          padding: 12px;
          border: 1px solid #ddd;
        }
        .styled-table th {
          background-color: #007bff;
          color: white;
          font-weight: bold;
        }
        .styled-table tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .editor {
          width: 100%;
          height: 150px;
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
        }
        button {
          cursor: pointer;
          padding: 8px 12px;
          margin: 5px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
        }
        .edit-btn {
          background-color: #ffc107;
          color: white;
        }
        .delete-btn {
          background-color: #dc3545;
          color: white;
        }
        .save-btn {
          background-color: #28a745;
          color: white;
        }
        .cancel-btn {
          background-color: #6c757d;
          color: white;
        }
        button:hover {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

export default BlogTable;

// "use client";
// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic"; // Required for Next.js

// // import dbConnect  from "./../lib/db";
// // import Task from "./../models/task1";

// const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// const BlogTable = () => {
//   // await dbConnect();
//   // const blog = await Task.find();
//   // console.log(blog[0])

//   const [blog, setBlog] = useState();

//   useEffect(() => {
//     async function fetchItem() {
//       try {
//         const res = await fetch("api/new_api");
//         const data = await res.json();
//         if (data.success) {
//           setBlog(data.data);
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchItem();
//   }, []);
//   useEffect(() => {
//     console.log(blog?.[0]?._id, "id");
//   }, [blog]);

//   const [editIndex, setEditIndex] = useState(null);
//   const [text, setText] = useState(""); //   text for editing
//   const [title, setTitle] = useState(""); //   title for editing

//   //  editing mode
//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setText(blog?.[index]?.text);
//     setTitle(blog?.[index]?.title);
//   };

//   //  the updated content
//   const handleSave = async (index) => {
//     const id = blog?.[index]?._id;
//     if (!id) {
//       console.error("Error: Invalid blog ID");
//       return;
//     }

//     // Ensure you're updating the correct blog entry
//     const updatedBlogs = [...blog]; // Create a new array (avoid direct state mutation)
//     updatedBlogs[index] = { ...updatedBlogs[index], text, title };

//     const updatedBlog = { id, text, title };

//     try {
//       const res = await fetch("/api/new_api", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedBlog),
//       });

//       // First check if the request was successful
//       if (!res.ok) {
//         console.error("Server responded with an error:", res.status, res.statusText);
//         return;
//       }

//       // Try parsing the response JSON
//       const result = await res.json().catch(() => {
//         console.error("Failed to parse JSON response");
//         return null;
//       });

//       if (result && result.success) {
//         console.log("Updated successfully!");
//         setBlog(updatedBlogs); // Update state only if successful
//         setEditIndex(null);
//       } else {
//         console.error("Update failed:", result?.error || "Unknown error");
//       }
//     } catch (error) {
//       console.error("Error updating:", error);
//     }
//   };

//   // cancel editing
//   const handleCancel = () => {
//     setEditIndex(null);
//     setText("");
//   };

//   // Delete row
//   const handleDelete = (index) => {
//     if (window.confirm("Are you sure you want to delete this blog?")) {
//       setBlog(blog.filter((_, i) => i !== index));
//     }
//   };

//   const char_limit = 25;
//   useEffect(() => {
//     if (!char_limit) {
//       console.log("welcome");
//     } else if (title.length > char_limit) {
//       alert("You can only type 25 characters");
//     }
//   }, [title]);

//   return (
//  <div className="table-container" >
//   <table className="styled-table">
//     <thead>
//       <tr>
//         <th>Title</th>

//         <th>Text</th>

//         <th>Actions</th>

//       </tr>
//     </thead>
//     <tbody>
//       {blog?.map((item, index) => (
//         <tr key={index}>
//           <td>
//             {editIndex === index ? (
//                <input
//                type="text"
//                value={item.title}
//                onChange={(e) => setTitle(e.target.value)}
//                className="editor"
//              />
//               // <JoditEditor
//               //   value={item.title}
//               //   onChange={(newContent) => setTitle(newContent)}
//               //   className="editor"
//               // />
//             ) : (
//               <div dangerouslySetInnerHTML={{ __html: item.title }} />
//             )}
//           </td>
//           <td>
//             {editIndex === index ? (
//               <JoditEditor
//                 value={item.text}
//                 onChange={(newContent) => setText(newContent)}
//                 className="editor"
//               />
//             ) : (
//               <div dangerouslySetInnerHTML={{ __html: item.text }} />
//             )}
//           </td>
//           <td>
//             {editIndex === index ? (
//               <>
//                 <button className="save-btn" onClick={() => handleSave(index)}>
//                   Save
//                 </button>
//                 <button className="cancel-btn" onClick={handleCancel}>
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button className="edit-btn" onClick={() => handleEdit(index)}>
//                   Edit
//                 </button>
//                 <button className="delete-btn" onClick={() => handleDelete(index)}>
//                   Delete
//                 </button>
//               </>
//             )}
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//   <style>{`
//     .table-container {
//       width: 100%;
//       overflow-x: auto;
//       padding: 20px;
//     }

//     .styled-table {
//       width: 100%;
//       border-collapse: collapse;
//       font-size: 16px;
//       text-align: left;
//       box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
//     }

//     .styled-table th,
//     .styled-table td {
//       padding: 12px;
//       border: 1px solid #ddd;
//     }

//     .styled-table th {
//       background-color: #007bff;
//       color: white;
//       font-weight: bold;
//     }

//     .styled-table tr:nth-child(even) {
//       background-color: #f9f9f9;
//     }

//     .editor {
//       width: 100%;
//       height: 150px;
//       border: 1px solid #ccc;
//       padding: 10px;
//       border-radius: 5px;
//     }

//     button {
//       cursor: pointer;
//       padding: 8px 12px;
//       margin: 5px;
//       border: none;
//       border-radius: 5px;
//       font-size: 14px;
//     }

//     .edit-btn {
//       background-color: #ffc107;
//       color: white;
//     }

//     .delete-btn {
//       background-color: #dc3545;
//       color: white;
//     }

//     .save-btn {
//       background-color: #28a745;
//       color: white;
//     }

//     .cancel-btn {
//       background-color: #6c757d;
//       color: white;
//     }

//     button:hover {
//       opacity: 0.8;
//     }

//     @media (max-width: 768px) {
//       .styled-table th,
//       .styled-table td {
//         padding: 8px;
//       }

//       button {
//         font-size: 12px;
//         padding: 6px 10px;
//       }
//     }
//   `}</style>
// </div>

//   );
// };

// export default BlogTable;
