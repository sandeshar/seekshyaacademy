"use client";

import React, { useState } from 'react';
import { submitContactForm } from '@/actions/contact-actions';
import toast from 'react-hot-toast';

interface ContactFormProps {
    data: {
        title: string;
        description: string;
    };
}

const ContactForm = ({ data }: ContactFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);

        try {
            const result = await submitContactForm(formData);
            if (result.success) {
                toast.success(result.success);
                (event.target as HTMLFormElement).reset();
            } else {
                toast.error(result.error || "Something went wrong");
            }
        } catch (error) {
            toast.error("Failed to send message");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 lg:p-10 sticky top-28">
                <div className="flex flex-col gap-2 mb-8">
                    <h2 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight font-display">{data.title}</h2>
                    <p className="text-slate-600 text-sm">{data.description}</p>
                </div>
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-700 text-sm font-medium leading-normal">Full Name</span>
                            <input
                                className="flex w-full rounded-lg border border-slate-300 bg-slate-50 h-12 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 placeholder:text-slate-400"
                                placeholder="Enter your full name"
                                type="text"
                                name="fullName"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-700 text-sm font-medium leading-normal">Email Address</span>
                            <input
                                className="flex w-full rounded-lg border border-slate-300 bg-slate-50 h-12 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 placeholder:text-slate-400"
                                placeholder="john@example.com"
                                type="email"
                                name="email"
                                required
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-700 text-sm font-medium leading-normal">Phone Number</span>
                            <input
                                className="flex w-full rounded-lg border border-slate-300 bg-slate-50 h-12 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 placeholder:text-slate-400"
                                placeholder="+977-98XXXXXXXX"
                                type="tel"
                                name="phone"
                                required
                            />
                        </label>
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-700 text-sm font-medium leading-normal">Interested Course</span>
                            <select
                                className="flex w-full cursor-pointer rounded-lg border border-slate-300 bg-slate-50 h-12 px-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900"
                                defaultValue=""
                                name="course"
                                required
                            >
                                <option disabled value="">Select a course</option>
                                <option value="cap-i">CAP-I (Foundation)</option>
                                <option value="cap-ii">CAP-II (Intermediate)</option>
                                <option value="cap-iii">CAP-III (Final)</option>
                                <option value="other">Other Inquiry</option>
                            </select>
                        </label>
                    </div>
                    <label className="flex flex-col gap-2">
                        <span className="text-slate-700 text-sm font-medium leading-normal">Your Message</span>
                        <textarea
                            className="flex w-full resize-y rounded-lg border border-slate-300 bg-slate-50 p-4 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 text-slate-900 placeholder:text-slate-400"
                            placeholder="Hi, I would like to know more about the scholarship programs for CAP-I..."
                            rows={5}
                            name="message"
                            required
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal hover:bg-primary-dark transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="flex items-center gap-2">
                            {isSubmitting ? "Sending..." : "Send Message"}
                            {!isSubmitting && <span className="material-symbols-outlined text-[20px]">send</span>}
                        </span>
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-2">
                        By submitting this form, you agree to our privacy policy.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;

