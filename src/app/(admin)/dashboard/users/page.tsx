"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { getUsers, createUser, updateUser, deleteUser } from "@/actions/users";

interface IUser {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "staff" | "editor";
    permissions: string[];
    status: "active" | "inactive";
    createdAt: string;
}

const ALL_PERMISSIONS = [
    { id: 'cms', label: 'CMS' },
    { id: 'teachers', label: 'Teachers' },
    { id: 'student-ranks', label: 'Student Ranks' },
    { id: 'courses', label: 'Courses' },
    { id: 'notices', label: 'Notices' },
    { id: 'blogs', label: 'Blogs' },
    { id: 'media', label: 'Media' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'users', label: 'Users' },
    { id: 'settings', label: 'Settings' },
];

export default function UserManagement() {
    const router = useRouter();
    const [users, setUsers] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState<IUser | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "staff" as "admin" | "staff" | "editor",
        permissions: [] as string[],
        status: "active" as "active" | "inactive"
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Create a copy of formData and remove empty password if editing
        const payload = { ...formData };
        if (editingUser && !payload.password) {
            delete (payload as any).password;
        }

        try {
            if (editingUser) {
                await updateUser(editingUser._id, payload);
                toast.success("User updated");
            } else {
                await createUser(payload);
                toast.success("User created");
            }

            setShowModal(false);
            setEditingUser(null);
            setFormData({ name: "", email: "", password: "", role: "staff", permissions: [], status: "active" });
            router.refresh();
            fetchUsers();
        } catch (error: any) {
            toast.error(error.message || "Failed to save user");
        }
    };

    const handleEdit = (user: IUser) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: "",
            role: user.role,
            permissions: user.permissions || [],
            status: user.status
        });
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?")) return;
        try {
            await deleteUser(id);
            toast.success("User deleted");
            router.refresh();
            fetchUsers();
        } catch (error) {
            toast.error("Failed to delete user");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">User Management</h1>
                    <p className="text-gray-500 mt-1">Manage administrative users and their permissions.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingUser(null);
                        setFormData({ name: "", email: "", password: "", role: "staff", permissions: [], status: "active" });
                        setShowModal(true);
                    }}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-[20px]">add</span>
                    Add New User
                </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden text-sm">
                <table className="w-full text-left font-medium">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 text-gray-600 uppercase tracking-wider">User</th>
                            <th className="px-6 py-4 text-gray-600 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-4 text-gray-600 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-gray-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading users...</td></tr>
                        ) : users.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No users found.</td></tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-900">
                                        <div className="flex flex-col">
                                            <span>{user.name}</span>
                                            <span className="text-xs text-gray-400 font-normal">{user.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="capitalize">{user.role}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${user.status === 'active'
                                            ? 'bg-green-50 text-green-700 border-green-100'
                                            : 'bg-red-50 text-red-700 border-red-100'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-1">
                                            <button onClick={() => handleEdit(user)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button onClick={() => handleDelete(user._id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-scaleUp">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">{editingUser ? "Edit User" : "Add New User"}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">
                                    {editingUser ? "New Password (leave blank to keep current)" : "Password"}
                                </label>
                                <input
                                    type="password"
                                    required={!editingUser}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="staff">Staff</option>
                                        <option value="editor">Editor</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full px-4 py-2.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            {formData.role !== 'admin' && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Permissions</label>
                                    <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                                        {ALL_PERMISSIONS.map(permission => (
                                            <label key={permission.id} className="flex items-center gap-2 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.includes(permission.id)}
                                                    onChange={(e) => {
                                                        const newPermissions = e.target.checked
                                                            ? [...formData.permissions, permission.id]
                                                            : formData.permissions.filter(p => p !== permission.id);
                                                        setFormData({ ...formData, permissions: newPermissions });
                                                    }}
                                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors uppercase font-bold">{permission.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all"
                                >
                                    {editingUser ? "Update User" : "Create User"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

