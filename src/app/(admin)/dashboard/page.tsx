"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDashboardStats } from "@/actions/dashboard";

interface DashboardStats {
  users: number;
  teachers: number;
  articles: number;
  notices: number;
  contacts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    users: 0,
    teachers: 0,
    articles: 0,
    notices: 0,
    contacts: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const statsData = await getDashboardStats();
      setStats(statsData);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const statCards = [
    { label: "Total Users", value: stats.users, icon: "person", color: "bg-blue-600", link: "/dashboard/users" },
    { label: "Faculty Members", value: stats.teachers, icon: "groups", color: "bg-purple-600", link: "/dashboard/teachers" },
    { label: "Published Articles", value: stats.articles, icon: "article", color: "bg-green-600", link: "/dashboard/blogs" },
    { label: "Active Notices", value: stats.notices, icon: "notifications", color: "bg-amber-600", link: "/dashboard/notices" },
    { label: "Contact Inquiries", value: stats.contacts, icon: "mail", color: "bg-rose-600", link: "/dashboard/contacts" },
  ];

  const quickActions = [
    { label: "New Article", icon: "add_circle", href: "/dashboard/blogs/new", color: "text-blue-600" },
    { label: "Add Faculty", icon: "person_add", href: "/dashboard/teachers/new", color: "text-purple-600" },
    { label: "Post Notice", icon: "campaign", href: "/dashboard/notices", color: "text-amber-600" },
    { label: "Site Settings", icon: "settings", href: "/dashboard/settings", color: "text-slate-600" },
  ];

  return (
    <div className="space-y-10 animate-fadeIn pb-10">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">System Overview</h1>
        <p className="text-gray-500 mt-1">Monitor your institution's digital presence and manage content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link
            href={stat.link}
            key={index}
            className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex items-center gap-5"
          >
            <div className={`${stat.color} p-4 rounded-xl text-white shadow-lg shadow-${stat.color.split('-')[1]}-200 group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-[28px]">{stat.icon}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-3xl font-black text-gray-900 mt-0.5">
                {isLoading ? "..." : stat.value.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Welcome & Status */}
          <div className="bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Welcome Back, Admin!</h2>
              <p className="text-blue-50 opacity-90 max-w-md">
                You have {stats.notices} active notices and {stats.articles} articles published. Everything seems to be running smoothly.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/dashboard/blogs/new"
                  className="bg-white text-blue-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
                >
                  Write New Post
                </Link>
                <Link
                  href="/"
                  target="_blank"
                  className="bg-blue-500/30 text-white border border-blue-400/30 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-500/40 transition-colors whitespace-nowrap"
                >
                  View Live Site
                </Link>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -right-10 -bottom-10 text-[200px] opacity-10 rotate-12">
              dashboard
            </span>
          </div>
        </div>

        {/* Sidebar area */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4 flex flex-col gap-2">
              {quickActions.map((action, i) => (
                <Link
                  key={i}
                  href={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <span className={`material-symbols-outlined ${action.color} text-[22px]`}>
                    {action.icon}
                  </span>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                    {action.label}
                  </span>
                  <span className="material-symbols-outlined ml-auto text-gray-300 text-[18px] group-hover:translate-x-1 transition-transform">
                    chevron_right
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


