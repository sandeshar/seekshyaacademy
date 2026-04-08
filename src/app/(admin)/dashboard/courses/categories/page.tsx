"use client";

import TaxonomyManager from "../../_components/TaxonomyManager";
import {
    getCourseCategories,
    createCourseCategory,
    updateCourseCategory,
    deleteCourseCategory,
    getCourseSubcategories,
    createCourseSubcategory,
    updateCourseSubcategory,
    deleteCourseSubcategory
} from "@/actions/categories";

export default function CourseTaxonomyManager() {
    return (
        <TaxonomyManager
            title="Course Category Manager"
            description="Manage your course levels (categories) and specific batches or specializations (subcategories)."
            actions={{
                getCategories: getCourseCategories,
                createCategory: createCourseCategory,
                updateCategory: updateCourseCategory,
                deleteCategory: deleteCourseCategory,
                getSubcategories: getCourseSubcategories,
                createSubcategory: createCourseSubcategory,
                updateSubcategory: updateCourseSubcategory,
                deleteSubcategory: deleteCourseSubcategory
            }}
            enableSEO={true}
        />
    );
}
