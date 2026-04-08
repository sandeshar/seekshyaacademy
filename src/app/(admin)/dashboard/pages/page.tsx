import { getPages } from "@/actions/pages";
import PagesList from "./_components/PagesList";

export default async function PagesDashboard() {
    const pages = await getPages();

    return (
        <div className="max-w-7xl mx-auto py-8 px-6 lg:px-12 space-y-8 min-h-screen">
            <header className="space-y-2">
                <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-blue-600 rounded-full shadow-lg shadow-blue-500/20"></div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Custom Pages</h1>
                </div>
                <p className="text-slate-500 text-base font-medium max-w-2xl leading-relaxed">
                    Manage your website&apos;s architecture through content-rich static pages and custom SEO-optimized landing layouts.
                </p>
            </header>

            <PagesList initialPages={pages} />
        </div>
    );
}