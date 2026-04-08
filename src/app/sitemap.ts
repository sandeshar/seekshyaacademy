import { MetadataRoute } from 'next';
import { getArticles } from '@/actions/articles';
import { getNotices } from '@/actions/notices';
import { getCourseCategories, getCourseSubcategories } from '@/actions/categories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lakshyaca.com';

    // Static routes
    const staticRoutes = [
        '',
        '/about',
        '/contact',
        '/courses',
        '/faculty',
        '/learning-hub',
        '/notices',
    ].map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.9,
    }));

    // Dynamic routes: Articles
    const articles = await getArticles({ status: 'published' }, { createdAt: -1 }, undefined, undefined, { slug: 1, updatedAt: 1 });
    const articleRoutes = articles.map((article: any) => ({
        url: `${baseUrl}/learning-hub/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.95,
    }));

    // Dynamic routes: Notices
    const notices = await getNotices({ status: 'active' }, { date: -1 }, undefined, undefined, { slug: 1, updatedAt: 1 });
    const noticeRoutes = notices.map((notice: any) => ({
        url: `${baseUrl}/notices/${notice.slug}`,
        lastModified: new Date(notice.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.95,
    }));

    // Dynamic routes: Courses
    const categories = await getCourseCategories({ slug: 1, updatedAt: 1 });
    const categoryRoutes = categories.map((cat: any) => ({
        url: `${baseUrl}/courses/${cat.slug}`,
        lastModified: new Date(cat.updatedAt),
        changeFrequency: 'daily' as const,
        priority: 0.95,
    }));

    const subcategories = await getCourseSubcategories(undefined, { slug: 1, categoryId: 1, updatedAt: 1 });
    const subcategoryRoutes = subcategories.map((sub: any) => {
        const cat = categories.find((c: any) => c._id.toString() === sub.categoryId.toString());
        return {
            url: `${baseUrl}/courses/${cat?.slug || 'all'}/${sub.slug}`,
            lastModified: new Date(sub.updatedAt),
            changeFrequency: 'daily' as const,
            priority: 0.95,
        };
    });

    return [
        ...staticRoutes,
        ...articleRoutes,
        ...noticeRoutes,
        ...categoryRoutes,
        ...subcategoryRoutes,
    ];
}
