"use server";

import { seedLocations } from "@/actions/seed-locations";

export const handleSeedLocationsAction = async () => {
    return await seedLocations();
};
