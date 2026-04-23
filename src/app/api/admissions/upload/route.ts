import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import dbConnect from "@/db/db";

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads", "admissions"));

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Ensure the upload directory exists
        try {
            await fs.access(UPLOAD_DIR);
        } catch (error) {
            await fs.mkdir(UPLOAD_DIR, { recursive: true });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const originalName = file.name.replace(/\s+/g, "-");
        const ext = path.extname(originalName);
        const nameWithoutExt = path.basename(originalName, ext);

        let filename = originalName;
        let filePath = path.join(UPLOAD_DIR, filename);

        // Check if file already exists
        try {
            await fs.access(filePath);
            // File exists, add a timestamp suffix
            const timestamp = Date.now();
            filename = `${nameWithoutExt}-${timestamp}${ext}`;
            filePath = path.join(UPLOAD_DIR, filename);
        } catch {
            // File doesn't exist
        }

        await fs.writeFile(filePath, buffer);

        // We use the public uploads path
        const fileUrl = `/uploads/admissions/${filename}`;

        return NextResponse.json({
            message: "File uploaded successfully",
            url: fileUrl,
            filename: filename
        }, { status: 201 });
    } catch (error: any) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
