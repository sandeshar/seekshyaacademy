import type { Metadata } from "next";
import { HomeHero } from "./_components/HomeHero";
import { SuccessStories, FeaturedTestimonial } from "./_components/SuccessStories";
import { WhatIsACCA, WhySeekshya } from "./_components/HomeAbout";
import { EligibilityPath, CourseStructure } from "./_components/HomeCourses";
import { HomeMentors, HomePricing, HomeFAQ, HomeCTA } from "./_components/HomeMisc";
import BlogSection from "./_components/BlogSection";

export const metadata: Metadata = {
  title: "Seekshya Academy | Best ACCA College in Nepal",
  description: "Seekshya Academy helps ACCA aspirants build professional mastery through expert guidance, practical learning, and proven results.",
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-on-background">
      <HomeHero />
      <SuccessStories />
      <WhatIsACCA />
      <WhySeekshya />
      <EligibilityPath />
      <CourseStructure />
      <HomeMentors />
      <BlogSection />
      <HomePricing />
      <HomeFAQ />
      <HomeCTA />
    </main>
  );
}
