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

export default function BlogsTaxonomy() {
    return (
        <TaxonomyManager
            title="Blogs Taxonomy"
            description="Manage categories and subcategories for the Blogs articles."
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


