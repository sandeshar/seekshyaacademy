"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Page, { IPage } from "@/db/pages";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

export const getPages = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.PAGES);
    await dbConnect();
    const pages = await Page.find().sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(pages)) as IPage[];
};

export const getPageBySlug = async (slug: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.PAGES, slug);
    await dbConnect();
    const page = await Page.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(page)) as IPage | null;
};

export const createPage = async (data: Partial<IPage>) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    const page = await Page.create(data);
    revalidateTag(CACHE_TAGS.PAGES, 'max');
    revalidatePath('/dashboard/pages');
    revalidatePath('/', 'layout');
    return JSON.parse(JSON.stringify(page)) as IPage;
};

export const updatePage = async (id: string, data: Partial<IPage>) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    const page = await Page.findByIdAndUpdate(id, data, { new: true }).lean();

    // Invalidate standard cache tags
    revalidateTag(CACHE_TAGS.PAGES, 'max');
    if (page?.slug) {
        revalidateTag(page.slug, 'max');
        revalidatePath(`/${page.slug}`);
    }

    // Explicitly revalidate the dashboard list view
    revalidatePath('/dashboard/pages');

    // Force a full site layout refresh
    revalidatePath('/', 'layout');

    return JSON.parse(JSON.stringify(page)) as IPage;
};

export const deletePage = async (id: string) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    const page = await Page.findByIdAndDelete(id).lean();
    revalidateTag(CACHE_TAGS.PAGES, 'max');
    revalidatePath('/dashboard/pages');
    revalidatePath('/', 'layout');
    return JSON.parse(JSON.stringify(page)) as IPage;
};