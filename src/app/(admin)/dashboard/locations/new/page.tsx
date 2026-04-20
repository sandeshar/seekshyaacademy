import LocationForm from "../_components/LocationForm";

export const metadata = {
    title: "Add New Branch | Admin Dashboard",
    description: "Create a new branch location for the academy",
};

export default function NewLocationPage() {
    return (
        <div className="p-4 md:p-8">
            <LocationForm />
        </div>
    );
}
