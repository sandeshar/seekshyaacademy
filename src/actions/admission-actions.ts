"use server";

import AdmissionFormModel from "@/db/admission-forms";
import AdmissionSubmissionModel from "@/db/admission-submissions";
import dbConnect from "@/db/db";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/utils/mail";
import SiteSettings from "@/db/site-settings";
import { getSettings } from "./settings";

// --- Admission Form Management ---

export async function createAdmissionForm(formData: any) {
    try {
        await dbConnect();
        const newForm = await AdmissionFormModel.create(formData);
        revalidatePath("/(admin)/dashboard/admissions", "layout");
        return { success: true, data: JSON.parse(JSON.stringify(newForm)) };
    } catch (error: any) {
        console.error("Error creating admission form:", error);
        return { success: false, error: error.message || "Failed to create form" };
    }
}

export async function updateAdmissionForm(id: string, formData: any) {
    try {
        await dbConnect();
        const updatedForm = await AdmissionFormModel.findByIdAndUpdate(id, formData, { new: true });
        revalidatePath("/(admin)/dashboard/admissions", "layout");
        return { success: true, data: JSON.parse(JSON.stringify(updatedForm)) };
    } catch (error: any) {
        console.error("Error updating admission form:", error);
        return { success: false, error: error.message || "Failed to update form" };
    }
}

export async function getAdmissionForms() {
    try {
        await dbConnect();
        const forms = await AdmissionFormModel.find().sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(forms));
    } catch (error) {
        console.error("Error fetching admission forms:", error);
        return [];
    }
}

export async function getActiveAdmissionForm(slug?: string) {
    try {
        await dbConnect();

        // If slug is provided, search specifically by slug.
        // If no slug is provided, we might return the most recent active one (optional behavior).
        const query: any = { isActive: true };
        if (slug) {
            query.slug = slug;
        } else {
            // If no slug, just return the most recent active form
            const form = await AdmissionFormModel.findOne(query).sort({ createdAt: -1 });
            return form ? JSON.parse(JSON.stringify(form)) : null;
        }

        const form = await AdmissionFormModel.findOne(query);
        return form ? JSON.parse(JSON.stringify(form)) : null;
    } catch (error) {
        console.error("Error fetching active admission form:", error);
        return null;
    }
}

export async function getActiveAdmissionForms() {
    try {
        await dbConnect();
        const forms = await AdmissionFormModel.find({ isActive: true }).sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(forms));
    } catch (error) {
        console.error("Error fetching active admission forms:", error);
        return [];
    }
}

export async function toggleFormStatus(id: string, isActive: boolean) {
    try {
        await dbConnect();
        await AdmissionFormModel.findByIdAndUpdate(id, { isActive });
        revalidatePath("/(admin)/dashboard/admissions", "layout");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteAdmissionForm(id: string) {
    try {
        await dbConnect();
        await AdmissionFormModel.findByIdAndDelete(id);
        // Also delete submissions tied to this form
        await AdmissionSubmissionModel.deleteMany({ formId: id });
        revalidatePath("/(admin)/dashboard/admissions", "layout");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// --- Admission Submission Management ---

export async function submitAdmissionForm(formId: string, data: any) {
    try {
        await dbConnect();

        // Get the form title for the email
        const form = await AdmissionFormModel.findById(formId).select('title');

        const submission = await AdmissionSubmissionModel.create({
            formId,
            data,
            status: 'pending'
        });

        // Send Email Notification to Admin
        try {
            const settings = await SiteSettings.findOne().lean() as any;
            if (settings?.smtp?.user) {
                const adminEmail = settings.contactEmail || settings.smtp.user;
                const formTitle = form?.title || "New Admission";

                const html = `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-lg">
                        <h2 style="color: #0f172a; margin-bottom: 20px;">New Form Submission: ${formTitle}</h2>
                        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                            ${Object.entries(data).map(([key, value]) => `
                                <div style="margin-bottom: 10px;">
                                    <strong style="color: #64748b; font-size: 12px; text-transform: uppercase;">${key.replace(/_/g, ' ')}</strong>
                                    <div style="color: #334155; font-weight: 500;">
                                        ${typeof value === 'string' && value.startsWith('/uploads')
                        ? `<a href="${process.env.NEXT_PUBLIC_APP_URL || ''}${value}" style="color: #2563eb;">View Uploaded File</a>`
                        : value}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        <a href="${process.env.NEXT_PUBLIC_APP_URL || ''}/dashboard/admissions/submissions" 
                           style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                            View in Dashboard
                        </a>
                    </div>
                `;

                await sendMail({
                    to: adminEmail,
                    subject: `New Admission: ${formTitle}`,
                    text: `A new application has been submitted for ${formTitle}. Check dashboard for details.`,
                    html
                });
            }
        } catch (emailError) {
            console.error("Failed to send admission notification email:", emailError);
            // Don't fail the whole submission if email fails
        }

        revalidatePath("/(admin)/dashboard/admissions/submissions", "layout");
        return { success: true, data: JSON.parse(JSON.stringify(submission)) };
    } catch (error: any) {
        console.error("Error submitting admission form:", error);
        return { success: false, error: error.message || "Submission failed" };
    }
}

export async function getAdmissionSubmissions(formId?: string) {
    try {
        await dbConnect();
        const query = formId ? { formId } : {};
        const submissions = await AdmissionSubmissionModel.find(query)
            .populate('formId', 'title')
            .sort({ createdAt: -1 });
        return JSON.parse(JSON.stringify(submissions));
    } catch (error) {
        console.error("Error fetching submissions:", error);
        return [];
    }
}

export async function updateSubmissionStatus(id: string, status: string) {
    try {
        await dbConnect();
        await AdmissionSubmissionModel.findByIdAndUpdate(id, { status });
        revalidatePath("/(admin)/dashboard/admissions/submissions", "layout");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function deleteSubmission(id: string) {
    try {
        await dbConnect();
        await AdmissionSubmissionModel.findByIdAndDelete(id);
        revalidatePath("/(admin)/dashboard/admissions/submissions", "layout");
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
