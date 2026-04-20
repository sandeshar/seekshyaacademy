"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Location, { ILocation } from "@/db/locations";
import { CACHE_TAGS } from "@/utils/cachetags";
import { hasPermission } from "@/utils/auth";

export const getLocations = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.LOCATIONS);
    await dbConnect();
    const locations = await Location.find().sort({ isMainBranch: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(locations)) as ILocation[];
};

export const getPublishedLocations = async () => {
    "use cache";
    cacheTag(CACHE_TAGS.LOCATIONS);
    await dbConnect();
    const locations = await Location.find({ status: 'published' }).sort({ isMainBranch: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(locations)) as ILocation[];
};

export const getLocationBySlug = async (slug: string) => {
    "use cache";
    cacheTag(CACHE_TAGS.LOCATIONS, slug);
    await dbConnect();
    const location = await Location.findOne({ slug }).lean();
    return JSON.parse(JSON.stringify(location)) as ILocation | null;
};

export const createLocation = async (data: Partial<ILocation>) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    const location = await Location.create(data);
    revalidateTag(CACHE_TAGS.LOCATIONS, 'max');
    revalidatePath('/dashboard/locations');
    revalidatePath('/locations');
    revalidatePath('/', 'layout');
    return JSON.parse(JSON.stringify(location)) as ILocation;
};

export const updateLocation = async (id: string, data: Partial<ILocation>) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    const location = await Location.findByIdAndUpdate(id, data, { new: true }).lean();

    revalidateTag(CACHE_TAGS.LOCATIONS, 'max');
    if (location?.slug) {
        revalidateTag(location.slug, 'max');
        revalidatePath(`/locations/${location.slug}`);
    }

    revalidatePath('/dashboard/locations');
    revalidatePath('/locations');
    revalidatePath('/', 'layout');

    return JSON.parse(JSON.stringify(location)) as ILocation;
};

export const deleteLocation = async (id: string) => {
    if (!(await hasPermission('cms'))) throw new Error("Unauthorized");
    await dbConnect();
    const location = await Location.findByIdAndDelete(id).lean();
    revalidateTag(CACHE_TAGS.LOCATIONS, 'max');
    revalidatePath('/dashboard/locations');
    revalidatePath('/locations');
    revalidatePath('/', 'layout');
    return JSON.parse(JSON.stringify(location)) as ILocation;
};
