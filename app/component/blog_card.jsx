import Link from "next/link";
import Image from "next/image";


export default function BlogCard({ image, title,index,date }) {
  const inputDate= new Date(date);
  const newDate = inputDate.toLocaleDateString("en-US",{
    year :"numeric",
    month :"long",
    day:"numeric",
  });
  return (    
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
        maxWidth: "300px",
        margin: "auto",
        backgroundColor: "#fff",
        height:"300px"
        
        

      }}>
        <Image   
          src={image} 
          alt={title} 
          height= {200}
          width={300}
          quality={10}
          style={{  objectFit: "cover" }} 
          priority ={true}
        />
        <h4  style={{textAlign:"left" , marginLeft : "10px", fontWeight:"2", fontSize:"13px" ,marginTop:"2px"}} >{newDate} |2 min read</h4>
        
        <h3><div  style={{ padding: "10px", fontSize: "18px",textAlign:"left", }} dangerouslySetInnerHTML={{ __html: title }}></div>
        </h3>

        <Link href={`/blog/${index}`}  >
  Read More
</Link>


      </div>
    );
  }
  