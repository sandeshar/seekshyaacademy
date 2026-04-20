import { getLocationBySlug, getLocations } from "@/actions/locations";
import LocationForm from "../_components/LocationForm";
import { notFound } from "next/navigation";
import dbConnect from "@/db/db";
import Location from "@/db/locations";

export const metadata = {
    title: "Edit Branch | Admin Dashboard",
    description: "Update branch location details",
};

interface IEditLocationPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditLocationPage({ params }: IEditLocationPageProps) {
    const { id } = await params;

    await dbConnect();
    const location = await Location.findById(id).lean();

    if (!location) {
        return notFound();
    }

    return (
        <div className="p-4 md:p-8">
            <LocationForm id={id} initialData={JSON.parse(JSON.stringify(location))} />
        </div>
    );
}
