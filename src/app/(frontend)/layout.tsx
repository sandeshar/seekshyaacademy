import { Suspense } from "react";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";
import WhatsAppFloatingButton from "./_components/WhatsAppFloatingButton";
import { getSettings } from "@/actions/settings";

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSettings();

    return (
        <>
            <Suspense fallback={<div className="h-20 bg-white" />}>
                <Navbar />
            </Suspense>
            <main className="pt-20">
                <Suspense fallback={
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                }>
                    {children}
                </Suspense>
            </main>
            <Footer />
            {settings?.socialLinks?.whatsapp && (
                <WhatsAppFloatingButton phoneNumber={settings.socialLinks.whatsapp} />
            )}
        </>
    );
}

