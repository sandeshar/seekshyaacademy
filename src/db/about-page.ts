import mongoose, { Document, Model, Schema } from "mongoose";

interface IAboutPage extends Document {
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
    qualities: {
        isVisible: boolean;
        items: [
            {
                number: string;
                title: string;
            }
        ];
    };
    aboutUs: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        imageUrl: string;
        cards: [
            {
                icon: string;
                title: string;
                description: string;
            }
        ];
    };
    cta1: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        primaryButton: {
            text: string;
            link: string;
            icon?: string;
        };
        imageUrl: string;
    };
    philosophy: {
        isVisible: boolean;
        title: string;
        description: string;
        items: [
            {
                icon: string;
                title: string;
                description: string;
            }
        ];
    };
    cta2: {
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

const AboutSchema: Schema = new Schema({
    hero: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "Est 1990" },
        title: { type: String, default: "Shaping the Future of Chartered Accountancy" },
        description: { type: String, default: "Seekshya Academy has been a beacon of excellence in Chartered Accountancy education since 1990. Our commitment to quality teaching and student success has made us a trusted name among ICAN CA aspirants." },
        backgroundImage: { type: String, default: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2070&auto=format&fit=crop" },
        overlayOpacity: { type: Number, default: 80 },
        primaryButton: {
            text: { type: String, default: "Explore Courses" },
            link: { type: String, default: "/courses" },
            icon: { type: String, default: "explore" }
        },
        secondaryButton: {
            text: { type: String, default: "About Us" },
            link: { type: String, default: "/about" },
            icon: { type: String, default: "info" }
        }
    },
    qualities: {
        isVisible: { type: Boolean, default: true },
        items: {
            type: [
                {
                    number: { type: String },
                    title: { type: String }
                }
            ],
            default: [
                { number: "30+", title: "Years of Excellence" },
                { number: "5000+", title: "CA Alumni" },
                { number: "15+", title: "Subject Experts" },
                { number: "95%", title: "Success Rate" }
            ]
        }
    },
    aboutUs: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "About Seekshya Academy" },
        title: { type: String, default: "Committed to Your Chartered Accountancy Success" },
        description: { type: String, default: "At Seekshya Academy, we believe in empowering our students with the knowledge and skills needed to excel in the Chartered Accountancy profession. Our experienced faculty and comprehensive curriculum ensure that you are well-prepared for every stage of your journey." },
        imageUrl: { type: String, default: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop" },
        cards: {
            type: [
                {
                    icon: { type: String },
                    title: { type: String },
                    description: { type: String }
                }
            ],
            default: [
                {
                    icon: "school",
                    title: "Expert Faculty",
                    description: "Learn from industry professionals and seasoned educators."
                },
                {
                    icon: "menu_book",
                    title: "Comprehensive Curriculum",
                    description: "Covering all aspects of the ICAN CA New Syllabus 2025."
                },
            ]
        }
    },
    cta1: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "Join Seekshya Academy" },
        title: { type: String, default: "Kickstart Your Chartered Accountancy Journey Today" },
        description: { type: String, default: "Enroll now and take the first step towards a successful career in Chartered Accountancy with Seekshya Academy." },
        primaryButton: {
            text: { type: String, default: "Register Now" },
            link: { type: String, default: "/register" },
            icon: { type: String, default: "how_to_reg" }
        },
        imageUrl: { type: String, default: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1470&auto=format&fit=crop" }
    },
    philosophy: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Our Teaching Philosophy" },
        description: { type: String, default: "At Seekshya Academy, we believe in a student-centric approach that fosters critical thinking, practical application, and continuous improvement." },
        items: {
            type: [
                {
                    icon: { type: String },
                    title: { type: String },
                    description: { type: String }
                }
            ],
            default: [
                {
                    icon: "lightbulb",
                    title: "Innovative Teaching",
                    description: "Incorporating the latest teaching methodologies and technologies."
                },
                {
                    icon: "group",
                    title: "Collaborative Learning",
                    description: "Encouraging peer-to-peer interaction and group studies."
                },
                {
                    icon: "assessment",
                    title: "Continuous Assessment",
                    description: "Regular tests and feedback to track progress and identify areas for improvement."
                }
            ]
        }
    },
    cta2: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Ready to Excel in Chartered Accountancy?" },
        description: { type: String, default: "Join Seekshya Academy and embark on a journey of learning, growth, and success in the Chartered Accountancy profession." },
        primaryButton: {
            text: { type: String, default: "Get Started" },
            link: { type: String, default: "/register" },
            icon: { type: String, default: "arrow_forward" }
        },
        secondaryButton: {
            text: { type: String, default: "Contact Us" },
            link: { type: String, default: "/contact" },
            icon: { type: String, default: "call" }
        }
    },
    seo: {
        title: { type: String, default: "About Seekshya Academy - Excellence in Chartered Accountancy Education" },
        description: { type: String, default: "Learn about Seekshya Academy's commitment to excellence in Chartered Accountancy education since 1990. Discover our teaching philosophy, expert faculty, and comprehensive curriculum designed to help you succeed in the ICAN CA New Syllabus 2025." }
    }
});

const AboutPage: Model<IAboutPage> = mongoose.models.AboutPage || mongoose.model<IAboutPage>("AboutPage", AboutSchema);

export default AboutPage;
