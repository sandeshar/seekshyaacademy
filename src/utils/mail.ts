import nodemailer from "nodemailer";
import SiteSettings from "@/db/site-settings";
import dbConnect from "@/db/db";

export async function sendMail({ to, subject, text, html }: { to: string, subject: string, text: string, html: string }) {
    try {
        await dbConnect();
        const settings = await SiteSettings.findOne().lean() as any;

        if (!settings || !settings.smtp || !settings.smtp.host || !settings.smtp.user) {
            console.error("SMTP settings not configured. Skipping email.");
            return { success: false, error: "SMTP not configured" };
        }

        const { host, port, user, pass, from, fromName } = settings.smtp;

        const transporter = nodemailer.createTransport({
            host,
            port: parseInt(port),
            secure: parseInt(port) === 465,
            auth: {
                user,
                pass,
            },
        });

        const activeFromName = fromName || "Seekshya Academy";
        const activeFromEmail = from || user;

        const info = await transporter.sendMail({
            from: `"${activeFromName}" <${activeFromEmail}>`,
            to,
            subject,
            text,
            html,
        });

        return { success: true, messageId: info.messageId };
    } catch (error: any) {
        console.error("sendMail error:", error);
        return { success: false, error: error.message };
    }
}
