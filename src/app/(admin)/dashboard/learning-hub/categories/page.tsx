"use client";

import TaxonomyManager from "../../_components/TaxonomyManager";
import {
    getHubCategories,
    createHubCategory,
    updateHubCategory,
    deleteHubCategory,
    getHubSubcategories,
    createHubSubcategory,
    updateHubSubcategory,
    deleteHubSubcategory
} from "@/actions/categories";

export default function LearningHubTaxonomy() {
    return (
        <TaxonomyManager
            title="Learning Hub Taxonomy"
            description="Manage categories and subcategories for the Learning Hub articles."
            actions={{
                getCategories: getHubCategories,
                createCategory: createHubCategory,
                updateCategory: updateHubCategory,
                deleteCategory: deleteHubCategory,
                getSubcategories: getHubSubcategories,
                createSubcategory: createHubSubcategory,
                updateSubcategory: updateHubSubcategory,
                deleteSubcategory: deleteHubSubcategory
            }}
            enableSEO={true}
        />
    );
}


