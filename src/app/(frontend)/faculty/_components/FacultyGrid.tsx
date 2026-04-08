import React from 'react';

const FacultyGrid = ({
    teachers = [],
    data
}: {
    teachers?: any[],
    data?: { title: string; description: string }
}) => {
    return (
        <section className="w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Headline */}
                <div className="mb-10 flex flex-col items-start justify-between gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            {data?.title || "Our Distinguished Faculty"}
                        </h2>
                        <p className="mt-2 text-slate-600">
                            {data?.description || "Mentors dedicated to your success in the Chartered Accountancy journey."}
                        </p>
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                        Showing {teachers.length} expert mentors
                    </div>
                </div>

                {/* Faculty Grid */}
                {teachers.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {teachers.map((member, index) => (
                            <div
                                key={index}
                                className="group relative flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="relative aspect-4/5 w-full overflow-hidden bg-slate-200">
                                    {member.image ? (
                                        <div
                                            className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                            style={{ backgroundImage: `url('${member.image}')` }}
                                        ></div>
                                    ) : (
                                        <div className="h-full w-full flex items-center justify-center bg-slate-100 italic text-slate-400">No Image</div>
                                    )}

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-primary/90 via-primary/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <div className="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
                                            <p className="text-sm font-medium leading-relaxed text-white">
                                                "{member.quote || 'Dedicated mentor at Seekshya Academy.'}"
                                            </p>
                                            {(member.badge || member.badgeIcon) && (
                                                <div className="mt-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-100">
                                                    {member.badgeIcon && (
                                                        <span className="material-symbols-outlined text-[16px]">{member.badgeIcon}</span>
                                                    )}
                                                    {member.badge}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-1 flex-col gap-1 p-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors">
                                            {member.name}
                                        </h3>
                                        <span className="material-symbols-outlined text-primary" title="Certified">workspace_premium</span>
                                    </div>
                                    <p className="text-sm font-semibold text-primary">{member.qualifications}</p>
                                    <p className="mt-1 text-sm text-slate-500">{member.subject}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="mb-4 rounded-full bg-slate-100 p-6 text-slate-400">
                            <span className="material-symbols-outlined text-5xl">person_off</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No teachers found</h3>
                        <p className="mt-2 text-slate-500 max-w-sm">
                            We couldn't find any faculty members matching your search or category filter. try adjusting your criteria.
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FacultyGrid;

