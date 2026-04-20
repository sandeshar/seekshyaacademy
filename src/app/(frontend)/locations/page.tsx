import { getPublishedLocations } from "@/actions/locations";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, ArrowRight } from "lucide-react";

export const metadata = {
    title: "Our Locations | Seekshya Academy",
    description: "Explore our network of educational branches across major hubs.",
};

export default async function LocationsPage() {
    const locations = await getPublishedLocations();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <header className="relative pt-32 pb-24 px-8 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-gradient-to-br from-blue-600/10 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 transform translate-x-1/4">
                        <img 
                            alt="" 
                            className="w-full h-full object-cover" 
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV5x8x0BykLxsqmOOxwnHOv1Fz5cUcosfTAdr5ea53WD47Gmb-ItzfsJyLakVOGv6wl69ggEMZdEqCjiN1DX6FR5Pdaj1OVS5JZAl-W1msrmA3w_-VlOI0p1gPfycSwOPIoe2YOGgV_JSd3tMjSShliuqPMNfWh4v2G4_YatdEDk2Xz-zAGQ7-B_Fc3y8P6VG1x5V0xWmRDheIAIdtHBj033nCXvZHUI7MFZY70VfEPtSzgZ54MScd_PT26SdqZNxNxQYJ6223S-hd"
                        />
                    </div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="max-w-2xl">
                        <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-slate-900 text-white text-xs font-bold tracking-widest uppercase">
                            Global Reach
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-8 leading-tight tracking-tighter">
                            Find Your Campus
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-lg font-medium">
                            With centers strategically located across major hubs, we bring world-class professional finance education closer to you.
                        </p>
                    </div>
                </div>
            </header>

            {/* Locations Grid */}
            <main className="max-w-7xl mx-auto px-8 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {locations.map((location) => (
                        <div key={(location as any)._id} className="bg-slate-50 rounded-xl overflow-hidden group hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                                {location.image ? (
                                    <Image 
                                        src={location.image}
                                        alt={location.name}
                                        fill
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                                        <MapPin className="w-12 h-12 text-slate-400" />
                                    </div>
                                )}
                                {location.isMainBranch && (
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full shadow-lg">Head Office</span>
                                    </div>
                                )}
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">{location.name}</h3>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                                        <p className="text-slate-600 text-sm font-medium">{location.address}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                                        <p className="text-slate-600 text-sm font-medium">{location.phone}</p>
                                    </div>
                                </div>
                                <Link 
                                    href={`/locations/${location.slug}`}
                                    className="w-full py-4 bg-slate-200 text-slate-900 font-bold rounded-full hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
                                >
                                    View Branch Details
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {locations.length === 0 && (
                    <div className="text-center py-24">
                        <h3 className="text-2xl font-bold text-slate-900">No branches found.</h3>
                        <p className="text-slate-500 mt-2">Check back later as we expand our network.</p>
                    </div>
                )}
            </main>

            {/* Support Section */}
            <section className="bg-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <div className="relative inline-block">
                            <img 
                                alt="" 
                                className="rounded-xl shadow-2xl relative z-10" 
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBB6p321UM4NKXtnGbD6Lqc_-9XOoYz2Rc9E4DyGbRsNrviGmlyihUzcFgOS_vVn7OwBAwvDXxchBCrzpIj_9vh7Cs6zhHpQzfn-UKgHi1QFBylssJtEvXrLb963JuyVnoQkHkjKprFurEpLulKY-A2LHcf27lmJhsizLf6BLSjz3C94ggiUInZ9Or1aRDd9xampDUknQWm5LDhUhUT5wKBHt0WOcliq3C9le_6DejnyZSRIynlaCS9ktAsx8E7Kl--32fxOdXOXoIJ"
                            />
                            <div className="absolute -bottom-6 -right-6 w-full h-full border-4 border-blue-600 rounded-xl z-0"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 text-white">
                        <h2 className="text-4xl font-extrabold mb-6">Need assistance choosing the right center?</h2>
                        <p className="text-lg opacity-90 mb-10 leading-relaxed font-body">
                            Our career counselors are available across all branches to help you understand the curriculum, fee structures, and learning modes best suited for your goals.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                                Schedule a Visit
                            </Link>
                            <Link href="/contact" className="bg-transparent border-2 border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
