"use client";

import { useState } from "react";
import { handleSeedLocationsAction } from "./_components/SeedButton";
import { Loader2, Database, CheckCircle2, AlertCircle } from "lucide-react";

export default function SeedLocationsPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const handleSeed = async () => {
        setLoading(true);
        setResult(null);
        try {
            const data = await handleSeedLocationsAction();
            setResult(data);
        } catch (error: any) {
            setResult({ success: false, message: error.message || "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-10 text-center border border-slate-200">
                <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-600">
                    <Database className="w-10 h-10" />
                </div>

                <h1 className="text-3xl font-black text-slate-800 mb-4">Seed Locations</h1>
                <p className="text-slate-500 font-medium mb-10">
                    This utility will populate your database with 3 sample branches for testing. (It only works if locations are empty).
                </p>

                {result && (
                    <div className={`mb-8 p-4 rounded-2xl flex items-start gap-3 text-left ${result.success ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-amber-50 text-amber-700 border border-amber-100"
                        }`}>
                        {result.success ? <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" /> : <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />}
                        <p className="text-sm font-bold">{result.message}</p>
                    </div>
                )}

                <button
                    onClick={handleSeed}
                    disabled={loading}
                    className="w-full py-5 bg-slate-900 text-white rounded-[24px] font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden group"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                            <span>Seeding Data...</span>
                        </>
                    ) : (
                        <>
                            <div className="p-1 bg-white/10 rounded-lg group-hover:scale-110 transition-transform">
                                <Database className="w-4 h-4" />
                            </div>
                            <span>Seed 3 Demo Locations</span>
                        </>
                    )}
                </button>

                <div className="mt-8">
                    <a
                        href="/dashboard/locations"
                        className="text-sm font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
                    >
                        Go to Dashboard →
                    </a>
                </div>
            </div>
        </div>
    );
}
