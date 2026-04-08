import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <span className="material-symbols-outlined text-9xl text-primary/20">
                        error_outline
                    </span>
                </div>
                <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-slate-800 mb-4">Page Not Found</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed,
                    or is temporarily unavailable.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-md shadow-primary/20"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/courses"
                        className="px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-all shadow-sm"
                    >
                        Browse Courses
                    </Link>
                </div>
            </div>
        </div>
    );
}
