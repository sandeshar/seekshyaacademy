"use client";

import TaxonomyManager from "../../_components/TaxonomyManager";
import {
    getNoticeCategories,
    createNoticeCategory,
    updateNoticeCategory,
    deleteNoticeCategory,
    getNoticeSubcategories,
    createNoticeSubcategory,
    updateNoticeSubcategory,
    deleteNoticeSubcategory
} from "@/actions/categories";

export default function NoticeTaxonomyManager() {
    return (
        <TaxonomyManager
            title="Notice Taxonomy Manager"
            description="Organize your notices into types (categories) and priority levels (subcategories)."
            actions={{
                getCategories: getNoticeCategories,
                createCategory: createNoticeCategory,
                updateCategory: updateNoticeCategory,
                deleteCategory: deleteNoticeCategory,
                getSubcategories: getNoticeSubcategories,
                createSubcategory: createNoticeSubcategory,
                updateSubcategory: updateNoticeSubcategory,
                deleteSubcategory: deleteNoticeSubcategory
            }}
            enableSEO={false}
        />
    );
}
