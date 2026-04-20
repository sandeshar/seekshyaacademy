import { getLocationBySlug } from "@/actions/locations";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
    MapPin, 
    Phone, 
    Mail, 
    ChevronLeft,
    Clock,
    ArrowUpRight,
    Globe,
    Share2,
    Calendar,
    MessageCircle
} from "lucide-react";

interface ILocationDetailPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ILocationDetailPageProps) {
    const { slug } = await params;
    const location = await getLocationBySlug(slug);
    if (!location) return { title: "Location Not Found" };
    return {
        title: `${location.seo?.title || location.name} | Seekshya Academy`,
        description: location.seo?.description || `Visit our ${location.name} campus for world-class finance education.`,
    };
}

export default async function LocationDetailPage({ params }: ILocationDetailPageProps) {
    const { slug } = await params;
    const location = await getLocationBySlug(slug);

    if (!location || location.status !== 'published') return notFound();

    return (
        <main className="min-h-screen bg-white">
            {/* Ultra Simple Header */}
            <div className="pt-24 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <Link 
                        href="/locations" 
                        className="inline-flex items-center gap-2 text-slate-400 font-bold text-xs tracking-widest uppercase mb-4 hover:text-blue-600 transition-colors"
                    >
                        <ChevronLeft className="w-3 h-3" />
                        Back to Network
                    </Link>
                    
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                        {location.name}
                    </h1>

                    <div className="flex flex-col md:flex-row md:items-center gap-6 pb-6 border-b border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span>{location.address}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm">
                            <Phone className="w-4 h-4 text-blue-600" />
                            <span>{location.phone}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Single Column Content */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                {/* Featured Image */}
                {location.image && (
                    <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-8 bg-slate-100">
                        <Image 
                            src={location.image} 
                            alt={location.name} 
                            fill 
                            className="object-cover" 
                            priority 
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Main Narrative */}
                    <div className="md:col-span-2">
                        <div className="prose prose-slate prose-base max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-black
                            prose-p:text-slate-600 prose-p:leading-relaxed
                            prose-strong:text-slate-900">
                            <div dangerouslySetInnerHTML={{ __html: location.content }} />
                        </div>
                    </div>

                    {/* Quick Contacts Sidebar */}
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Contact Branch</h3>
                            <div className="space-y-2">
                                <a 
                                    href={`tel:${location.phone}`}
                                    className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm"
                                >
                                    <Phone className="w-4 h-4" />
                                    {location.phone}
                                </a>
                                {location.email && (
                                    <a 
                                        href={`mailto:${location.email}`}
                                        className="flex items-center gap-3 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm break-all"
                                    >
                                        <Mail className="w-4 h-4" />
                                        {location.email}
                                    </a>
                                )}
                            </div>
                        </div>

                        {location.mapUrl && (
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Find Us</h3>
                                <a 
                                    href={location.mapUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-blue-600 transition-all"
                                >
                                    Google Maps
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        )}

                        <div className="pt-6 border-t border-slate-100">
                            <Link 
                                href="/contact"
                                className="block w-full py-3.5 px-6 bg-blue-600 text-white text-center text-sm font-bold rounded-lg hover:bg-blue-700 transition-all"
                            >
                                Send Inquiry
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
