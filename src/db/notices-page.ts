import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INoticesPage extends Document {
    hero: {
        isVisible: boolean;
        badge: string;
        title: string;
        subtitle: string;
    };
    search: {
        isVisible: boolean;
        placeholder: string;
        allNoticesText: string;
    };
    quickLinksWidget: {
        isVisible: boolean;
        title: string;
        links: Array<{
            text: string;
            url: string;
            icon: string;
            external: boolean;
        }>;
    };
    supportWidget: {
        isVisible: boolean;
        title: string;
        description: string;
        phone: string;
        email: string;
    };
    seo?: {
        title: string;
        description: string;
    };
}

const NoticesPageSchema: Schema = new Schema({
    hero: {
        isVisible: { type: Boolean, default: true },
        badge: { type: String, default: "Seekshya Academy UPDATES" },
        title: { type: String, default: "Official Notices & Updates" },
        subtitle: { type: String, default: "Stay informed with the latest ICAN announcements, exam schedules, and class updates." },
    },
    search: {
        isVisible: { type: Boolean, default: true },
        placeholder: { type: String, default: "Search notices (e.g., 'CAP-II Exam')" },
        allNoticesText: { type: String, default: "All Notices" },
    },
    subscribeWidget: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Never Miss an Update" },
        description: { type: String, default: "Get instant notifications about exam schedules and class changes directly to your inbox." },
        placeholder: { type: String, default: "Enter your email" },
        buttonText: { type: String, default: "Subscribe" },
    },
    quickLinksWidget: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Quick Links" },
        links: {
            type: [{
                text: { type: String },
                url: { type: String },
                icon: { type: String },
                external: { type: Boolean, default: true },
            }],
            default: [
                { text: "ICAN Official Website", url: "https://www.ican.org.np", icon: "open_in_new", external: true },
                { text: "Student Portal Login", url: "#", icon: "login", external: false },
                { text: "Exam Form Guidelines", url: "#", icon: "description", external: false },
            ]
        },
    },
    supportWidget: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Need Help?" },
        description: { type: String, default: "If you have any queries regarding notices or admissions, feel free to contact administration." },
        phone: { type: String, default: "+977-1-4XXXXXX" },
        email: { type: String, default: "info@lakshyaca.com" },
    },
    seo: {
        title: { type: String, default: "Notices & Updates | Seekshya Academy" },
        description: { type: String, default: "Stay updated with the latest notices and announcements from Seekshya Academy." }
    }
}, {
    timestamps: true
});

const NoticesPage: Model<INoticesPage> = mongoose.models.NoticesPage || mongoose.model<INoticesPage>('NoticesPage', NoticesPageSchema);

export default NoticesPage;
