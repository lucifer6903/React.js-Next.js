import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const customName = data.get("customName"); // Get custom name from form

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    
    if (!customName) {
      return NextResponse.json({ error: "No custom name provided" }, { status: 400 });
    }

    // Validate file type (Allow only images)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Get file extension
    const ext = path.extname(file.name);
    
    // Rename file using custom name
    const newFilename = `${customName}${ext}`;
    const filePath = path.join(uploadDir, newFilename);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      url: `/uploads/${newFilename}`,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
