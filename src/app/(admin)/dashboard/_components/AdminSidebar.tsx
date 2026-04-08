"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { logout } from "@/actions/auth-actions";
import { UserSession } from "@/utils/auth";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
  { name: "Media Manager", href: "/dashboard/media", icon: "photo_library", permission: "media" },
  { name: "Contact Inquiries", href: "/dashboard/contacts", icon: "mail", permission: "contacts" },
  {
    name: "Courses",
    icon: "school",
    permission: "courses",
    subItems: [
      { name: "Categories", href: "/dashboard/courses/categories" },
      { name: "Page CMS", href: "/dashboard/courses/cms" },
    ],
  },
  {
    name: "Teachers",
    icon: "groups",
    permission: "teachers",
    subItems: [
      { name: "All Teachers", href: "/dashboard/teachers" },
      { name: "Teacher Categories", href: "/dashboard/teachers/categories" },
    ],
  },
  {
    name: "Notices",
    icon: "campaign",
    permission: "notices",
    subItems: [
      { name: "All Notices", href: "/dashboard/notices" },
      { name: "Notice Categories", href: "/dashboard/notices/categories" },
      { name: "Notices Page CMS", href: "/dashboard/notices-page" },
    ],
  },
  {
    name: "Blogs",
    icon: "book",
    permission: "blogs",
    subItems: [
      { name: "All Articles", href: "/dashboard/blogs" },
      { name: "Featured Articles", href: "/dashboard/blogs/featured" },
      { name: "Categories", href: "/dashboard/blogs/categories" },
      { name: "Blogs Page CMS", href: "/dashboard/blogs-page" },
    ],
  },
  {
    name: "Site Pages",
    icon: "pages",
    permission: "cms",
    subItems: [
      { name: "All Pages", href: "/dashboard/pages" },
      { name: "Create New Page", href: "/dashboard/pages/new" },
    ],
  },
  {
    name: "CMS",
    icon: "edit_note",
    permission: "cms",
    subItems: [
      { name: "Homepage CMS", href: "/dashboard/homepage" },
      { name: "Faculty Page Settings", href: "/dashboard/faculty-page" },
      { name: "About Page Settings", href: "/dashboard/about-page" },
      { name: "Contact Page CMS", href: "/dashboard/contact-page" },
      { name: "Navbar Settings", href: "/dashboard/navbar" },
      { name: "Footer Settings", href: "/dashboard/footer" },
    ],
  },
  { name: "Users", href: "/dashboard/users", icon: "person", permission: "users" },
  { name: "Settings", href: "/dashboard/settings", icon: "settings", permission: "settings" },
];

export default function AdminSidebar({ user, isMobileOpen, setIsMobileOpen, settings }: { user: UserSession, isMobileOpen?: boolean, setIsMobileOpen?: (open: boolean) => void, settings: any }) {
  const pathname = usePathname();
  const router = useRouter();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  }, [pathname, setIsMobileOpen]);

  // Filter menu items based on user role and granular permissions
  const filteredMenuItems = menuItems.filter(item => {
    if (user.role === 'admin') return true;
    if (!item.permission) return true;
    return user.permissions?.includes(item.permission);
  });

  const [openMenus, setOpenMenus] = useState<string[]>(() => {
    // Determine which menus should be open based on current pathname
    const activeMenuNames = filteredMenuItems
      .filter(item => item.subItems?.some(sub => pathname.startsWith(sub.href)))
      .map(item => item.name);
    return activeMenuNames;
  });

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to logout?")) {
      setLoggingOut(true);
      try {
        const data = await logout();
        if (data.success) {
          toast.success("Logged out successfully");
          router.push("/login"); // Redirect to login page
        } else {
          toast.error(data.error || "Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Network error during logout");
      } finally {
        setLoggingOut(false);
      }
    }
  };

  const toggleMenu = (name: string) => {
    setOpenMenus((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileOpen?.(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 text-white flex flex-col border-r border-slate-800 z-50 transition-transform duration-300 lg:translate-x-0 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/dashboard" className="flex-1 flex flex-col items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all group">
            <Image
              src={settings?.logos?.main || "/logos.png"}
              alt={settings?.siteName || "Seekshya Academy"}
              width={150}
              height={80}
              className="h-10 w-auto object-contain mb-2"
            />
          </Link>
          <button
            onClick={() => setIsMobileOpen?.(false)}
            className="lg:hidden ml-4 text-slate-400 hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
          {filteredMenuItems.map((item) => {
            if (item.subItems) {
              const isOpen = openMenus.includes(item.name);
              const hasActiveSubItem = item.subItems.some((sub) => pathname === sub.href);

              return (
                <div key={item.name} className="space-y-1">
                  <button
                    onClick={() => toggleMenu(item.name)}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg transition-colors ${hasActiveSubItem
                      ? "text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span>{item.name}</span>
                    </div>
                    <span className={`material-symbols-outlined transition-transform ${isOpen ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="ml-9 space-y-1">
                      {item.subItems.map((sub) => {
                        const isSubActive = pathname === sub.href;
                        return (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className={`block px-3 py-2 rounded-lg text-sm transition-colors ${isSubActive
                              ? "bg-blue-600 text-white"
                              : "text-slate-500 hover:text-white hover:bg-slate-800"
                              }`}
                          >
                            {sub.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
              >
                <span className="material-symbols-outlined">{(item as any).icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors text-sm"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>View Site</span>
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors text-sm disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <span>{loggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside >
    </>
  );
}


