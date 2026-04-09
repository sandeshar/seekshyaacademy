import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHomepage extends Document {
    hero: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayOpacity: number;
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
    highlights: {
        isVisible: boolean;
        title: string;
        description: string;
        items: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
    whyChooseUs: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        imageUrl: string;
        stats: {
            number: string;
            text: string;
        };
        reasons: {
            icon: string;
            title: string;
            description: string;
        }[];
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
    courses: {
        isVisible: boolean;
        title: string;
        subtitle: string;
        items: {
            level: string;
            type: string;
            description: string;
            features: string[];
            icon: string;
            popular: boolean;
        }[];
    };
    seo: {
        title: string;
        description: string;
    };
}

const HomepageSchema: Schema = new Schema({
    hero: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "New Syllabus 2025 Ready" },
        title: { type: String, default: "Seekshya Academy – Your Target to Chartered Accountancy Success" },
        description: { type: String, default: "Comprehensive preparation for ICAN CA New Syllabus 2025. From Foundation to Advisory Level, we guide your journey to becoming a professional." },
        backgroundImage: { type: String, default: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" },
        overlayOpacity: { type: Number, default: 40 },
        primaryButton: {
            text: { type: String, default: "Online Registration" },
            link: { type: String, default: "/register" },
            icon: { type: String, default: "how_to_reg" }
        },
        secondaryButton: {
            text: { type: String, default: "Explore Courses" },
            link: { type: String, default: "/courses" },
            icon: { type: String, default: "explore" }
        }
    },
    highlights: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "ICAN CA New Syllabus 2025 Highlights" },
        description: { type: String, default: "Stay ahead with our curriculum designed strictly according to the latest ICAN directives." },
        items: {
            type: [{
                icon: { type: String },
                title: { type: String },
                description: { type: String }
            }],
            default: [
                {
                    icon: 'menu_book',
                    title: 'Updated ICAN Curriculum',
                    description: 'Comprehensive coverage of the new 2025 syllabus with updated study materials.'
                },
                {
                    icon: 'psychology',
                    title: 'Concept-Based Learning',
                    description: 'Deep dive into core accounting concepts focusing on practical application.'
                },
                {
                    icon: 'track_changes',
                    title: 'Exam-Focused Prep',
                    description: 'Strategic preparation methodologies aimed at securing high exam scores.'
                },
                {
                    icon: 'work',
                    title: 'Articleship Guidance',
                    description: 'Professional mentorship to help you secure and excel in your articleship.'
                }
            ]
        }
    },
    whyChooseUs: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "Why Seekshya Academy" },
        title: { type: String, default: "Empowering the Next Generation of Finance Leaders" },
        description: { type: String, default: "" },
        imageUrl: { type: String, default: "https://lh3.googleusercontent.com/aida-public/AB6AXuDT0Y03yU5HY9jtLgMnxy7G1aCylO1ifjpKstuXe79FGEByO8DEa_KP0FvyJzv6d2AZhYKOL1ZbDFB8qpPTNcvbP9rk4NUY1ZgX6OWiec7Dvv2cb94MgbFaVE_gpn-KDKveqBjEgN2MGXLqV34okbYpgl5sRGefsXtoFqKPC03zNGecZTYqKfWVEjl9lJPw7Erl5Z9wqYnuu9EJD6ehuIjLvyJZXygJEGPZql-N9CUhjt9RjRmNx3KErtrVN6ovEDpJYx_Bmcq3PgE" },
        stats: {
            number: { type: String, default: "92%" },
            text: { type: String, default: "First-time pass rate in recent CAP-I examinations." }
        },
        reasons: {
            type: [{
                icon: { type: String },
                title: { type: String },
                description: { type: String }
            }],
            default: [
                {
                    icon: 'verified_user',
                    title: 'Experienced Faculty',
                    description: 'Learn from industry veterans and rank-holding CAs who bring real-world experience to the classroom.'
                },
                {
                    icon: 'account_tree',
                    title: 'Structured Learning System',
                    description: 'A meticulously planned academic calendar ensuring timely syllabus completion and ample revision time.'
                },
                {
                    icon: 'emoji_events',
                    title: 'Proven Success Track Record',
                    description: 'Join an institute that consistently produces toppers and rank holders in ICAN examinations.'
                },
                {
                    icon: 'military_tech',
                    title: 'Exam Success Strategy',
                    description: 'Proven techniques and mock tests modeled on ICAN standards to maximize your scoring potential.'
                }
            ]
        }
    },
    cta: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Start Your CA Journey with Seekshya" },
        description: { type: String, default: "Join the premier institute dedicated to your success in the ICAN examinations. Your future as a Chartered Accountant begins here." },
        primaryButton: {
            text: { type: String, default: "Register Online Today" },
            link: { type: String, default: "/register" },
            icon: { type: String, default: "login" }
        },
        secondaryButton: {
            text: { type: String, default: "Contact Admissions" },
            link: { type: String, default: "/contact" },
            icon: { type: String, default: "call" }
        }
    },
    courses: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Our Courses" },
        subtitle: { type: String, default: "Academic Pathways" },
        items: {
            type: [{
                level: { type: String },
                slug: { type: String },
                type: { type: String },
                description: { type: String },
                features: { type: [String] },
                icon: { type: String },
                popular: { type: Boolean, default: false }
            }],
            default: [
                {
                    level: 'Foundation Level',
                    slug: 'foundation',
                    type: 'Entry Level',
                    description: 'The first step towards your CA designation. Covers fundamentals of accounting, economics, and mercantile laws.',
                    features: ['Basic Accounting', 'Mercantile Laws', 'Fundamentals of Economics'],
                    icon: 'looks_one',
                    popular: false
                },
                {
                    level: 'Application Level',
                    slug: 'intermediate',
                    type: 'Level II',
                    description: 'Build upon your foundation with in-depth knowledge of corporate laws, tax, and financial management.',
                    features: ['Corporate Laws', 'Financial Management', 'Audit & Assurance'],
                    icon: 'looks_two',
                    popular: true
                },
                {
                    level: 'Advisory Level',
                    type: 'Final Level',
                    description: 'Master advanced concepts in auditing, strategic analysis, and reporting to become a qualified CA.',
                    features: ['Advanced Auditing', 'Strategic Analysis', 'Advanced Taxation'],
                    icon: 'looks_3',
                    popular: false
                }
            ]
        }
    },
    seo: {
        title: { type: String, default: "" },
        description: { type: String, default: "" }
    }
}, {
    timestamps: true
});

const Homepage: Model<IHomepage> = mongoose.models.Homepage || mongoose.model<IHomepage>('Homepage', HomepageSchema);

export default Homepage;
