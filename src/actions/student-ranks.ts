"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import StudentRank from "@/db/student-ranks";
import StudentRankCategory from "@/db/student-rank-categories";
import { CACHE_TAGS } from "@/utils/cachetags";
import { deleteFileByUrl } from "./media";
import { hasPermission } from "@/utils/auth";

export async function getStudentRanks(filter: any = {}, sort: any = { order: 1, createdAt: -1 }) {
    "use cache";
    cacheTag(CACHE_TAGS.STUDENT_RANKS);
    try {
        await dbConnect();
        const ranks = await StudentRank.find(filter)
            .populate('categoryId')
            .sort(sort)
            .lean();
        return JSON.parse(JSON.stringify(ranks));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getStudentRankById(id: string) {
    "use cache";
    cacheTag(CACHE_TAGS.STUDENT_RANKS);
    try {
        await dbConnect();
        const rank = await StudentRank.findById(id).lean();
        return JSON.parse(JSON.stringify(rank));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createStudentRank(data: any) {
    try {
        await dbConnect();
        if (data.order === undefined) {
            const lastRank = await StudentRank.findOne({}).sort({ order: -1 }).lean();
            data.order = lastRank ? (lastRank.order || 0) + 1 : 0;
        }

        // Handle empty categoryId
        if (data.categoryId === "") {
            delete data.categoryId;
        }

        const rank = await StudentRank.create(data);
        (revalidateTag as any)(CACHE_TAGS.STUDENT_RANKS);
        revalidatePath('/dashboard/student-ranks');
        return JSON.parse(JSON.stringify(rank));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateStudentRank(id: string, data: any) {
    try {
        await dbConnect();

        // Handle empty categoryId
        if (data.categoryId === "") {
            data.categoryId = null;
        }

        const updatedRank = await StudentRank.findByIdAndUpdate(id, data, { new: true });
        (revalidateTag as any)(CACHE_TAGS.STUDENT_RANKS);
        revalidatePath('/dashboard/student-ranks');
        return JSON.parse(JSON.stringify(updatedRank));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteStudentRank(id: string) {
    try {
        await dbConnect();
        const rank = await StudentRank.findById(id);
        if (rank && rank.image) {
            await deleteFileByUrl(rank.image);
        }
        await StudentRank.findByIdAndDelete(id);
        (revalidateTag as any)(CACHE_TAGS.STUDENT_RANKS);
        revalidatePath('/dashboard/student-ranks');
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
