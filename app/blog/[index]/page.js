
import Head from "next/head";
import dbConnect  from "../../lib/db";
import Task from "../../models/task1";
import Image from "next/image";
export async function generateMetadata({ params }) {
  const {index}=await params
  await dbConnect();
  
  const blog = await Task.findOne({ _id:  index  }).lean();
  
  if (!blog) return { title: "Blog Not Found" };
  const description = blog?.seo[0].description || "No description available";
  const keywords = blog?.seo[0].seokeywords?.join(",") || "default, keywords";
  const author = blog?.seo[0].author || "Unknown Author";

  return {
    title: blog?.slug,
    description: description,
    keywords: keywords,
    authors: [{ name: author }],
    openGraph: {
      title: blog?.slug,
      description: description,
    },
}
}


//  Fetch Blog Data from MongoDB
export default async function BlogPost({ params }) {
  const {index}=await params
  
  await dbConnect();
  
  const blog = await Task.findOne({ _id:index }).lean();

  if (!blog) {
    return <h1>Blog post not found</h1>;
  }
  return (
    <div style={{ marginLeft:"25%"}}>
      <Head>
      <meta name="description" content={JSON.stringify(blog?.description)} />
      <meta name="keywords"content= {JSON.stringify(blog?.seokeyword?.join(","))} />
      <meta name="author" content={JSON.stringify(blog?.authour)} />
      <meta name="robots" content="index, follow" />
        </Head>    
      <article>
      <Image src={blog?.image} alt={  blog?.imagealt } width={700} priority quality={40}  height={500} />
      <p>By {blog?.seo[0]?.author } | {new Date(blog?.createdAt).toLocaleDateString()}</p>
      <h1>      <div dangerouslySetInnerHTML={{ __html: blog?.title }}></div>
      </h1>
      <div dangerouslySetInnerHTML={{ __html: blog?.text }}></div>
    </article>
    </div>
  );
}