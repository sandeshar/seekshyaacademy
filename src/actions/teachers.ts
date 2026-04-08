"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Teacher from "@/db/teachers";
import TeacherCategory from "@/db/teacher-categories";
import TeacherSubcategory from "@/db/teacher-subcategories";
import { CACHE_TAGS } from "@/utils/cachetags";
import { deleteFileByUrl } from "./media";
import { hasPermission } from "@/utils/auth";

export async function getTeachers(filter: any = {}, sort: any = { order: 1, createdAt: -1 }) {
    "use cache";
    cacheTag(CACHE_TAGS.TEACHERS);
    try {
        await dbConnect();
        const teachers = await Teacher.find(filter)
            .sort(sort)
            .populate('categoryIds')
            .populate('subcategoryId')
            .lean();
        return JSON.parse(JSON.stringify(teachers));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getTeacherById(id: string) {
    "use cache";
    cacheTag(CACHE_TAGS.TEACHERS);
    try {
        await dbConnect();
        const teacher = await Teacher.findById(id)
            .populate('categoryIds')
            .populate('subcategoryId')
            .lean();
        return JSON.parse(JSON.stringify(teacher));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createTeacher(data: any) {
    try {
        if (!(await hasPermission('teachers'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        if (data.order === undefined) {
            const lastTeacher = await Teacher.findOne({}).sort({ order: -1 }).lean();
            data.order = lastTeacher ? (lastTeacher as any).order + 1 : 0;
        }
        const teacher = await Teacher.create(data);
        revalidateTag(CACHE_TAGS.TEACHERS, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(teacher));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateTeacher(id: string, data: any) {
    try {
        if (!(await hasPermission('teachers'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const teacher = await Teacher.findByIdAndUpdate(id, data, { new: true }).lean();
        revalidateTag(CACHE_TAGS.TEACHERS, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(teacher));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteTeacher(id: string) {
    try {
        if (!(await hasPermission('teachers'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const teacher = await Teacher.findByIdAndDelete(id).lean() as any;
        if (teacher && teacher.image) {
            await deleteFileByUrl(teacher.image);
        }
        revalidateTag(CACHE_TAGS.TEACHERS, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(teacher));
    } catch (error: any) {
        throw new Error(error.message);
    }
}


