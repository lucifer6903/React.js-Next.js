'use client'
import { useState,useEffect } from "react";
import BlogCard from "./blog_card";

const Blog = ()=>{
    const [items, setItems] = useState([]); 
    const [visi,setvisi]=useState(6);
    
  const handleloadmore=()=>{
    console.log("click")
    const len_Arr= Object.keys(items).length;

    if (len_Arr >= visi+3){
    setvisi(visi+3);
  }
  else if (len_Arr>= visi+2){
    setvisi(visi+2);

  }
  else if (len_Arr>= visi+1){
    setvisi(visi+1);
    
  }

  
  else {
    console.log("you have all the item ")
  }
  }

    // State initialized as an array
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
   const blogs = items
//   const blogs = [
//     { image: "/uploads/jaimin.jpg", title: "Exploring the Future of AI" },
//     { image: "/uploads/jaimin.jpg", title: "How to Master Web Development" },
//     { image: "/uploads/jaimin.jpg", title: "Understanding Blockchain Basics" },
    
//     { image: "/uploads/jaimin.jpg", title: "Exploring the Future of AI" },
//     { image: "/uploads/jaimin.jpg", title: "How to Master Web Development" },
//     { image: "/uploads/jaimin.jpg", title: "Understanding Blockchain Basics" },
//   ];

  

  return (
    <div>
      
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
      gap: "20px",
      
      padding: "20px",
    }}>
      {blogs.length == 0  ? <div> No blog are there  </div> :null  }{/*you can use it to diplay on blog*/} 
      {blogs.slice(0,visi).map((blog, index) => (
        <div key={index}>
         
        <BlogCard key={blog.title} image={blog.image} title={blog.title} index={blog._id} date={blog.createdAt} />
        </div>

        
))}
    </div>
    
<div>
      <button style={{  marginLeft:"0%" ,width:"100px"}} onClick={()=>handleloadmore()}  >load more</button>
      </div>
   
    </div>
    
  );
}


const Tabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "View all" },
    { id: "education", label: "Education" },
    { id: "scholarship", label: "Scholarship" },
    { id: "jobs", label: "Jobs" },
    { id: "exams", label: "Exams" },
    { id: "forms", label: "Forms" },
  ];
  if (activeTab ==="all"){
    console.log("click view")
  }

  return (
    <div className="container">
      {/* Tab Buttons */}
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      

      {/* Tab Content */}
      <div className="content">
        {tabs.map((tab) => (
          <div key={tab.id} className={`tab-content ${activeTab === tab.id ? "active" : ""}`}>
            <h2>{tab.label} Content</h2>
            <p>This is the content for {tab.label}.</p>
            {activeTab ==="all" ? <Blog/> : null}

          </div>
        ))}
      </div>

      {/* Styles */}
      <style jsx>{`
        .container {
          text-align: center;
        }
        .tabs {
          display: flex;
          justify-content: center;
          border-bottom: 2px solid #ddd;
          padding-bottom: 10px;
        }
        .tab {
          background: none;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          font-size: 16px;
          color: #666;
          transition: color 0.3s;
        }
        .tab.active {
          font-weight: bold;
          color: #000;
          border-bottom: 2px solid #000;
        }
        .tab:hover {
          color: #000;
        }
        .content {
          margin-top: 20px;
        }
        .tab-content {
          display: none;
          font-size: 18px;
          padding: 20px;
        }
        .tab-content.active {
          display: block;
        }
      `}</style>
    </div>
  );
};

export default Tabs;
