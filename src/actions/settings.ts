"use server";

import { cacheTag, revalidatePath, revalidateTag } from "next/cache";
import dbConnect from "@/db/db";
import SiteSettings from "@/db/site-settings";
import { CACHE_TAGS } from "@/utils/cachetags";
import nodemailer from "nodemailer";
import { isAdmin, hasPermission } from "@/utils/auth";

export async function getSettings() {
    "use cache";
    cacheTag(CACHE_TAGS.SETTINGS);
    try {
        await dbConnect();
        let settings = await SiteSettings.findOne().lean() as any;
        if (!settings) {
            settings = await SiteSettings.create({});
            return JSON.parse(JSON.stringify(settings));
        }
        return JSON.parse(JSON.stringify(settings));
    } catch (error: any) {
        console.error("getSettings error:", error);
        throw new Error(error.message);
    }
}

export async function updateSettings(data: any) {
    try {
        if (!(await hasPermission('settings'))) {
            throw new Error("Unauthorized");
        }
        await dbConnect();
        let settings = await SiteSettings.findOne();

        if (settings) {
            Object.assign(settings, data);
            await settings.save();
        } else {
            settings = await SiteSettings.create(data);
        }

        revalidateTag(CACHE_TAGS.SETTINGS, 'max');
        revalidatePath('/', 'layout');
        revalidatePath('/dashboard', 'layout');
        return JSON.parse(JSON.stringify(settings));
    } catch (error: any) {
        console.error("updateSettings error:", error);
        throw new Error(error.message);
    }
}

export async function testSMTPSettings(data: any) {
    try {
        const transporter = nodemailer.createTransport({
            host: data.host,
            port: parseInt(data.port),
            secure: parseInt(data.port) === 465,
            auth: {
                user: data.user,
                pass: data.pass,
            },
        });

        // verify connection configuration
        await transporter.verify();

        // send test email
        const fromName = data.fromName || "Seekshya Academy";
        const fromEmail = data.from || data.user;

        await transporter.sendMail({
            from: `"${fromName}" <${fromEmail}>`,
            to: fromEmail,
            subject: "SMTP Test Email - Seekshya Academy",
            text: "This is a test email to verify your SMTP settings. If you received this, your SMTP configuration is correct!",
            html: "<b>This is a test email to verify your SMTP settings.</b><p>If you received this, your SMTP configuration is correct!</p>",
        });

        return { success: true, message: "SMTP connection verified and test email sent!" };
    } catch (error: any) {
        console.error("testSMTPSettings error:", error);
        return { success: false, error: error.message };
    }
}



