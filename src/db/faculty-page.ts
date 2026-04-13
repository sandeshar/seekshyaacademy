import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFacultyPage extends Document {
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
    grid: {
        title: string;
        description: string;
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

const FacultyPageSchema: Schema = new Schema({
    hero: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "Excellence in Education" },
        title: { type: String, default: "Meet Your Mentors" },
        description: { type: String, default: "Learn from the experts leading the way for the ICAN CA New Syllabus 2025. Our faculty combines academic rigor with real-world practical insights." },
        backgroundImage: { type: String, default: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9FjJqV3LRHmwHcLQe9ItyjofWWaT1o2Jqbe7czDifiOabrAClY5HLFErF0sCTZsWusYNTZAD3tVroFtI8yjfzNNaR6A7po5O5jYZLVgieWTTmu1vtgsIFgiGX95hlD42faxTu05p5NfAYXIjd9mVi1Jzhz44d0gB5Z5__EUFq753howoR8ZshPMD9bVr5G5n6-QBYy5XwLjzD7udmOwwqBaaRxxYyEBlCCj5wN17RugzMg_nrMDCE6fmM1w2Rgi-rxL7P7mPTi06F" },
        overlayOpacity: { type: Number, default: 80 },
        primaryButton: {
            text: { type: String, default: "View Courses" },
            link: { type: String, default: "/courses" },
            icon: { type: String, default: "explore" }
        },
        secondaryButton: {
            text: { type: String, default: "Watch Intro" },
            link: { type: String, default: "#" },
            icon: { type: String, default: "play_circle" }
        }
    },
    grid: {
        title: { type: String, default: "Our Distinguished Faculty" },
        description: { type: String, default: "Mentors dedicated to your success in the Chartered Accountancy journey." }
    },
    cta: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Ready to Learn from the Experts?" },
        description: { type: String, default: "Join Seekshya Academy today and start your journey towards becoming a Chartered Accountant with the best mentors by your side." },
        primaryButton: {
            text: { type: String, default: "Register Now" },
            link: { type: String, default: "/contact" },
            icon: { type: String, default: "how_to_reg" }
        },
        secondaryButton: {
            text: { type: String, default: "Browse All Courses" },
            link: { type: String, default: "/courses" },
            icon: { type: String, default: "arrow_forward" }
        }
    },
    seo: {
        title: { type: String, default: "Our Faculty - Seekshya Academy" },
        description: { type: String, default: "Meet the expert mentors leading the way for ICAN CA success at Seekshya Academy." }
    }
}, { timestamps: true });

const FacultyPage: Model<IFacultyPage> = mongoose.models.FacultyPage || mongoose.model<IFacultyPage>('FacultyPage', FacultyPageSchema);

export default FacultyPage;
