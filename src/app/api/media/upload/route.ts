import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import dbConnect from "@/db/db";
import { getSession } from "@/utils/auth";

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads"));

export async function POST(request: NextRequest) {
    try {
        const session = await getSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
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
            // File exists, add a random suffix before the extension
            const randomSuffix = Math.random().toString(36).substring(2, 8);
            filename = `${nameWithoutExt}-${randomSuffix}${ext}`;
            filePath = path.join(UPLOAD_DIR, filename);
        } catch {
            // File doesn't exist, we can use the original name
        }

        await fs.writeFile(filePath, buffer);

        const fileUrl = `/api/media/upload/files/${filename}`;

        return NextResponse.json({
            message: "File uploaded successfully",
            url: fileUrl,
            filename: filename
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
