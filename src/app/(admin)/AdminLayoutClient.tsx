"use client";

import { useState } from "react";
import AdminSidebar from "./dashboard/_components/AdminSidebar";
import { UserSession } from "@/utils/auth";

export default function AdminLayoutClient({
    children,
    user,
    settings
}: {
    children: React.ReactNode;
    user: UserSession;
    settings: any;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <AdminSidebar
                user={user}
                isMobileOpen={isSidebarOpen}
                setIsMobileOpen={setIsSidebarOpen}
                settings={settings}
            />

            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="lg:hidden bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-30">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-gray-600 hover:text-gray-900"
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="ml-4 font-bold text-primary">Admin Panel</div>
                </header>

                <main className="flex-1 p-4 md:p-8 lg:ml-64">
                    {children}
                </main>
            </div>
        </div>
    );
}
