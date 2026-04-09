import CTA from "../_components/CTA";
import FacultyHero from "./_components/FacultyHero";
import FacultyFilters from "./_components/FacultyFilters";
import FacultyGrid from "./_components/FacultyGrid";
import { getTeacherCategories, getTeacherSubcategories } from "@/actions/categories";
import { getTeachers } from "@/actions/teachers";
import { getFacultyPage } from "@/actions/cms-actions";

async function getFacultyData() {
    const categories = await getTeacherCategories();
    const subcategories = await getTeacherSubcategories();
    const teachers = await getTeachers({ status: 'active' });
    const facultyPageData = await getFacultyPage();

    return {
        categories,
        subcategories,
        teachers,
        facultyPageData
    };
}

export async function generateMetadata() {
    const { facultyPageData } = await getFacultyData();
    return {
        title: facultyPageData?.seo?.title || "Our Faculty",
        description: facultyPageData?.seo?.description || "Meet the expert mentors leading the way for ICAN CA success at Seekshya Academy.",
    };
}

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string; subcategory?: string; q?: string }> }) {
    const { category, subcategory, q } = await searchParams;
    const { categories, subcategories, teachers, facultyPageData } = await getFacultyData();

    let filteredTeachers = [...teachers];

    if (category) {
        filteredTeachers = filteredTeachers.filter((t: any) => {
            const hasCat = t.categoryIds?.some((cat: any) =>
                (typeof cat === 'object' ? cat.slug : null) === category
            );
            return hasCat;
        });
    }

    if (subcategory) {
        filteredTeachers = filteredTeachers.filter((t: any) => {
            const subCatSlug = typeof t.subcategoryId === 'object' ? t.subcategoryId?.slug : null;
            return subCatSlug === subcategory;
        });
    }

    if (q) {
        const query = q.toLowerCase();
        filteredTeachers = filteredTeachers.filter((t: any) =>
            t.name.toLowerCase().includes(query) ||
            t.subject?.toLowerCase().includes(query) ||
            t.qualifications?.toLowerCase().includes(query)
        );
    }

    return (
        <main className="flex min-h-screen flex-col bg-background">
            {facultyPageData?.hero?.isVisible !== false && (
                <FacultyHero data={facultyPageData?.hero} />
            )}
            <FacultyFilters
                categories={categories}
                subcategories={subcategories}
                selectedCategory={category}
                selectedSubcategory={subcategory}
            />
            <FacultyGrid teachers={filteredTeachers} data={facultyPageData?.grid} />
            {facultyPageData?.cta?.isVisible !== false && (
                <CTA data={facultyPageData?.cta} />
            )}
        </main>
    );
}

