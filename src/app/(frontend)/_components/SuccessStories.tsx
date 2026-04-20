"use client";

import React, { useState, useEffect, useRef } from 'react';
import { getStudentRanks } from '@/actions/student-ranks';
import { getStudentRankCategories } from '@/actions/student-rank-categories';
import Image from 'next/image';

const CategorySlider = ({ category }: { category: any }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const itemWidth = container.offsetWidth;
            container.scrollTo({
                left: itemWidth * index,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    return (
        <div className="space-y-12">
            <div className="text-center">
                <h3 className="inline-block text-2xl md:text-3xl font-extrabold text-[#004a7c] border-b-[3px] border-red-500 pb-1">
                    {category.name}
                </h3>
            </div>

            <div className="relative group/category">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-hidden snap-x snap-mandatory scroll-smooth no-scrollbar"
                >
                    {category.students.map((student: any, stuIdx: number) => {
                        const isEven = stuIdx % 2 === 1;
                        return (
                            <div
                                key={student._id}
                                className="w-full flex-shrink-0 snap-center px-4"
                            >
                                <div
                                    className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 lg:gap-16 max-w-6xl mx-auto`}
                                >
                                    <div className="flex-1 space-y-4 text-center md:text-left">
                                        <div className="space-y-1">
                                            <h4 className="text-3xl md:text-4xl font-extrabold text-[#002b4d]">
                                                {student.name}
                                            </h4>
                                            <p className="text-xl font-bold text-red-600">
                                                {student.rank}
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="text-slate-500 text-base leading-snug font-medium">
                                                {student.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex-1 w-full max-w-[450px]">
                                        <div className="relative aspect-square overflow-hidden rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] bg-[#c7e9f1] border-[10px] border-white ring-1 ring-slate-100">
                                            {student.image ? (
                                                <Image
                                                    src={student.image}
                                                    alt={student.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 500px"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <span className="material-symbols-outlined text-9xl text-white/50">person</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {category.students.length > 1 && (
                    <>
                        <button
                            onClick={() => scrollTo((activeIndex - 1 + category.students.length) % category.students.length)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover/category:opacity-100 hidden md:flex items-center justify-center border border-slate-100"
                        >
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button
                            onClick={() => scrollTo((activeIndex + 1) % category.students.length)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all opacity-0 group-hover/category:opacity-100 hidden md:flex items-center justify-center border border-slate-100"
                        >
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </>
                )}

                <div className="flex justify-center gap-2 mt-8 mb-4">
                    {category.students.map((_: any, dotIdx: number) => (
                        <button
                            key={dotIdx}
                            onClick={() => scrollTo(dotIdx)}
                            className={`h-1 rounded-full transition-all duration-300 ${activeIndex === dotIdx ? 'w-12 bg-red-600 shadow-[0_2px_8px_rgba(220,38,38,0.3)]' : 'w-8 bg-slate-200 hover:bg-slate-300'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export const SuccessStories = () => {
    const [displayData, setDisplayData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [ranks, categories] = await Promise.all([
                    getStudentRanks({ status: 'active' }, { order: 1 }),
                    getStudentRankCategories({ status: 'active' }, { order: 1 })
                ]);

                const categorizedRanks = categories.map((cat: any) => ({
                    ...cat,
                    students: ranks.filter((r: any) =>
                        (typeof r.categoryId === 'string' ? r.categoryId === cat._id : r.categoryId?._id === cat._id)
                    )
                })).filter((cat: any) => cat.students.length > 0);

                if (categorizedRanks.length > 0) {
                    setDisplayData(categorizedRanks);
                } else {
                    setDisplayData([
                        {
                            _id: 'default-cat-1',
                            name: 'All Nepal Rank Holder',
                            students: [
                                {
                                    _id: 'default-stu-1',
                                    name: "Ujjwal Karki",
                                    rank: "All Nepal Rank 1 - SBR",
                                    description: "ACCA (the Association of Chartered Certified Accountants) is the global body for professional accountants, offering the Chartered Certified Accountant qualification.",
                                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbEyXvH6EhEk6ndH3evP92ppbUNkI7UTsbMe9tc13F8zcoRkYtLobXW-1egTGQ80h4QvQeaHafv_C0SzAx06Ke17LjLG8g6XJQtJ_-qdde1FKJSQ41_eSzlFI-7-7uCjRywMC2YHc35gFm4NbzqLSNHZgZivD6DTl0nKJbwsp3lwnzqeU9DctQ7rp0doOtn5OSgr0ZzyV26IIbrGvCLedGsss2khKcu1qhzue78G5LfeR7HHgScpnIgmB9A0xbppz_YFGZVWKdZKs"
                                }
                            ]
                        },
                        {
                            _id: 'default-cat-2',
                            name: 'World Rank Holders',
                            students: [
                                {
                                    _id: 'default-stu-2',
                                    name: "Bijay Chaurasia",
                                    rank: "All World Rank 1 - SBR",
                                    description: "ACCA (the Association of Chartered Certified Accountants) is the global body for professional accountants, offering the Chartered Certified Accountant qualification.",
                                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_vetSNCcrhFOPJRBW-Ffgpfmko8PJVNqVPGaT-KkyPYKWDGoSxUcd_HvQdeQMB1CGcHK9NzpQYtDDGih9Sw33yul-J5zgeMcZpqWq8lBQeMHyHNxlKzQH3yNbhn7QJX5pBAkpejWjrKlz2SFP1cjFZUbKqugMupOsB0Rb3DWpkZr7j7MLlVLDjooFcGCTGNBU13XYh52Tjhchdzf4ihiY13q6Dt_O5V3EHMwFhNlGUE8mFE9XZSbMy2pVqEGv_F9Q2bJgfdltF4db"
                                }
                            ]
                        }
                    ]);
                }
            } catch (error) {
                console.error("Error fetching success stories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) return null;

    return (
        <section className="bg-white py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#002b4d] mb-4">
                        Our Success Stories
                    </h2>
                    <div className="h-1 w-20 bg-[#002b4d] mx-auto rounded-full mb-8"></div>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                        Meet our high-achievers who have set benchmarks globally and across Nepal.
                    </p>
                </div>

                <div className="space-y-24 md:space-y-32">
                    {displayData.map((category: any) => (
                        <CategorySlider key={category._id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export const FeaturedTestimonial = () => {
    return (
        <section className="overflow-hidden bg-white py-24">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
                <div className="relative rounded-[3rem] border border-slate-100 bg-slate-50/50 p-12 shadow-2xl md:p-20">
                    <span className="material-symbols-outlined absolute -top-12 -left-4 select-none text-9xl text-[#004a7c]/10">format_quote</span>
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="md:w-1/3">
                            <img className="h-48 w-48 rounded-3xl object-cover shadow-lg ring-8 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmbEyXvH6EhEk6ndH3evP92ppbUNkI7UTsbMe9tc13F8zcoRkYtLobXW-1egTGQ80h4QvQeaHafv_C0SzAx06Ke17LjLG8g6XJQtJ_-qdde1FKJSQ41_eSzlFI-7-7uCjRywMC2YHc35gFm4NbzqLSNHZgZivD6DTl0nKJbwsp3lwnzqeU9DctQ7rp0doOtn5OSgr0ZzyV26IIbrGvCLedGsss2khKcu1qhzue78G5LfeR7HHgScpnIgmB9A0xbppz_YFGZVWKdZKs" alt="Pukar Thapa" />
                        </div>
                        <div className="md:w-2/3">
                            <p className="mb-8 text-xl font-medium italic leading-snug text-slate-800 md:text-2xl">
                                &quot;The personalized mentorship at Seekshya Academy was instrumental in my success. The tutors don't just teach for exams; they prepare you for the professional world.&quot;
                            </p>
                            <p className="font-headline text-lg font-bold text-[#004a7c] md:text-xl">Mr. Pukar Thapa</p>
                            <p className="font-semibold text-red-600">ACCA Affiliate | Placed at Big Four Audit Firm</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
