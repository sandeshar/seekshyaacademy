import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICoursePageCategory {
    _id?: string;
    name: string;
    slug: string;
    type: 'category' | 'subcategory' | 'default';
    hero: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayOpacity?: number;
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
    content?: string;
    courses?: {
        title: string;
        subtitle: string;
        items: {
            level: string;
            slug: string;
            type: string;
            description: string;
            features: string[];
            icon: string;
            popular: boolean;
        }[];
    };
    richTextItems?: {
        title: string;
        content: string;
        icon?: string;
    }[];
    seo?: {
        title: string;
        description: string;
    };
}

export interface ICoursePage extends Document {
    categories: ICoursePageCategory[];
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
    createdAt: Date;
    updatedAt: Date;
}

const CoursePageSchema: Schema = new Schema({
    categories: {
        type: [{
            name: { type: String, required: true },
            slug: { type: String, required: true },
            type: { type: String, enum: ['category', 'subcategory', 'default'], default: 'category' },
            hero: {
                isVisible: { type: Boolean, default: true },
                badgeText: { type: String, default: "ICAN New Syllabus 2025" },
                title: { type: String, default: "CA Foundation Level" },
                description: { type: String, default: "The First Step Towards Becoming a Chartered Accountant. Build a robust academic base with Seekshya Academy's expert guidance." },
                backgroundImage: { type: String, default: "https://images.unsplash.com/photo-1523050335392-9bef867a0571?q=80&w=2070&auto=format&fit=crop" },
                overlayOpacity: { type: Number, default: 40 },
                primaryButton: {
                    text: { type: String, default: "Register for Foundation" },
                    link: { type: String, default: "/register" },
                    icon: { type: String, default: "how_to_reg" }
                },
                secondaryButton: {
                    text: { type: String, default: "Download Syllabus" },
                    link: { type: String, default: "/syllabus" },
                    icon: { type: String, default: "download" }
                }
            },
            content: { type: String, default: "" },
            courses: {
                title: { type: String, default: "Available Courses" },
                subtitle: { type: String, default: "Expert Training" },
                items: [{
                    level: { type: String, default: "" },
                    slug: { type: String, default: "" },
                    type: { type: String, default: "" },
                    description: { type: String, default: "" },
                    features: { type: [String], default: [] },
                    icon: { type: String, default: "school" },
                    popular: { type: Boolean, default: false }
                }]
            },
            richTextItems: [{
                title: { type: String, default: "" },
                content: { type: String, default: "" },
                icon: { type: String, default: "menu_book" }
            }],
            seo: {
                title: { type: String, default: "" },
                description: { type: String, default: "" }
            }
        }],
        default: [
            {
                name: "Default",
                slug: "default",
                type: "default",
                hero: {
                    isVisible: true,
                    badgeText: "Seekshya Academy Academy",
                    title: "Chartered Accountancy Courses",
                    description: "Join Nepal's premier institute for CA Foundation, Intermediate, and Final levels. Expert guidance for ICAN success.",
                    backgroundImage: "https://images.unsplash.com/photo-1523050335392-9bef867a0571?q=80&w=2070&auto=format&fit=crop",
                    primaryButton: { text: "Explore Courses", link: "#courses-grid", icon: "explore" },
                    secondaryButton: { text: "Admissions", link: "/contact", icon: "call" }
                }
            }
        ]
    },
    cta: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Ready to Start Your CA Journey?" },
        description: { type: String, default: "Join the top-ranked CA institute and turn your goals into professional success." },
        primaryButton: {
            text: { type: String, default: "Enroll for 2025" },
            link: { type: String, default: "/register" },
            icon: { type: String, default: "login" }
        },
        secondaryButton: {
            text: { type: String, default: "Talk to an Expert" },
            link: { type: String, default: "/contact" },
            icon: { type: String, default: "chat" }
        }
    }
}, {
    timestamps: true
});

const CoursePage: Model<ICoursePage> = mongoose.models.CoursePage || mongoose.model<ICoursePage>('CoursePage', CoursePageSchema);

export default CoursePage;
