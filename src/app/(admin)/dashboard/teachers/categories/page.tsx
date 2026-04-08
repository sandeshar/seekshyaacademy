"use client";

import TaxonomyManager from "../../_components/TaxonomyManager";
import {
    getTeacherCategories,
    createTeacherCategory,
    updateTeacherCategory,
    deleteTeacherCategory,
    getTeacherSubcategories,
    createTeacherSubcategory,
    updateTeacherSubcategory,
    deleteTeacherSubcategory
} from "@/actions/categories";

export default function TeacherTaxonomyManager() {
    return (
        <TaxonomyManager
            title="Teacher Taxonomy Manager"
            description="Organize your faculty members into departments (categories) and specializations (subcategories)."
            actions={{
                getCategories: getTeacherCategories,
                createCategory: createTeacherCategory,
                updateCategory: updateTeacherCategory,
                deleteCategory: deleteTeacherCategory,
                getSubcategories: getTeacherSubcategories,
                createSubcategory: createTeacherSubcategory,
                updateSubcategory: updateTeacherSubcategory,
                deleteSubcategory: deleteTeacherSubcategory
            }}
            enableSEO={false}
        />
    );
}

// Sub-components removed as they are now handled by TaxonomyManager


