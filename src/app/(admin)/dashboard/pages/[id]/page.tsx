import { getPageBySlug, getPages } from "@/actions/pages";
import PageForm from "../_components/PageForm";
import { notFound } from "next/navigation";

interface IEditPageProps {
    params: Promise<{ id: string }>;
}

export default async function EditPage({ params }: IEditPageProps) {
    const { id } = await params;

    // We can use getPages and filter or refine getPageById for the action.
    // For now, let's assume we want to find it from the list of all pages since ID is used for the folder.
    const allPages = await getPages();
    const pageData = allPages.find((p: any) => p._id === id);

    if (!pageData) {
        return notFound();
    }

    return (
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <PageForm id={id} initialData={pageData} />
        </div>
    );
}