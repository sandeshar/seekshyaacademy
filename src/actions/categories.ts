"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import TeacherCategory from "@/db/teacher-categories";
import TeacherSubcategory from "@/db/teacher-subcategories";
import NoticeCategory from "@/db/notice-categories";
import NoticeSubcategory from "@/db/notice-subcategories";
import CourseCategory from "@/db/course-categories";
import CourseSubcategory from "@/db/course-subcategories";
import Category from "@/db/categories";
import Subcategory from "@/db/subcategories";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

// Generic category actions - Internal helpers (NOT cached, do not call directly from outside)
async function createCategory(Model: any, data: any) {
    if (!(await hasPermission('cms')) &&
        !(await hasPermission('teachers')) &&
        !(await hasPermission('notices')) &&
        !(await hasPermission('blogs')) &&
        !(await hasPermission('courses'))) {
        throw new Error("Unauthorized");
    }
    await dbConnect();
    if (data.order === undefined) {
        const lastCategory = await Model.findOne({}).sort({ order: -1 }).lean();
        data.order = lastCategory ? (lastCategory.order || 0) + 1 : 0;
    }
    const category = await Model.create(data);
    revalidateTag(CACHE_TAGS.CATEGORIES, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(category));
}

async function updateCategory(Model: any, id: string, data: any) {
    if (!(await hasPermission('cms')) &&
        !(await hasPermission('teachers')) &&
        !(await hasPermission('notices')) &&
        !(await hasPermission('blogs')) &&
        !(await hasPermission('courses'))) {
        throw new Error("Unauthorized");
    }
    await dbConnect();
    const category = await Model.findByIdAndUpdate(id, data, { new: true }).lean();
    revalidateTag(CACHE_TAGS.CATEGORIES, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(category));
}

async function deleteCategory(Model: any, id: string) {
    if (!(await hasPermission('cms')) &&
        !(await hasPermission('teachers')) &&
        !(await hasPermission('notices')) &&
        !(await hasPermission('blogs')) &&
        !(await hasPermission('courses'))) {
        throw new Error("Unauthorized");
    }
    await dbConnect();
    const category = await Model.findByIdAndDelete(id).lean();
    revalidateTag(CACHE_TAGS.CATEGORIES, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(category));
}

// Teacher Categories
export const getTeacherCategories = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const categories = await TeacherCategory.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
};
export const createTeacherCategory = async (data: any) => createCategory(TeacherCategory, data);
export const updateTeacherCategory = async (id: string, data: any) => updateCategory(TeacherCategory, id, data);
export const deleteTeacherCategory = async (id: string = "") => deleteCategory(TeacherCategory, id);

// Teacher Subcategories
export const getTeacherSubcategories = async (categoryId?: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const filter = categoryId ? { categoryId } : {};
    const subcategories = await TeacherSubcategory.find(filter).populate('categoryId', 'name').sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(subcategories));
};
export const createTeacherSubcategory = async (data: any) => createCategory(TeacherSubcategory, data);
export const updateTeacherSubcategory = async (id: string, data: any) => updateCategory(TeacherSubcategory, id, data);
export const deleteTeacherSubcategory = async (id: string) => deleteCategory(TeacherSubcategory, id);

// Notice Categories
export const getNoticeCategories = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const categories = await NoticeCategory.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
};
export const createNoticeCategory = async (data: any) => createCategory(NoticeCategory, data);
export const updateNoticeCategory = async (id: string, data: any) => updateCategory(NoticeCategory, id, data);
export const deleteNoticeCategory = async (id: string = "") => deleteCategory(NoticeCategory, id);

// Notice Subcategories
export const getNoticeSubcategories = async (categoryId?: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const filter = categoryId ? { categoryId } : {};
    const subcategories = await NoticeSubcategory.find(filter).populate('categoryId', 'name').sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(subcategories));
};
export const createNoticeSubcategory = async (data: any) => createCategory(NoticeSubcategory, data);
export const updateNoticeSubcategory = async (id: string, data: any) => updateCategory(NoticeSubcategory, id, data);
export const deleteNoticeSubcategory = async (id: string) => deleteCategory(NoticeSubcategory, id);

// Course Categories
export const getCourseCategories = async (projection: any = {}) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const categories = await CourseCategory.find({}, projection).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
};
export const getCourseCategoryBySlug = async (slug: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const category = await CourseCategory.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(category));
};
export const getCourseCategoryById = async (id: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const category = await CourseCategory.findById(id).lean();
    return JSON.parse(JSON.stringify(category));
};
export const createCourseCategory = async (data: any) => createCategory(CourseCategory, data);
export const updateCourseCategory = async (id: string, data: any) => updateCategory(CourseCategory, id, data);
export const deleteCourseCategory = async (id: string) => deleteCategory(CourseCategory, id);

// Course Subcategories
export const getCourseSubcategories = async (categoryId?: string, projection: any = {}) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const filter = categoryId ? { categoryId } : {};
    const subcategories = await CourseSubcategory.find(filter, projection).populate('categoryId', 'name').sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(subcategories));
};
export const getCourseSubcategoryBySlug = async (slug: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const subcategory = await CourseSubcategory.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(subcategory));
};
export const createCourseSubcategory = async (data: any) => createCategory(CourseSubcategory, data);
export const updateCourseSubcategory = async (id: string, data: any) => updateCategory(CourseSubcategory, id, data);
export const deleteCourseSubcategory = async (id: string) => deleteCategory(CourseSubcategory, id);

// Learning Hub Categories
export const getHubCategories = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const categories = await Category.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(categories));
};
export const getHubCategoryBySlug = async (slug: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const category = await Category.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(category));
};
export const createHubCategory = async (data: any) => createCategory(Category, data);
export const updateHubCategory = async (id: string, data: any) => updateCategory(Category, id, data);
export const deleteHubCategory = async (id: string) => deleteCategory(Category, id);

// Learning Hub Subcategories
export const getHubSubcategories = async (categoryId?: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const filter = categoryId ? { categoryId } : {};
    const subcategories = await Subcategory.find(filter).populate('categoryId', 'name').sort({ order: 1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(subcategories));
};
export const getHubSubcategoryBySlug = async (slug: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.CATEGORIES);
    await dbConnect();
    const subcategory = await Subcategory.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(subcategory));
};
export const createHubSubcategory = async (data: any) => createCategory(Subcategory, data);
export const updateHubSubcategory = async (id: string, data: any) => updateCategory(Subcategory, id, data);
export const deleteHubSubcategory = async (id: string) => deleteCategory(Subcategory, id);


