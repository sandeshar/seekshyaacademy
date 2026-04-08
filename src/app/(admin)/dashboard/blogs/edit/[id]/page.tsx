import ArticleForm from "../../_components/ArticleForm";

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <ArticleForm params={resolvedParams} />;
}

