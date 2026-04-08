export function apiUrl(path: string) {
    // Ensure path starts with '/'
    const pathname = path.startsWith('/') ? path : `/${path}`;
    const base = process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`;
    return `${base}${pathname}`;
}

export default apiUrl;
