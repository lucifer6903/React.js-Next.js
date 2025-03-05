import React from 'react'
import Fillit from "./main_blog/page"
export default function Page() {
  return (
    <div>

      <Fillit/>
    </div>
  )
}


// // import ItemsPage from './component/admin_blog copy'

// import Link from "next/link";
// import { blogPosts } from "./lib/data";
// // "./lib/data"

// export default function BlogList() {
//   return (
//     <div>
//       <h1>All Blog Posts</h1>
//       <ul>
//         {blogPosts.map((post) => (
//           <li key={post.slug}>
//             <Link href={`/test_blog/${post.slug}`}>
//               {post.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// // import React from 'react'

// // export default function Page() {
// //   return (
// //     <div>
// //       jaimin
// //     <ItemsPage></ItemsPage>
// //     </div>
// //   )
// // }
// // import TextEditor from "./component/TextEditor";
// // import Keyword from"./component/keyword"

// // export default function Page() {
// //   return (
// //     <div>
// //       <Keyword/>
// //        {/* <h1>Jodit Editor in Next.js</h1>
// //        <TextEditor char_limit={25} /> */}
// //     </div>
// //   );
// // }
// // "use client";
// // import { useRouter } from "next/navigation";
// // import { useData } from "./context/Datacontext";

// // export default function HomePage() {
// //   const router = useRouter();
// //   const { setData } = useData();

// //   const handleClick = () => {
// //     const sampleData = { id: 1, title: "John Doe", text: "jaimin" }; // Example data
// //     setData(sampleData); // Store data in context
// //     router.push("/edit"); // Navigate to edit page
// //   };

// //   return (
// //     <div>
// //       <h1>Home Page</h1>
// //       <button onClick={handleClick}>Go to Edit Page</button>
// //     </div>
// //   );
// // }
