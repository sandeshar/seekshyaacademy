import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads"));

export async function GET(
    request: NextRequest,
    context: { params: Promise<{ filename: string }> }
) {
    try {
        const { filename } = await context.params;
        const filePath = path.join(UPLOAD_DIR, filename);

        // Security check: ensure the file is within the upload directory
        const resolvedPath = path.resolve(filePath);
        if (!resolvedPath.startsWith(UPLOAD_DIR)) {
            return NextResponse.json({ error: "Access denied" }, { status: 403 });
        }

        const fileBuffer = await fs.readFile(resolvedPath);

        // Determine content type based on extension
        const ext = path.extname(filename).toLowerCase();
        let contentType = "application/octet-stream";

        const mimeTypes: { [key: string]: string } = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
            ".webp": "image/webp",
            ".svg": "image/svg+xml",
            ".pdf": "application/pdf",
            ".doc": "application/msword",
            ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ".xls": "application/vnd.ms-excel",
            ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ".zip": "application/zip",
        };

        if (mimeTypes[ext]) {
            contentType = mimeTypes[ext];
        }

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
}
