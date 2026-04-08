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
        <div className="flex min-h-screen flex-col bg-slate-50">
            {plainData.hero?.isVisible !== false && <AboutHero data={plainData.hero} />}
            {plainData.qualities?.isVisible !== false && <StatsBar data={plainData.qualities} />}
            <div className="layout-container bg-mountain-pattern bg-bottom bg-no-repeat bg-size-[100%_auto]">
                {plainData.aboutUs?.isVisible !== false && <OurStory data={plainData.aboutUs} />}
                {plainData.cta1?.isVisible !== false && <SyllabusHighlight data={plainData.cta1} />}
                {plainData.philosophy?.isVisible !== false && <Philosophy data={plainData.philosophy} />}
            </div>
            {plainData.cta2?.isVisible !== false && <CTA data={plainData.cta2} />}
        </div>
    );
}

