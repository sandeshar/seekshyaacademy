import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./utils/jwt";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Only protect /dashboard routes
    if (pathname.startsWith('/dashboard')) {
        const session = request.cookies.get('session')?.value;

        if (!session) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const payload = await decrypt(session);
        if (!payload) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const role = payload.role;
        const permissions = (payload.permissions as string[]) || [];

        // Admin has all access
        if (role === 'admin') {
            return NextResponse.next();
        }

        // Check granular permissions
        if (pathname.startsWith('/dashboard/users') && !permissions.includes('users')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if ((pathname.startsWith('/dashboard/settings') || pathname.startsWith('/dashboard/site-settings')) && !permissions.includes('settings')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (pathname.startsWith('/dashboard/media') && !permissions.includes('media')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (pathname.startsWith('/dashboard/contacts') && !permissions.includes('contacts')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (pathname.startsWith('/dashboard/teachers') && !permissions.includes('teachers')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        if (pathname.startsWith('/dashboard/notices') || pathname.startsWith('/dashboard/notices-page')) {
            if (!permissions.includes('notices')) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        if (pathname.startsWith('/dashboard/blogs') || pathname.startsWith('/dashboard/blogs-page')) {
            if (!permissions.includes('blogs')) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        if (pathname.startsWith('/dashboard/courses') || pathname.startsWith('/dashboard/courses-page')) {
            if (!permissions.includes('courses')) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }

        // CMS includes various sub-pages
        const cmsPaths = [
            '/dashboard/homepage',
            '/dashboard/faculty-page',
            '/dashboard/about-page',
            '/dashboard/contact-page',
            '/dashboard/navbar',
            '/dashboard/footer',
        ];

        if (cmsPaths.some(path => pathname.startsWith(path)) && !permissions.includes('cms')) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // Redirect to dashboard if logged in and trying to access login page
    if (pathname === '/login') {
        const session = request.cookies.get('session')?.value;
        if (session) {
            const payload = await decrypt(session);
            if (payload) {
                return NextResponse.redirect(new URL('/dashboard', request.url));
            }
        }
    }

    return NextResponse.next();
}
