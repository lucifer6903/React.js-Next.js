import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Task from '../../../models/task1';


export async function GET(req, { params }) {
  await dbConnect(); // Ensure DB connection

  const { id } = params;

  try {
    const entry = await Task.findById(id);
    if (!entry) {
      return NextResponse.json({ success: false, message: "Entry not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: entry }, { status: 200 });
  } catch (error) {
    console.error("Error fetching entry:", error);
    return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    await dbConnect();
    const {  id1,slug, title, text, seo} = await req.json();

   

    const updatedTask = await Task.findByIdAndUpdate(id1, { title, text,slug, seo }, { new: true });

    if (!updatedTask) {
      return NextResponse.json(
        { success: false, error: "Unable to update" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, message: "Update has been done", task: updatedTask });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req) {
  try {
    await dbConnect();
    const {id} = await req.json();
   
    const newTask = await Task.deleteOne({_id:id});
    return NextResponse.json({ success: true, data: newTask });
  } catch  {
    return NextResponse.json({ success: false, error: 'Failed to remove task' }, { status: 500 });
  }
}

// }
// export async function PUT(req, { params }) {
//   await dbConnect(); // Ensure DB connection

//   const { id } = params;

//   try {
//     const entry = await Task.findById(id);
//     if (!entry) {
//       return NextResponse.json({ success: false, message: "Entry not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, data: entry }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching entry:", error);
//     return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
//   }
// }
// // }
// // export async function PUT(req, { params }) {
// //   try {
// //     await dbConnect();
// //     const { id } = params;
// //     const body = await req.json(); // Get request body

// //     const updatedBlog = await Task.findByIdAndUpdate(id, body, { new: true });

// //     if (!updatedBlog) {
// //       return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ success: true, data: updatedBlog }, { status: 200 });
// //   } catch (error) {
// //     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
// //   }
// // }






//     // GET: Fetch a blog by ID
//     // export async function GET(req, { params }) {
//     //     try {
//     //         await dbConnect();
//     //         const { id } = params.id; // Correct way to extract ID
    
//     //         if (!id) {
//     //             return NextResponse.json({ success: false, error: "Blog ID is required" }, { status: 400 });
//     //         }
    
//     //         const blog = await Task.findById(id);
//     //         if (!blog) {
//     //             return NextResponse.json({ success: false, error: "Blog not found" }, { status: 404 });
//     //         }
    
//     //         return NextResponse.json({ success: true, data: blog });
//     //     } catch (error) {
//     //         console.error("Error fetching blog:", error);
//     //         return NextResponse.json({ success: false, error: "Failed to fetch blog" }, { status: 500 });
//     //     }
//     // }
//     // export async function GET({params}) {
//     //     try {
//     //       await dbConnect();
//     //       const tasks = await Task.findOne({ _id: params.id }).lean();
//     //       return NextResponse.json({ success: true, data: tasks });
//     //     } catch {
//     //       return NextResponse.json({ success: false, error: 'Failed to fetch tasks' }, { status: 500 });
//     //     }
//     //   }