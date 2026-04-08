import CTA from "../_components/CTA";
import FeaturedArticle from "./_components/FeaturedArticle";
import CategoryFilters from "./_components/CategoryFilters";
import CombinedArticles from "./_components/CombinedArticles";
import ArticleSearch from "./_components/ArticleSearch";
import { Metadata } from "next";
import { getLearningHubPage } from "@/actions/cms-actions";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getLearningHubPage();

    return {
        title: data?.seo?.title || "Learning Hub",
        description: data?.seo?.description || "Expert insights, study tips, and resources for Chartered Accountancy students.",
    };
}

export default async function LearningHub({ searchParams }: { searchParams: Promise<{ category?: string; subcategory?: string; q?: string; page?: string }> }) {
    const plainPageData = await getLearningHubPage();

    const { category, subcategory, q, page } = await searchParams;
    const currentPage = parseInt(page || '1', 10);

    return (
        <div className="flex flex-col min-h-screen bg-background-light">
            <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 w-full font-lexend">
                {!q && currentPage === 1 && <FeaturedArticle selectedCategory={category} />}

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <CategoryFilters selectedCategory={category} />
                    <ArticleSearch />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-12">
                        <CombinedArticles selectedCategory={category} selectedSubcategory={subcategory} searchQuery={q} page={currentPage} />
                    </div>
                </div>
            </div>

            {plainPageData?.cta?.isVisible !== false && (
                <CTA data={plainPageData?.cta} />
            )}
        </div>
    );
}

