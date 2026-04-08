import { Metadata } from "next";
import { getNoticesPage } from "@/actions/cms-actions";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
    const noticesPage = await getNoticesPage();
    return {
        title: noticesPage?.seo?.title || "Notices & Updates",
        description: noticesPage?.seo?.description || "Stay informed with the latest ICAN announcements, exam schedules, and class updates.",
    };
}

export default function NoticesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={
            <div className="grow flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
        }>
            {children}
        </Suspense>
    );
}
