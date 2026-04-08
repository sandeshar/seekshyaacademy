"use server";

import dbConnect from "@/db/db";
import User from "@/db/users";
import Teacher from "@/db/teachers";
import Article from "@/db/articles";
import Notice from "@/db/notices";
import ContactSubmission from "@/db/contact-submissions";
import { hasPermission, getSession } from "@/utils/auth";

export async function getDashboardStats() {
    try {
        const session = await getSession();
        if (!session) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const [users, teachers, articles, notices, contacts] = await Promise.all([
            User.countDocuments(),
            Teacher.countDocuments(),
            Article.countDocuments(),
            Notice.countDocuments(),
            ContactSubmission.countDocuments({ status: { $ne: 'archived' } })
        ]);

        return {
            users,
            teachers,
            articles,
            notices,
            contacts
        };
    } catch (error: any) {
        console.error("getDashboardStats error:", error);
        throw new Error(error.message);
    }
}
