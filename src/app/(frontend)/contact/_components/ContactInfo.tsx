import React from 'react';

interface ContactInfoProps {
    data: {
        title: string;
        description: string;
        address: {
            title: string;
            details: string;
        };
        phone: {
            title: string;
            numbers: string[];
        };
        email: {
            title: string;
            addresses: string[];
        };
        map: {
            title: string;
            iframeCode: string;
        };
    };
}

const ContactInfo = ({ data }: ContactInfoProps) => {
    return (
        <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Info Cards */}
            <div className="flex flex-col gap-6">
                <div>
                    <h2 className="text-slate-900 text-3xl font-bold leading-tight tracking-tight mb-4 font-display">
                        {data.title}
                    </h2>
                    <p className="text-slate-600 text-base font-normal leading-normal">
                        {data.description}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    {/* Address Card */}
                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-primary flex items-start pt-1">
                            <span className="material-symbols-outlined text-[28px]">location_on</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 text-base font-bold leading-tight">{data.address.title}</h3>
                            <p className="text-slate-600 text-sm font-normal leading-normal" dangerouslySetInnerHTML={{ __html: data.address.details }} />
                        </div>
                    </div>
                    {/* Phone Card */}
                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-primary flex items-start pt-1">
                            <span className="material-symbols-outlined text-[28px]">call</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 text-base font-bold leading-tight">{data.phone.title}</h3>
                            <p className="text-slate-600 text-sm font-normal leading-normal">
                                {data.phone.numbers.map((number, index) => (
                                    <span key={index}>
                                        {number}
                                        {index < data.phone.numbers.length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                    {/* Email Card */}
                    <div className="flex gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="text-primary flex items-start pt-1">
                            <span className="material-symbols-outlined text-[28px]">mail</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-slate-900 text-base font-bold leading-tight">{data.email.title}</h3>
                            <p className="text-slate-600 text-sm font-normal leading-normal">
                                {data.email.addresses.map((email, index) => (
                                    <span key={index}>
                                        {email}
                                        {index < data.email.addresses.length - 1 && <br />}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Map Section */}
            <div className="flex flex-col gap-4">
                <h3 className="text-slate-900 text-lg font-bold leading-tight">{data.map.title}</h3>
                <div className="w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-200">
                    {data.map.iframeCode ? (
                        <div dangerouslySetInnerHTML={{ __html: data.map.iframeCode }} />
                    ) : (
                        <div className="w-full h-70 flex items-center justify-center text-gray-500">
                            Map iframe not configured
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;

