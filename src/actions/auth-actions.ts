"use server";

import dbConnect from "@/db/db";
import User from "@/db/users";
import { cookies, headers } from "next/headers";
import { encrypt } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function login(formData: any) {
    try {
        await dbConnect();
        const { email, password } = formData;

        if (!email || !password) {
            return { error: "Email and password are required" };
        }

        const normalizedEmail = email.trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail }).select("+password");

        if (!user) {
            return { error: "Invalid credentials" };
        }

        const isMatch = await bcrypt.compare(password, user.password || "");
        if (!isMatch) {
            return { error: "Invalid credentials" };
        }

        if (user.status !== "active") {
            return { error: "Account is inactive" };
        }

        const userData = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: Array.from(user.permissions || [])
        };

        const session = await encrypt(JSON.parse(JSON.stringify(userData)));

        const cookieStore = await cookies();
        const headerList = await headers();
        const protocol = headerList.get("x-forwarded-proto") || "http";

        cookieStore.set({
            name: "session",
            value: session,
            httpOnly: true,
            secure: protocol === "https",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        return { success: true, user: userData };
    } catch (error: any) {
        console.error("Login error:", error);
        return { error: error.message };
    }
}

export async function checkHasUsers() {
    try {
        await dbConnect();
        const count = await User.countDocuments();
        return { hasUsers: count > 0 };
    } catch (error: any) {
        console.error("Check users error:", error);
        return { hasUsers: true }; // Default to true on error for safety
    }
}

export async function seedFirstAdmin(formData: any) {
    try {
        await dbConnect();
        const count = await User.countDocuments();
        if (count > 0) {
            return { error: "Users already exist. Seeding is disabled." };
        }

        const { email, password, name } = formData;

        if (!email || !password) {
            return { error: "Email and password are required for seeding." };
        }

        const admin = await User.create({
            name: name || "Default Admin",
            email: email.trim().toLowerCase(),
            password: password,
            role: "admin",
            status: "active",
            permissions: ["cms", "teachers", "courses", "notices", "blogs", "media", "contacts", "users", "settings"]
        });

        return { success: true, message: `First admin created successfully: ${admin.email}` };
    } catch (error: any) {
        console.error("Seed error:", error);
        return { error: error.message };
    }
}

export async function seedUserAnytime(formData: any) {
    try {
        await dbConnect();
        const { email, password, name, role } = formData;

        if (!email || !password) {
            return { error: "Email and password are required." };
        }

        const user = await User.create({
            name: name || "Default User",
            email: email.trim().toLowerCase(),
            password: password,
            role: role || "admin",
            status: "active",
            permissions: ["cms", "teachers", "courses", "notices", "blogs", "media", "contacts", "users", "settings"]
        });

        return { success: true, message: `User created successfully: ${user.email}` };
    } catch (error: any) {
        console.error("Seed anytime error:", error);
        return { error: error.message };
    }
}

export async function logout() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete("session");
        return { success: true };
    } catch (error: any) {
        return { error: error.message };
    }
}
