import React from "react";
import CTA from "../_components/CTA";
import AboutHero from "./_components/AboutHero";
import StatsBar from "./_components/StatsBar";
import OurStory from "./_components/OurStory";
import SyllabusHighlight from "./_components/SyllabusHighlight";
import Philosophy from "./_components/Philosophy";
import { getAboutPage } from "@/actions/cms-actions";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getAboutPage();

    return {
        title: data?.seo?.title || "About Us",
        description: data?.seo?.description || "Learn about Seekshya Academy's mission, vision, and a decade of excellence in CA education in Nepal.",
    };
}

export default async function AboutPage() {
    const plainData = await getAboutPage();

    if (!plainData) return null;

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {plainData.hero?.isVisible !== false && <AboutHero data={plainData.hero} />}

            <div className="layout-container relative">
                {/* Reordered: Philosophy first for academic focus */}
                {plainData.philosophy?.isVisible !== false && <Philosophy data={plainData.philosophy} />}

                {/* Stats bar in between content */}
                {plainData.qualities?.isVisible !== false && <StatsBar data={plainData.qualities} />}

                {/* Story follows stats */}
                {plainData.aboutUs?.isVisible !== false && <OurStory data={plainData.aboutUs} />}

                {/* Highlight/CTA before final footer CTA */}
                {plainData.cta1?.isVisible !== false && <SyllabusHighlight data={plainData.cta1} />}
            </div>
        </div>
    );
}

