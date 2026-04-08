import { notFound } from "next/navigation";
import React from "react";
import CourseHero from "../_components/CourseHero";
import CourseBreadcrumbs from "../_components/CourseBreadcrumbs";
import Courses from "../../_components/Courses";
import { getCoursePage } from "@/actions/cms-actions";
import { getCourseCategoryBySlug, getCourseCategoryById, getCourseSubcategoryBySlug } from "@/actions/categories";
import { getCourses } from "@/actions/courses";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
    const resolvedParams = await params;
    const slugs = resolvedParams.slug || [];

    // slug[0] is category, slug[1] is subcategory
    const categorySlugParam = slugs[0];
    const subcategorySlugParam = slugs[1];

    const coursePage = await getCoursePage();

    // Find the best matching hero (Subcategory > Category > Default > Fallback)
    let matchedConfig = subcategorySlugParam ? coursePage?.categories?.find((c: any) => c.slug === subcategorySlugParam) : null;

    if (!matchedConfig && categorySlugParam) {
        matchedConfig = coursePage?.categories?.find((c: any) => c.slug === categorySlugParam);
    }

    // If specific slug requested but not setup, don't return specific metadata
    if ((categorySlugParam || subcategorySlugParam) && !matchedConfig) {
        return {
            title: "Not Found",
        };
    }

    let heroConfig = matchedConfig;
    if (!heroConfig) {
        heroConfig = coursePage?.categories?.find((c: any) => c.slug === 'default' || c.type === 'default');
    }

    // Last resort fallback
    if (!heroConfig) {
        heroConfig = coursePage?.categories?.find((c: any) => c.slug === 'foundation') || coursePage?.categories?.[0];
    }

    const config = heroConfig;

    return {
        title: config?.seo?.title || (config?.hero?.title || "Courses"),
        description: config?.seo?.description || config?.hero?.description || "Expert guidance for Chartered Accountancy.",
    };
}

export default async function CoursesPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const resolvedParams = await params;
    const slugs = resolvedParams.slug || [];

    const categorySlugParam = slugs[0];
    const subcategorySlugParam = slugs[1];
    const isLandingPage = !categorySlugParam;

    const coursePage = await getCoursePage();

    // Find the best matching hero config
    // We prioritize the specific slug configuration. If it doesn't exist, we don't allow viewing that specific category/subcategory page.
    let matchedConfig = subcategorySlugParam ? coursePage?.categories?.find((c: any) => c.slug === subcategorySlugParam) : null;

    if (!matchedConfig && categorySlugParam) {
        matchedConfig = coursePage?.categories?.find((c: any) => c.slug === categorySlugParam);
    }

    // If a specific category/subcategory was requested but no config exists for it, return 404
    if ((categorySlugParam || subcategorySlugParam) && !matchedConfig) {
        notFound();
    }

    // Fallback to default config for landing page or if matchedConfig is not set (which shouldn't happen here due to notFound)
    let heroConfig = matchedConfig;
    if (!heroConfig) {
        heroConfig = coursePage?.categories?.find((c: any) => c.slug === 'default' || c.type === 'default');
    }

    // Provision fallback hero data if still not found
    const heroDataRaw = heroConfig?.hero || {
        isVisible: true,
        badgeText: "Seekshya Academy Academy",
        title: "Chartered Accountancy courses",
        description: "Join Nepal's premier institute for CA Foundation, Intermediate, and Final levels. Expert guidance for ICAN success.",
        backgroundImage: "https://images.unsplash.com/photo-1523050335392-9bef867a0571?q=80&w=2070&auto=format&fit=crop",
        primaryButton: { text: "Explore Courses", link: "#courses-grid" },
        secondaryButton: { text: "Admissions", link: "/contact" }
    };
    const heroData = heroDataRaw;
    const bodyContent = heroConfig?.content;
    const richTextItems = heroConfig?.richTextItems || [];
    const manualCourses = heroConfig?.courses;

    // Determine Display Name and Breadcrumb Data
    let categoryData: { name: any; slug: any; } | null = null;
    let subName = "";

    if (categorySlugParam) {
        const cat = await getCourseCategoryBySlug(categorySlugParam);
        if (cat) {
            categoryData = { name: cat.name, slug: cat.slug };
        }
    }

    if (subcategorySlugParam) {
        const sub = await getCourseSubcategoryBySlug(subcategorySlugParam);
        if (sub) {
            subName = sub.name;
            // If we don't have category from slug, try to get it from the subcategory's relation
            if (!categoryData && sub.categoryId) {
                const cat = await getCourseCategoryById(sub.categoryId);
                if (cat) categoryData = { name: cat.name, slug: cat.slug };
            }
        }
    }

    // Build filter for courses from DB
    const courseFilter: any = { status: 'active' };
    if (categoryData) {
        const cat = await getCourseCategoryBySlug(categorySlugParam);
        if (cat) courseFilter.categoryId = cat._id;
    }
    if (subcategorySlugParam) {
        const sub = await getCourseSubcategoryBySlug(subcategorySlugParam);
        if (sub) courseFilter.subcategoryId = sub._id;
    }

    let dbCourses = await getCourses(courseFilter);

    // If on landing page, only show courses from categories/subcategories that are "setup" in CMS
    if (isLandingPage) {
        const setupSlugs = new Set(coursePage?.categories?.map((c: any) => c.slug) || []);
        dbCourses = dbCourses.filter((course: any) => {
            const catSlug = course.categoryId?.slug;
            const subCatSlug = course.subcategoryId?.slug;
            return setupSlugs.has(catSlug) || (subCatSlug && setupSlugs.has(subCatSlug));
        });
    }

    return (
        <main className="flex min-h-screen flex-col bg-slate-50">
            <CourseBreadcrumbs
                category={categoryData || undefined}
                subcategoryName={subName || undefined}
            />
            <CourseHero data={heroData} />

            {/* Courses Listing Section */}
            {(manualCourses?.items && manualCourses.items.length > 0) ? (
                <div id="courses-grid" className="scroll-mt-20">
                    <Courses
                        data={{
                            title: manualCourses.title || (isLandingPage ? "Our Programs" : (subName || categoryData?.name || "Available Courses")),
                            subtitle: manualCourses.subtitle || "Expert Training",
                            items: manualCourses.items
                        }}
                    />
                </div>
            ) : dbCourses.length > 0 ? (
                <div id="courses-grid" className="scroll-mt-20">
                    <Courses
                        data={{
                            title: isLandingPage ? "Our Programs" : (subName || categoryData?.name || "Available Courses"),
                            subtitle: "Expert Training",
                            items: dbCourses
                        }}
                    />
                </div>
            ) : null}

            {bodyContent && (
                <div className="bg-white">
                    <div className="layout-content-container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div
                            className="prose prose-slate prose-base lg:prose-lg max-w-none text-slate-700 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: bodyContent }}
                        />
                    </div>
                </div>
            )}

            {richTextItems.length > 0 && (
                <div className="bg-slate-50 border-y border-slate-100">
                    <div className="layout-content-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
                        {richTextItems.map((item: any, idx: number) => (
                            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">
                                <div className="lg:col-span-4 lg:sticky lg:top-20">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="size-12 md:size-14 shrink-0 rounded-2xl bg-white shadow-sm border border-slate-100 text-primary flex items-center justify-center">
                                            <span className="material-symbols-outlined text-2xl md:text-3xl">{item.icon || 'star'}</span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 font-display leading-tight">
                                            {item.title}
                                        </h2>
                                    </div>
                                    <div className="h-1 w-12 bg-primary/20 rounded-full ml-16 md:ml-18"></div>
                                </div>
                                <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-3xl border border-slate-100 shadow-sm overflow-hidden text-slate-700">
                                    <div
                                        className="prose prose-slate prose-base lg:prose-lg max-w-none leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: item.content }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
