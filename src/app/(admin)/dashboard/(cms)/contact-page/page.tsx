"use client";

import ImageUploader from "../../_components/ImageUploader";
import CMSSection from "../../_components/CMSSection";
import CMSPage from "../../_components/CMSPage";

import { getContactPage, updateContactPage } from "@/actions/cms-actions";

const TABS = [
    { id: "hero", label: "Hero", icon: "contact_page" },
    { id: "contact-info", label: "Contact Info", icon: "info" },
    { id: "contact-form", label: "Contact Form", icon: "email" },
    { id: "seo", label: "SEO", icon: "search" },
];

export default function ContactPageCMS() {
    const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium";

    return (
        <CMSPage
            title="Contact Page CMS"
            description="Manage the content of your contact page."
            getAction={getContactPage}
            updateAction={(data) => {
                if (data.contactInfo) {
                    if (data.contactInfo.phone?.numbers) {
                        data.contactInfo.phone.numbers = data.contactInfo.phone.numbers.filter((n: string) => n.trim());
                    }
                    if (data.contactInfo.email?.addresses) {
                        data.contactInfo.email.addresses = data.contactInfo.email.addresses.filter((a: string) => a.trim());
                    }
                }
                return updateContactPage(data);
            }}
            tabs={TABS}
            renderTabContent={(activeTab: string, data: any, setData: (data: any) => void) => (
                <>
                    {activeTab === "hero" && (
                        <CMSSection
                            title="Hero Section"
                            isVisible={data.hero.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, hero: { ...data.hero, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Background Image</label>
                                    <ImageUploader
                                        value={data.hero.backgroundImage}
                                        onChange={(url) => setData({ ...data, hero: { ...data.hero, backgroundImage: url } })}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-bold text-gray-700 mb-2 flex justify-between">
                                        <span>Overlay Opacity</span>
                                        <span className="text-primary">{data.hero.overlayOpacity || 60}%</span>
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="5"
                                        value={data.hero.overlayOpacity || 60}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, overlayOpacity: parseInt(e.target.value) } })}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">
                                        <span>Bright</span>
                                        <span>Mild</span>
                                        <span>Dark</span>
                                    </div>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={data.hero.title}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Enter hero title"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Subtitle</label>
                                    <textarea
                                        value={data.hero.subtitle}
                                        onChange={(e) => setData({ ...data, hero: { ...data.hero, subtitle: e.target.value } })}
                                        className={inputClass + " resize-y"}
                                        rows={3}
                                        placeholder="Enter hero subtitle"
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "contact-info" && (
                        <CMSSection
                            title="Contact Information Section"
                            isVisible={data.contactInfo.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, contactInfo: { ...data.contactInfo, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={data.contactInfo.title}
                                        onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Contact Information"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Section Description</label>
                                    <textarea
                                        value={data.contactInfo.description}
                                        onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, description: e.target.value } })}
                                        className={inputClass + " resize-y"}
                                        rows={2}
                                        placeholder="Reach out to us through any of the following channels..."
                                    />
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold mb-4">Address Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Address Title</label>
                                            <input
                                                type="text"
                                                value={data.contactInfo.address.title}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, address: { ...data.contactInfo.address, title: e.target.value } } })}
                                                className={inputClass}
                                                placeholder="Visit Us"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Address Details</label>
                                            <textarea
                                                value={data.contactInfo.address.details}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, address: { ...data.contactInfo.address, details: e.target.value } } })}
                                                className={inputClass + " resize-y"}
                                                rows={2}
                                                placeholder="Putalisadak, Kathmandu, Nepal<br />Opposite to Kumari Bank"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold mb-4">Phone Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Title</label>
                                            <input
                                                type="text"
                                                value={data.contactInfo.phone.title}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, phone: { ...data.contactInfo.phone, title: e.target.value } } })}
                                                className={inputClass}
                                                placeholder="Call or WhatsApp"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Numbers (one per line)</label>
                                            <textarea
                                                value={data.contactInfo.phone.numbers.join('\n')}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, phone: { ...data.contactInfo.phone, numbers: e.target.value.split('\n') } } })}
                                                className={inputClass + " resize-y"}
                                                rows={2}
                                                placeholder="+977-98XXXXXXXX&#10;+977-01-XXXXXXX"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold mb-4">Email Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Title</label>
                                            <input
                                                type="text"
                                                value={data.contactInfo.email.title}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, email: { ...data.contactInfo.email, title: e.target.value } } })}
                                                className={inputClass}
                                                placeholder="Email Us"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email Addresses (one per line)</label>
                                            <textarea
                                                value={data.contactInfo.email.addresses.join('\n')}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, email: { ...data.contactInfo.email, addresses: e.target.value.split('\n') } } })}
                                                className={inputClass + " resize-y"}
                                                rows={2}
                                                placeholder="info@seekshyaacademy.com&#10;admissions@seekshyaacademy.com"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Map */}
                                <div className="md:col-span-2">
                                    <h3 className="text-lg font-semibold mb-4">Map Section</h3>
                                    <div className="grid grid-cols-1 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Map Title</label>
                                            <input
                                                type="text"
                                                value={data.contactInfo.map.title}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, map: { ...data.contactInfo.map, title: e.target.value } } })}
                                                className={inputClass}
                                                placeholder="Find us on Map"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Map Embed Code (iframe)</label>
                                            <textarea
                                                value={data.contactInfo.map.iframeCode}
                                                onChange={(e) => setData({ ...data, contactInfo: { ...data.contactInfo, map: { ...data.contactInfo.map, iframeCode: e.target.value } } })}
                                                className={inputClass + " resize-y"}
                                                rows={4}
                                                placeholder="<iframe src='...' width='100%' height='280' style='border:0;' allowfullscreen='' loading='lazy'></iframe>"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Paste your Google Maps embed iframe code here</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "contact-form" && (
                        <CMSSection
                            title="Contact Form Section"
                            isVisible={data.contactForm.isVisible}
                            onVisibilityChange={(v) => setData({ ...data, contactForm: { ...data.contactForm, isVisible: v } })}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Form Title</label>
                                    <input
                                        type="text"
                                        value={data.contactForm.title}
                                        onChange={(e) => setData({ ...data, contactForm: { ...data.contactForm, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Send us an Inquiry"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Form Description</label>
                                    <textarea
                                        value={data.contactForm.description}
                                        onChange={(e) => setData({ ...data, contactForm: { ...data.contactForm, description: e.target.value } })}
                                        className={inputClass + " resize-y"}
                                        rows={2}
                                        placeholder="Fill out the form below and our team will get back to you within 24 hours."
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}

                    {activeTab === "seo" && (
                        <CMSSection title="SEO Settings">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Title</label>
                                    <input
                                        type="text"
                                        value={data.seo?.title || ""}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, title: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Contact Page Title"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Meta Description</label>
                                    <textarea
                                        rows={3}
                                        value={data.seo?.description || ""}
                                        onChange={(e) => setData({ ...data, seo: { ...data.seo, description: e.target.value } })}
                                        className={inputClass}
                                        placeholder="Enter meta description"
                                    />
                                </div>
                            </div>
                        </CMSSection>
                    )}
                </>
            )}
        />
    );
}
