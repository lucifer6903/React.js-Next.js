import { NextResponse } from 'next/server';
import dbConnect from './../../lib/db';
import Task from './../../models/task1';

//e400: Bad Request
// e500: Unable to get request
//      GET - Fetch all tasks
export async function GET() {
  try {
    await dbConnect();
    const tasks = await Task.find();
    return NextResponse.json({ success: true, data: tasks });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch tasks' }, { status: 500 });
  }
}
//  POST - Add new task
export async function POST(req) {
  try {
    await dbConnect();
    const { title,text ,image,imagealt,seo,slug} = await req.json();
    if (!title || !text) {
      return NextResponse.json({ success: false, error: 'Title and text are required' }, { status: 400 });
    }
    const newTask = await Task.create({title, text,image ,imagealt,seo,slug});
    return NextResponse.json({ success: true, data: newTask });
  } catch  {
    return NextResponse.json({ success: false, error: 'Failed to add task' }, { status: 500 });
  }
}
//update
export async function PUT(req) {
  try {
    await dbConnect();
    const { id1, title, text ,slug,seo,image,imagealt} = await req.json();

    if (!id1 || !title || !text) {
      return NextResponse.json(
        { success: false, error: "Task must have Title, ID, and Text" },
        { status: 400 }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(id1, { title, text,slug,seo,image,imagealt }, { new: true });

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