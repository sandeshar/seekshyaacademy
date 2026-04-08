"use server";
import { cookies } from "next/headers";
import { decrypt } from "./jwt";

export interface UserSession {
    id: string;
    email: string;
    name: string;
    role: "admin" | "staff" | "editor";
    permissions: string[];
}

export async function getSession(): Promise<UserSession | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return await decrypt(session) as UserSession | null;
}

export async function hasPermission(permission: string) {
    const session = await getSession();
    if (!session) return false;
    if (session.role === "admin") return true;
    return session.permissions.includes(permission);
}

export async function isAdmin() {
    const session = await getSession();
    return session?.role === "admin";
}

export async function isEditor() {
    const session = await getSession();
    return session?.role === "admin" || session?.role === "editor";
}

export async function isStaff() {
    const session = await getSession();
    return !!session;
}
