import ContactHero from "./_components/ContactHero";
import ContactInfo from "./_components/ContactInfo";
import ContactForm from "./_components/ContactForm";
import { getContactPage } from "@/actions/cms-actions";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactPage();

  return {
    title: data?.seo?.title || "Contact Us",
    description: data?.seo?.description || "Get in touch with Seekshya Academy for admissions, faculty inquiries, or curriculum details.",
  };
}

export default async function ContactPage() {
  const plainData = await getContactPage();

  return (
    <main className="flex min-h-screen flex-col bg-slate-50">
      {plainData.hero.isVisible && <ContactHero data={plainData.hero} />}
      <div className="flex w-full grow flex-col py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {plainData.contactInfo.isVisible && <ContactInfo data={plainData.contactInfo} />}
            {plainData.contactForm.isVisible && <ContactForm data={plainData.contactForm} />}
          </div>
        </div>
      </div>
    </main>
  );
}

