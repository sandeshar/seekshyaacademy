"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Course from "@/db/courses";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

export async function getCourses(filter: any = {}, sort: any = { createdAt: -1 }) {
    "use cache";
    cacheTag(CACHE_TAGS.COURSES || 'courses');
    try {
        await dbConnect();
        const courses = await Course.find(filter)
            .populate('categoryId', 'name slug')
            .populate('subcategoryId', 'name slug')
            .sort(sort).lean();
        return JSON.parse(JSON.stringify(courses));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getCourseById(id: string) {
    "use cache";
    cacheTag(CACHE_TAGS.COURSES || 'courses');
    try {
        await dbConnect();
        const course = await Course.findById(id).lean();
        return JSON.parse(JSON.stringify(course));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createCourse(data: any) {
    if (!(await hasPermission('courses'))) throw new Error("Unauthorized");
    try {
        const sanitizedData = { ...data };
        if (sanitizedData.subcategoryId === "") {
            delete sanitizedData.subcategoryId;
        }

        await dbConnect();
        const course = await Course.create(sanitizedData);
        revalidateTag(CACHE_TAGS.COURSES || 'courses', 'max');
        revalidatePath('/courses', 'layout');
        return JSON.parse(JSON.stringify(course));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateCourse(id: string, data: any) {
    if (!(await hasPermission('courses'))) throw new Error("Unauthorized");
    try {
        const sanitizedData = { ...data };
        if (sanitizedData.subcategoryId === "") {
            sanitizedData.subcategoryId = null;
        }

        await dbConnect();
        const course = await Course.findByIdAndUpdate(id, sanitizedData, { new: true }).lean();
        revalidateTag(CACHE_TAGS.COURSES || 'courses', 'max');
        revalidatePath('/courses', 'layout');
        return JSON.parse(JSON.stringify(course));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteCourse(id: string) {
    if (!(await hasPermission('courses'))) throw new Error("Unauthorized");
    try {
        await dbConnect();
        await Course.findByIdAndDelete(id);
        revalidateTag(CACHE_TAGS.COURSES || 'courses', 'max');
        revalidatePath('/courses', 'layout');
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getCourseBySlug(slug: string) {
    "use cache";
    cacheTag(CACHE_TAGS.COURSES || 'courses');
    try {
        await dbConnect();
        const course = await Course.findOne({ slug }).lean();
        return JSON.parse(JSON.stringify(course));
    } catch (error: any) {
        throw new Error(error.message);
    }
}
