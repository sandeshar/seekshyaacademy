"use client";

import TaxonomyManager from "../../_components/TaxonomyManager";
import {
    getStudentRankCategories,
    createStudentRankCategory,
    updateStudentRankCategory,
    deleteStudentRankCategory
} from "@/actions/student-rank-categories";

export default function StudentRankCategoriesPage() {
    return (
        <TaxonomyManager
            title="Success Stories Categories"
            description="Manage categories for student success stories and ranks."
            actions={{
                getCategories: getStudentRankCategories,
                createCategory: (data) => createStudentRankCategory(data),
                updateCategory: (id, data) => updateStudentRankCategory(id, data),
                deleteCategory: (id) => deleteStudentRankCategory(id),
                // Subcategories are not needed for this taxonomy
                getSubcategories: async () => [],
                createSubcategory: async () => { },
                updateSubcategory: async () => { },
                deleteSubcategory: async () => { }
            }}
            enableSEO={false}
        />
    );
}
