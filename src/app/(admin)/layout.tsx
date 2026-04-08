import { Suspense } from "react";
import { getSession } from "@/utils/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";
import { getSettings } from "@/actions/settings";

async function AdminContent({ children }: { children: React.ReactNode }) {
    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const settings = await getSettings();

    return (
        <AdminLayoutClient user={session} settings={settings}>
            {children}
        </AdminLayoutClient>
    );
}

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        }>
            <AdminContent>{children}</AdminContent>
        </Suspense>
    );
}

