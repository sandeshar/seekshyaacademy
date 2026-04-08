import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBlogsPage extends Document {
    hero: {
        isVisible: boolean;
        title: string;
        subtitle: string;
    };
    cta: {
        isVisible: boolean;
        title: string;
        description: string;
        primaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
        secondaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
    };
    seo: {
        title: string;
        description: string;
    };
}

const BlogsPageSchema: Schema = new Schema({
    hero: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Expert Insights & Resources" },
        subtitle: { type: String, default: "Your guide to mastering the ICAN CA syllabus with tips, articles, and expert advice." }
    },
    cta: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Expand Your Knowledge Today" },
        description: { type: String, default: "Join our community of aspiring CAs and get access to exclusive study materials and insights." },
        primaryButton: {
            text: { type: String, default: "Read More Articles" },
            link: { type: String, default: "/blogs" },
            icon: { type: String, default: "library_books" }
        },
        secondaryButton: {
            text: { type: String, default: "Contact Student Support" },
            link: { type: String, default: "/contact" },
            icon: { type: String, default: "support_agent" }
        }
    },
    seo: {
        title: { type: String, default: "Blogs - Seekshya Academy" },
        description: { type: String, default: "Expert insights, study tips, and resources for Chartered Accountancy students." }
    }
}, {
    timestamps: true
});

const BlogsPage: Model<IBlogsPage> = mongoose.models.BlogsPage || mongoose.model<IBlogsPage>('BlogsPage', BlogsPageSchema);

export default BlogsPage;
