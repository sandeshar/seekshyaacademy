"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import StudentRankCategory from "@/db/student-rank-categories";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

export async function getStudentRankCategories(filter: any = {}, sort: any = { order: 1, createdAt: -1 }) {
    "use cache";
    cacheTag(CACHE_TAGS.STUDENT_RANK_CATEGORIES);
    try {
        await dbConnect();
        const categories = await StudentRankCategory.find(filter)
            .sort(sort)
            .lean();
        return JSON.parse(JSON.stringify(categories));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getStudentRankCategoryById(id: string) {
    "use cache";
    cacheTag(CACHE_TAGS.STUDENT_RANK_CATEGORIES);
    try {
        await dbConnect();
        const category = await StudentRankCategory.findById(id).lean();
        return JSON.parse(JSON.stringify(category));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createStudentRankCategory(data: any) {
    try {
        await dbConnect();
        if (data.order === undefined) {
            const lastCategory = await StudentRankCategory.findOne({}).sort({ order: -1 }).lean();
            data.order = lastCategory ? (lastCategory.order || 0) + 1 : 0;
        }
        const category = await StudentRankCategory.create(data);
        (revalidateTag as any)(CACHE_TAGS.STUDENT_RANK_CATEGORIES);
        revalidatePath('/dashboard/student-ranks');
        return JSON.parse(JSON.stringify(category));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateStudentRankCategory(id: string, data: any) {
    try {
        await dbConnect();
        const updatedCategory = await StudentRankCategory.findByIdAndUpdate(id, data, { new: true });
        (revalidateTag as any)(CACHE_TAGS.STUDENT_RANK_CATEGORIES);
        revalidatePath('/dashboard/student-ranks');
        return JSON.parse(JSON.stringify(updatedCategory));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteStudentRankCategory(id: string) {
    try {
        await dbConnect();
        await StudentRankCategory.findByIdAndDelete(id);
        (revalidateTag as any)(CACHE_TAGS.STUDENT_RANK_CATEGORIES);
        revalidatePath('/dashboard/student-ranks');
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
