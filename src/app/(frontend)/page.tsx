import Hero from "./_components/Hero";
import Highlights from "./_components/Highlights";
import Courses from "./_components/Courses";
import WhyChooseUs from "./_components/WhyChooseUs";
import CTA from "./_components/CTA";
import { getHomepage } from "@/actions/cms-actions";
import { Metadata } from "next";

async function getHomepageData() {
  return await getHomepage();
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomepageData();
  return {
    title: data?.seo?.title || "Lakshya Academy | CA Professional Education in Nepal",
    description: data?.seo?.description || "Lakshya Academy is Nepal's premier institute for CA (Chartered Accountancy) preparation. Join us for expert guidance and success in your CA journey.",
  };
}

export default async function Home() {
  const data = await getHomepageData();

  if (!data) return null;

  return (
    <main className="min-h-screen">
      {data.hero?.isVisible !== false && <Hero data={data.hero} />}
      {data.highlights?.isVisible !== false && <Highlights data={data.highlights} />}
      {data.courses?.isVisible !== false && <Courses data={data.courses} />}
      {data.whyChooseUs?.isVisible !== false && <WhyChooseUs data={data.whyChooseUs} />}
      {data.cta?.isVisible !== false && <CTA data={data.cta} />}
    </main>
  );
}

