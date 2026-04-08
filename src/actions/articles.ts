"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import Article from "@/db/articles";
import { CACHE_TAGS } from "@/utils/cachetags";
import { deleteFileByUrl } from "./media";
import { hasPermission } from "@/utils/auth";

export async function getArticles(filter: any = {}, sort: any = { createdAt: -1 }, limit?: number, skip?: number, projection: any = {}) {
    "use cache";
    cacheTag(CACHE_TAGS.ARTICLES);
    try {
        await dbConnect();
        let query = Article.find(filter, projection).sort(sort).lean();
        if (skip) query = query.skip(skip);
        if (limit) query = query.limit(limit);

        const articles = await query;
        return JSON.parse(JSON.stringify(articles));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getArticlesWithPagination(filter: any = {}, sort: any = { createdAt: -1 }, limit: number = 10, page: number = 1) {
    "use cache";
    cacheTag(CACHE_TAGS.ARTICLES);
    try {
        await dbConnect();
        const skip = (page - 1) * limit;

        const [articles, total] = await Promise.all([
            Article.find(filter)
                .populate('categoryId', 'name')
                .populate('subcategoryId', 'name')
                .sort(sort).skip(skip).limit(limit).lean(),
            Article.countDocuments(filter)
        ]);

        return {
            articles: JSON.parse(JSON.stringify(articles)),
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getArticleById(id: string) {
    "use cache";
    cacheTag(CACHE_TAGS.ARTICLES);
    try {
        await dbConnect();
        const article = await Article.findById(id).lean();
        return JSON.parse(JSON.stringify(article));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getArticleBySlug(slug: string) {
    "use cache";
    cacheTag(CACHE_TAGS.ARTICLES);
    try {
        await dbConnect();
        const article = await Article.findOne({ slug })
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .lean();
        return JSON.parse(JSON.stringify(article));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function getFeaturedArticle(filter: any = {}) {
    "use cache";
    cacheTag(CACHE_TAGS.FEATURED_ARTICLES);
    cacheTag(CACHE_TAGS.ARTICLES);
    try {
        await dbConnect();
        // Try to get a featured article first
        let article = await Article.findOne({ featured: true, status: 'published', ...filter })
            .populate('categoryId', 'name')
            .populate('subcategoryId', 'name')
            .sort({ createdAt: -1 })
            .lean();

        // If no featured article, fallback to latest published
        if (!article) {
            article = await Article.findOne({ status: 'published', ...filter })
                .populate('categoryId', 'name')
                .populate('subcategoryId', 'name')
                .sort({ createdAt: -1 })
                .lean();
        }

        return JSON.parse(JSON.stringify(article));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createArticle(data: any) {
    try {
        if (!(await hasPermission('learning-hub'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const article = await Article.create(data);
        revalidateTag(CACHE_TAGS.ARTICLES, 'max');
        revalidateTag(CACHE_TAGS.FEATURED_ARTICLES, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(article));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateArticle(id: string, data: any) {
    try {
        if (!(await hasPermission('learning-hub'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const article = await Article.findByIdAndUpdate(id, data, { new: true }).lean();
        revalidateTag(CACHE_TAGS.ARTICLES, 'max');
        revalidateTag(CACHE_TAGS.FEATURED_ARTICLES, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(article));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteArticle(id: string) {
    try {
        if (!(await hasPermission('learning-hub'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const article = await Article.findByIdAndDelete(id).lean() as any;
        if (article && article.featuredImage) {
            await deleteFileByUrl(article.featuredImage);
        }
        revalidateTag(CACHE_TAGS.ARTICLES, 'max');
        revalidateTag(CACHE_TAGS.FEATURED_ARTICLES, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(article));
    } catch (error: any) {
        throw new Error(error.message);
    }
}


