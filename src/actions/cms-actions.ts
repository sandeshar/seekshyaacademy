"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import AboutPage from "@/db/about-page";
import ContactPage from "@/db/contact-page";
import CoursePage from "@/db/course-page";
import FacultyPage from "@/db/faculty-page";
import Homepage from "@/db/homepage";
import NoticesPage from "@/db/notices-page";
import LearningHubPage from "@/db/learning-hub-page";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

export const getHomepage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.HOMEPAGE);
    await dbConnect();
    let page = await Homepage.findOne().lean();
    if (!page) {
        page = await Homepage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateHomepage = async (data: any) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await Homepage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.HOMEPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};

export const getAboutPage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.ABOUTPAGE);
    await dbConnect();
    let page = await AboutPage.findOne().lean();
    if (!page) {
        page = await AboutPage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateAboutPage = async (data: any) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await AboutPage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.ABOUTPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};

export const getContactPage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.CONTACTPAGE);
    await dbConnect();
    let page = await ContactPage.findOne().lean();
    if (!page) {
        page = await ContactPage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateContactPage = async (data: any) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await ContactPage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.CONTACTPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};

export const getCoursePage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.COURSEPAGE);
    await dbConnect();
    let page = await CoursePage.findOne().lean();
    if (!page) {
        page = await CoursePage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateCoursePage = async (data: any) => {
    if (!(await hasPermission('courses'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await CoursePage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.COURSEPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};

export const getFacultyPage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.FACULTYPAGE);
    await dbConnect();
    let page = await FacultyPage.findOne().lean();
    if (!page) {
        page = await FacultyPage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateFacultyPage = async (data: any) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await FacultyPage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.FACULTYPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};

export const getNoticesPage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.NOTICESPAGE);
    await dbConnect();
    let page = await NoticesPage.findOne().lean();
    if (!page) {
        page = await NoticesPage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateNoticesPage = async (data: any) => {
    if (!(await hasPermission('notices'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await NoticesPage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.NOTICESPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};

export const getLearningHubPage = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.LEARNINGHUBPAGE);
    await dbConnect();
    let page = await LearningHubPage.findOne().lean();
    if (!page) {
        page = await LearningHubPage.create({});
    }
    return JSON.parse(JSON.stringify(page));
};
export const updateLearningHubPage = async (data: any) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    let page = await LearningHubPage.findOneAndUpdate({}, data, { new: true, upsert: true }).lean();
    revalidateTag(CACHE_TAGS.LEARNINGHUBPAGE, 'max');
    revalidatePath('/', 'layout');
    revalidatePath('/dashboard', 'layout');
    return JSON.parse(JSON.stringify(page));
};
