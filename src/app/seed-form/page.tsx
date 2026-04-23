"use client";

import { seedAdmissionForm } from "@/actions/seed-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function SeedFormPage() {
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            const result = await seedAdmissionForm();
            if (result.success) {
                toast.success(result.message || "Form seeded successfully");
            } else {
                toast.error(result.error || "Failed to seed form");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
            <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-xl shadow-slate-200/50 text-center border border-slate-100">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Seed Dummy Form</h1>
                <p className="text-slate-500 mb-8">Click the button below to populate the database with a standard admission form for testing.</p>
                <button
                    onClick={handleSeed}
                    disabled={isSeeding}
                    className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                    {isSeeding ? "Seeding..." : "Seed Form"}
                    {!isSeeding && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                        </svg>
                    )}
                </button>
                <div className="mt-8 pt-8 border-t border-slate-100">
                    <a href="/forms/standard-admission" className="text-sm font-medium text-slate-400 hover:text-blue-600 transition-colors">Go to Standard Admission Form</a>
                </div>
            </div>
        </div>
    );
}
