import { NextResponse } from 'next/server';
import dbConnect from './../../lib/db';
import Admin from './../../models/task2'; // Importing the correct model

// GET - Fetch all admins
export async function GET() {
  try {
    await dbConnect();
    const admins = await Admin.find(); // Query the Admin collection
    return NextResponse.json({ success: true, data: admins });
  } catch (error) {
    console.error("Error fetching admins:", error);
    return NextResponse.json({ success: false, error: 'Failed to fetch admins' }, { status: 500 });
  }
}


export async function POST(req) {
  try { 
    await dbConnect();
    const { email, password } = await req.json(); // Fixed: use correct field names (email, password)
    const newAdmin = await Admin.create({ email, password }); // Correct model reference
    return NextResponse.json({ success: true, data: newAdmin });
  } catch (error) {
    console.error("Error adding admin:", error);
    return NextResponse.json({ success: false, error: 'Failed to add admin' }, { status: 500 });
  }
}
