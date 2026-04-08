import { notFound } from "next/navigation";
import { getNoticeBySlug } from "@/actions/notices";
import NoticeDetailClient from "../_components/NoticeDetailClient";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const notice = await getNoticeBySlug(slug);

    if (!notice) return { title: "Notice Not Found" };

    const title = notice.seo?.title || `${notice.title} | Notice`;
    const description = notice.seo?.description || notice.description.replace(/<[^>]*>/g, '').substring(0, 160);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
        }
    };
}

export default async function NoticeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const notice = await getNoticeBySlug(slug);

    if (!notice) {
        return notFound();
    }

    return <NoticeDetailClient notice={notice} />;
}
