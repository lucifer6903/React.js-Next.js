import { NextResponse } from 'next/server';
import dbConnect from './../../lib/db';
import Admin from './../../models/task2'; // Importing the correct model



// export async function POST(req) {
//     try { 
//       await dbConnect();
//       const { email, password } = await req.json(); // Fixed: use correct field names (email, password)
//       const newAdmin = await Admin.find({ email, password }); // Correct model reference
//       return NextResponse.json({ success: true, data: newAdmin });
//     } catch (error) {
//       console.error("Error while login:", error);
//       return NextResponse.json({ success: false, error: 'Failed to login' }, { status: 500 });
//     }
//   }



import { generateToken } from "./../../lib/jwt";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await dbConnect();
  const { email, password } = await req.json();

  const user = await Admin.findOne({ email });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = generateToken(user);
  return NextResponse.json({ token, user }, { status: 200 });
}
