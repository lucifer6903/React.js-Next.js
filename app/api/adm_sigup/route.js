
import { connectDB } from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";


export async function POST(req) {
  await connectDB();
  const { email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser) return Response.json({ error: "Email already exists" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });

  return Response.json({ message: "User registered successfully", user: newUser }, { status: 201 });
}
