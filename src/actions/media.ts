"use server";

import fs from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { hasPermission } from "@/utils/auth";

const UPLOAD_DIR = path.resolve(process.env.UPLOAD_DIR || path.join(process.cwd(), "public", "uploads"));

export async function getMediaFiles() {
    try {
        // Ensure directory exists
        try {
            await fs.access(UPLOAD_DIR);
        } catch {
            return [];
        }

        const files = await fs.readdir(UPLOAD_DIR);
        const fileDetails = await Promise.all(
            files.map(async (filename) => {
                const filePath = path.join(UPLOAD_DIR, filename);
                const stats = await fs.stat(filePath);
                return {
                    name: filename,
                    url: `/api/media/upload/files/${filename}`,
                    size: stats.size,
                    createdAt: stats.birthtime,
                    isFile: stats.isFile(),
                };
            })
        );

        // Filter out directories and hidden files, sort by newest
        return fileDetails
            .filter(f => f.isFile && !f.name.startsWith('.'))
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } catch (error: any) {
        console.error("Error reading media files:", error);
        return [];
    }
}

export async function deleteMediaFile(filename: string) {
    try {
        if (!(await hasPermission('media'))) {
            throw new Error("Unauthorized");
        }
        const filePath = path.join(UPLOAD_DIR, filename);

        // Security check: ensure the file is within the upload directory
        const resolvedPath = path.resolve(filePath);
        if (!resolvedPath.startsWith(UPLOAD_DIR)) {
            return { success: false, error: "Invalid file path" };
        }

        await fs.unlink(filePath);
        revalidatePath("/dashboard/media");
        return { success: true };
    } catch (error: any) {
        console.error("Error deleting media file:", error);
        return { success: false, error: error.message };
    }
}

export async function deleteFileByUrl(url: string) {
    if (!url || !url.startsWith("/api/media/upload/files/")) return { success: false, error: "Not a local file" };
    const filename = url.replace("/api/media/upload/files/", "");
    return deleteMediaFile(filename);
}
