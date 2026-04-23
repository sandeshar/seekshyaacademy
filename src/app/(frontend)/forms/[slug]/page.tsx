import { getActiveAdmissionForm } from "@/actions/admission-actions";
import AdmissionFormDisplay from "../_components/AdmissionFormDisplay";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const form = await getActiveAdmissionForm(slug);
    return {
        title: form ? `${form.title} | Seekshya Academy` : "Form Not Found",
    };
}

export default async function DynamicAdmissionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const form = await getActiveAdmissionForm(slug);

    if (!form) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4 md:px-8">
            <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-700">
                <AdmissionFormDisplay form={form} />

                <footer className="text-center text-slate-400 text-sm py-10">
                    <p>&copy; {new Date().getFullYear()} Seekshya Academy. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
}
