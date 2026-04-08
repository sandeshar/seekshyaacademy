import React from 'react';
import Link from 'next/link';

interface CoursesProps {
    data: {
        title: string;
        subtitle: string;
        items: {
            level: string;
            slug?: string;
            type: string;
            description: string;
            features: string[];
            icon: string;
            popular: boolean;
        }[];
    };
}

const Courses = ({ data }: CoursesProps) => {
    const courses = data?.items || [];

    return (
        <div id="courses-section" className="w-full py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">{data?.subtitle}</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{data?.title}</h2>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {courses.map((course, index) => (
                        <div
                            key={index}
                            className={`relative flex flex-col w-full md:w-[calc(33.333%-1.5rem)] min-w-[300px] max-w-[400px] rounded-2xl border ${course.popular
                                ? 'border-2 border-primary/20 bg-primary/5 shadow-md transform md:-translate-y-4'
                                : 'border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow'
                                } p-8 overflow-hidden`}
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                <span className={`material-symbols-outlined text-8xl ${course.popular ? 'text-primary' : ''}`}>{course.icon}</span>
                            </div>
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-slate-900">{course.level}</h3>
                                <p className="text-primary font-medium mt-1">{course.type}</p>
                            </div>
                            <p className="text-slate-600 text-sm mb-8 grow">
                                {course.description}
                            </p>
                            <ul className="space-y-3 mb-8">
                                {course.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-center gap-3 text-sm text-slate-700">
                                        <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href={course.slug ? `/courses/${course.slug}` : "/courses"}
                                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all text-center ${course.popular
                                    ? 'bg-primary hover:bg-primary-dark text-white shadow-md shadow-primary/20'
                                    : 'border border-slate-200 hover:border-primary hover:text-primary hover:bg-primary/5 text-slate-900'
                                    }`}
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;

