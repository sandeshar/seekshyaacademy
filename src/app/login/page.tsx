"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login, checkHasUsers, seedFirstAdmin } from "@/actions/auth-actions";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasUsers, setHasUsers] = useState<boolean | null>(null);
    const [isSeeding, setIsSeeding] = useState(false);
    const [seedData, setSeedData] = useState({
        name: "Admin",
        email: "admin@seekshyaacademy.com",
        password: "Admin@123"
    });
    const router = useRouter();

    React.useEffect(() => {
        const check = async () => {
            const res = await checkHasUsers();
            setHasUsers(res.hasUsers);
        };
        check();
    }, []);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            const res = await seedFirstAdmin(seedData);
            if (res.success) {
                toast.success(res.message, { duration: 6000 });
                setHasUsers(true);
                setEmail(seedData.email);
                setPassword(seedData.password);
            } else {
                toast.error(res.error || "Failed to seed");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsSeeding(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const data = await login({ email, password });

            if (data.success) {
                toast.success("Login successful!");
                router.push("/dashboard");
            } else {
                toast.error(data.error || "Login failed");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error("Login error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-accent-orange to-primary"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>

            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative z-10 transition-all hover:shadow-2xl">
                <div className="text-center">
                    {/* <Link href="/" className="inline-flex flex-col items-center gap-2 mb-6 group">
                        <Image
                            src="/logos.png"
                            alt="Seekshya Academy"
                            width={160}
                            height={80}
                            className="h-20 w-auto object-contain transition-transform group-hover:scale-105"
                            priority
                        />

                    </Link> */}
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-2 text-sm font-medium text-slate-500">
                        Please sign in to access your dashboard
                    </p>
                </div>

                {hasUsers === false && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center gap-2 text-amber-800 mb-2">
                            <span className="material-symbols-outlined text-xl">database</span>
                            <span className="font-semibold text-sm">Initial Setup</span>
                        </div>
                        <p className="text-xs text-amber-700 mb-4">
                            No users found. Create the first administrator account:
                        </p>
                        <div className="space-y-3 mb-4">
                            <input
                                type="text"
                                placeholder="Admin Name"
                                className="w-full px-3 py-2 text-xs border border-amber-200 rounded bg-white"
                                value={seedData.name}
                                onChange={(e) => setSeedData({ ...seedData, name: e.target.value })}
                            />
                            <input
                                type="email"
                                placeholder="Admin Email"
                                className="w-full px-3 py-2 text-xs border border-amber-200 rounded bg-white"
                                value={seedData.email}
                                onChange={(e) => setSeedData({ ...seedData, email: e.target.value })}
                            />
                            <input
                                type="password"
                                placeholder="Admin Password"
                                className="w-full px-3 py-2 text-xs border border-amber-200 rounded bg-white"
                                value={seedData.password}
                                onChange={(e) => setSeedData({ ...seedData, password: e.target.value })}
                            />
                        </div>
                        <button
                            onClick={handleSeed}
                            disabled={isSeeding}
                            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded shadow-sm transition-colors disabled:opacity-50"
                        >
                            {isSeeding ? "Initialising..." : "Confirm & Create Admin"}
                        </button>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-sm font-medium text-slate-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-xl">mail</span>
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                                    <span className="material-symbols-outlined text-xl">lock</span>
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all sm:text-sm"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="flex items-center gap-2">
                                    <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                "Sign in"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

