"use server";

import { revalidatePath } from "next/cache";
import dbConnect from "@/db/db";
import User from "@/db/users";
import { hasPermission } from "@/utils/auth";

export async function getUsers() {
    try {
        if (!(await hasPermission('users'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        const users = await User.find({}).sort({ createdAt: -1 }).lean();
        return JSON.parse(JSON.stringify(users));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function createUser(data: any) {
    try {
        if (!(await hasPermission('users'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        // Password hashing is handled by the User model's pre-save hook
        const user = await User.create(data);
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateUser(id: string, data: any) {
    try {
        if (!(await hasPermission('users'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();

        const user = await User.findById(id);
        if (!user) throw new Error("User not found");

        // Update fields
        user.name = data.name ?? user.name;
        user.email = data.email ?? user.email;
        user.role = data.role ?? user.role;
        user.status = data.status ?? user.status;
        user.permissions = data.permissions ?? user.permissions;

        // If password is provided, set it (hook will hash it)
        if (data.password && data.password.trim() !== "") {
            user.password = data.password;
        }

        await user.save();

        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(user));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteUser(id: string) {
    try {
        if (!(await hasPermission('users'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        await User.findByIdAndDelete(id);
        revalidatePath('/dashboard', 'layout');
        return { success: true };
    } catch (error: any) {
        throw new Error(error.message);
    }
}
