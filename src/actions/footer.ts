"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Footer from "@/db/footer";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

export async function getFooter() {
    "use cache";
    cacheTag(CACHE_TAGS.FOOTER);
    try {
        await dbConnect();
        let footer = await Footer.findOne().lean() as any;
        if (!footer) {
            footer = await Footer.create({});
            return JSON.parse(JSON.stringify(footer));
        }
        return JSON.parse(JSON.stringify(footer));
    } catch (error: any) {
        console.error("getFooter error:", error);
        throw new Error(error.message);
    }
}

export async function updateFooter(data: any) {
    try {
        if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
        await dbConnect();
        let footer = await Footer.findOne();

        if (footer) {
            Object.assign(footer, data);
            await footer.save();
        } else {
            footer = await Footer.create(data);
        }

        revalidateTag(CACHE_TAGS.FOOTER, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(footer));
    } catch (error: any) {
        console.error("updateFooter error:", error);
        throw new Error(error.message);
    }
}


