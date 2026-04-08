"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Notice from "@/db/notices";
import { CACHE_TAGS } from "@/utils/cachetags";
import { deleteFileByUrl } from "./media";
import { hasPermission } from "@/utils/auth";

export async function getNotices(filter: any = {}, sort: any = { date: -1 }, limit?: number, skip?: number, projection: any = {}) {
    "use cache";
    cacheTag(CACHE_TAGS.NOTICES);
    try {
        await dbConnect();
        let query = Notice.find(filter, projection || {}).sort(sort).lean();
        if (skip) query = query.skip(skip);
        if (limit) query = query.limit(limit);

        const notices = await query;
        return JSON.parse(JSON.stringify(notices));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getNoticeById(id: string) {
    "use cache";
    cacheTag(CACHE_TAGS.NOTICES);
    try {
        await dbConnect();
        const notice = await Notice.findById(id).lean();
        return JSON.parse(JSON.stringify(notice));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getNoticeBySlug(slug: string) {
    "use cache";
    cacheTag(CACHE_TAGS.NOTICES);
    try {
        await dbConnect();
        const notice = await Notice.findOne({ slug }).populate('categoryId').lean();
        return JSON.parse(JSON.stringify(notice));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createNotice(data: any) {
    try {
        if (!(await hasPermission('notices'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const notice = await Notice.create(data);
        revalidateTag(CACHE_TAGS.NOTICES, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(notice));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateNotice(id: string, data: any) {
    try {
        if (!(await hasPermission('notices'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const notice = await Notice.findByIdAndUpdate(id, data, { new: true }).lean();
        revalidateTag(CACHE_TAGS.NOTICES, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(notice));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteNotice(id: string) {
    try {
        if (!(await hasPermission('notices'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const notice = await Notice.findByIdAndDelete(id).lean() as any;
        if (notice && notice.documents && notice.documents.length > 0) {
            for (const doc of notice.documents) {
                await deleteFileByUrl(doc.url);
            }
        }
        revalidateTag(CACHE_TAGS.NOTICES, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(notice));
    } catch (error: any) {
        throw new Error(error.message);
    }
}


