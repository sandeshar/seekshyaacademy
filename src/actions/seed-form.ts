"use server";

import AdmissionFormModel from "@/db/admission-forms";
import dbConnect from "@/db/db";

export async function seedAdmissionForm() {
    try {
        await dbConnect();

        const dummyForm = {
            title: "Standard Admission Form 2026",
            description: "Please fill out this form to apply for various courses at Seekshya Academy.",
            isActive: true,
            fields: [
                {
                    label: "Full Name",
                    name: "full_name",
                    type: "text",
                    required: true,
                    placeholder: "John Doe"
                },
                {
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    required: true,
                    placeholder: "john@example.com"
                },
                {
                    label: "Phone Number",
                    name: "phone",
                    type: "tel",
                    required: true,
                    placeholder: "+977 1234567890"
                },
                {
                    label: "Select Course",
                    name: "course",
                    type: "select",
                    required: true,
                    options: ["Computer Science", "Business Management", "Engineering", "Arts"]
                },
                {
                    label: "Academic Level",
                    name: "academic_level",
                    type: "radio",
                    required: true,
                    options: ["+2", "Bachelor", "Master"]
                },
                {
                    label: "Current Address",
                    name: "address",
                    type: "text",
                    required: false,
                    placeholder: "Kathmandu, Nepal"
                },
                {
                    label: "Additional Message",
                    name: "message",
                    type: "textarea",
                    required: false,
                    placeholder: "Any other information..."
                }
            ]
        };

        const existing = await AdmissionFormModel.findOne({ title: dummyForm.title });
        if (existing) {
            console.log("Dummy form already exists.");
            return { success: true, message: "Form already exists" };
        }

        await AdmissionFormModel.create(dummyForm);
        console.log("Dummy admission form seeded successfully!");
        return { success: true, message: "Form seeded successfully" };
    } catch (error: any) {
        console.error("Error seeding form:", error);
        return { success: false, error: error.message };
    }
}
