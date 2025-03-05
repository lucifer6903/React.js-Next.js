import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      return NextResponse.json({ images: [] });
    }

    // Read files from the uploads directory
    const files = fs.readdirSync(uploadDir);
    
    // Create URLs for each file
    const imageUrls = files.map((file) => `/uploads/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
