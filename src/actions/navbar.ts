"use server";

import dbConnect from "@/db/db";
import Navbar from "@/db/navbar";
import { CACHE_TAGS } from "@/utils/cachetags";
import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import { hasPermission } from "@/utils/auth";

export async function getNavbar() {
    "use cache";
    cacheTag(CACHE_TAGS.NAVBAR);
    try {
        await dbConnect();
        let navbar = await Navbar.findOne().lean() as any;
        if (!navbar) {
            navbar = await Navbar.create({});
            return JSON.parse(JSON.stringify(navbar));
        }
        return JSON.parse(JSON.stringify(navbar));
    } catch (error: any) {
        console.error("getNavbar error:", error);
        throw new Error(error.message);
    }
}

export async function updateNavbar(data: any) {
    try {
        if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
        await dbConnect();
        let navbar = await Navbar.findOne();

        if (navbar) {
            navbar.items = data.items;
            if (data.cta) {
                navbar.cta = data.cta;
            }
            await navbar.save();
        } else {
            navbar = await Navbar.create(data);
        }
        revalidateTag(CACHE_TAGS.NAVBAR, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(navbar));
    } catch (error: any) {
        console.error("updateNavbar error:", error);
        throw new Error(error.message);
    }
}


