"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { deleteLocation } from "@/actions/locations";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    MapPin,
    Phone,
    CheckCircle2,
    Clock,
    Loader2,
    ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ILocation } from "@/db/locations";

interface ILocationsListProps {
    locations: ILocation[];
}

export default function LocationsList({ locations: initialLocations }: ILocationsListProps) {
    const router = useRouter();
    const [locations, setLocations] = useState(initialLocations);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        setIsDeleting(id);
        try {
            await deleteLocation(id);
            setLocations(prev => prev.filter(l => (l as any)._id !== id));
            toast.success("Branch deleted");
            router.refresh();
        } catch (error: any) {
            toast.error("Failed to delete branch");
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="space-y-10">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-10 bg-blue-600 rounded-full" />
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Branch Network</h1>
                    </div>
                    <p className="text-slate-500 font-medium text-lg max-w-xl">
                        Manage your academy's physical presence and operational branches across all territories.
                    </p>
                </div>

                <Link
                    href="/dashboard/locations/new"
                    className="inline-flex items-center gap-3 px-8 py-5 bg-slate-900 text-white rounded-[24px] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 group active:scale-95"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span>Establish New Branch</span>
                </Link>
            </div>

            {/* Stats & Search */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-3 bg-white rounded-[32px] border border-slate-200/60 p-8 shadow-sm flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100/50">
                        <MapPin className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-900 tracking-tight">{locations.length}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Units</div>
                    </div>
                </div>

                <div className="lg:col-span-9 relative group">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter by branch name, city or specific address..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-20 pr-8 py-8 bg-white border border-slate-200/60 rounded-[32px] outline-none focus:ring-8 focus:ring-blue-500/5 focus:border-blue-500/50 transition-all font-bold text-lg shadow-sm placeholder:text-slate-300"
                    />
                </div>
            </div>

            {/* Locations Grid */}
            {filteredLocations.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredLocations.map((location) => {
                        const id = (location as any)._id;
                        return (
                            <div
                                key={id}
                                className="group bg-white rounded-[40px] border border-slate-200/60 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 overflow-hidden flex flex-col p-5"
                            >
                                {/* Thumbnail */}
                                <div className="relative aspect-[16/10] rounded-[30px] overflow-hidden mb-8 bg-slate-50 border border-slate-100">
                                    {location.image ? (
                                        <Image
                                            src={location.image}
                                            alt={location.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-200">
                                            <MapPin className="w-16 h-16 opacity-10" />
                                        </div>
                                    )}
                                    <div className="absolute top-5 left-5 flex gap-2">
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md border ${location.status === 'published'
                                                ? 'bg-emerald-500/90 text-white border-white/20'
                                                : 'bg-amber-500/90 text-white border-white/20'
                                            }`}>
                                            {location.status === 'published' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                            {location.status}
                                        </div>
                                        {location.isMainBranch && (
                                            <div className="px-4 py-1.5 bg-blue-600/90 text-white border border-white/20 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                                                HQ
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Info */}
                                <div className="space-y-6 px-3 flex-grow">
                                    <div className="space-y-1">
                                        <h3 className="text-2xl font-black text-slate-900 line-clamp-1 tracking-tight">{location.name}</h3>
                                        <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                                            <ArrowUpRight className="w-3 h-3" />
                                            {location.slug}
                                        </p>
                                    </div>

                                    <div className="space-y-3 pt-2">
                                        <div className="flex items-start gap-3 text-slate-500">
                                            <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-blue-500/50" />
                                            <span className="text-sm font-bold line-clamp-2 leading-relaxed">{location.address}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-slate-500">
                                            <Phone className="w-5 h-5 shrink-0 text-blue-500/50" />
                                            <span className="text-sm font-bold">{location.phone}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="mt-10 flex items-center gap-3">
                                    <Link
                                        href={`/dashboard/locations/${id}`}
                                        className="flex-1 flex items-center justify-center gap-3 py-4 bg-slate-50 text-slate-900 rounded-[20px] font-black hover:bg-slate-900 hover:text-white transition-all border border-slate-100 group/edit"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </Link>
                                    <Link
                                        href={`/locations/${location.slug}`}
                                        target="_blank"
                                        className="w-14 h-14 flex items-center justify-center bg-blue-50 text-blue-600 rounded-[20px] hover:bg-blue-600 hover:text-white transition-all border border-blue-100/50"
                                    >
                                        <Eye className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(id)}
                                        disabled={isDeleting === id}
                                        className="w-14 h-14 flex items-center justify-center bg-red-50 text-red-500 rounded-[20px] hover:bg-red-500 hover:text-white transition-all border border-red-100/50 disabled:opacity-50"
                                    >
                                        {isDeleting === id ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-white rounded-[60px] border-2 border-dashed border-slate-100 p-24 text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-slate-100">
                        <Search className="w-10 h-10 text-slate-200" />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">No Network Units</h3>
                    <p className="text-slate-500 font-medium text-lg max-w-sm mx-auto">
                        We couldn't locate any branches matching your current search parameters.
                    </p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="text-blue-600 font-black mt-6 hover:underline"
                    >
                        Clear filters and show all
                    </button>
                </div>
            )}
        </div>
    );
}
