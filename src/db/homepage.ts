import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHomepage extends Document {
    hero: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        backgroundImage: string;
        overlayColor: string;
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
        title: string;
        description: string;
        mainCard: {
            icon: string;
            title: string;
            description: string;
            tags: string[];
        };
        statsCard: {
            value: string;
            label: string;
            icon: string;
        };
        items: {
            icon: string;
            title: string;
            description: string;
        }[];
    };
    cta: {
        isVisible: boolean;
        title: string;
        description: string;
        imageUrl?: string;
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
    eligibility: {
        isVisible: boolean;
        title: string;
        imageUrl: string;
        steps: {
            step: string;
            title: string;
            description: string;
        }[];
    };
    structure: {
        isVisible: boolean;
        title: string;
        description: string;
        levels: {
            title: string;
            items: string[];
            isOpen: boolean;
        }[];
    };
    mentors: {
        isVisible: boolean;
        title: string;
        description: string;
        teacherIds: mongoose.Types.ObjectId[];
    };
    about: {
        isVisible: boolean;
        badgeText: string;
        title: string;
        description: string;
        imageUrl: string;
        bullets: string[];
        videoUrl?: string;
        stats: {
            value: string;
            label: string;
        }[];
    };
    stats: {
        isVisible: boolean;
        items: {
            label: string;
            title: string;
            icon: string;
        }[];
    };
    pricing: {
        isVisible: boolean;
        title: string;
        description: string;
        note: string;
        columns: string[];
        rows: string[][];
    };
    faqs: {
        isVisible: boolean;
        title: string;
        items: {
            question: string;
            answer: string;
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
        backgroundImage: { type: String, default: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9FjJqV3LRHmwHcLQe9ItyjofWWaT1o2Jqbe7czDifiOabrAClY5HLFErF0sCTZsWusYNTZAD3tVroFtI8yjfzNNaR6A7po5O5jYZLVgieWTTmu1vtgsIFgiGX95hlD42faxTu05p5NfAYXIjd9mVi1Jzhz44d0gB5Z5__EUFq753howoR8ZshPMD9bVr5G5n6-QBYy5XwLjzD7udmOwwqBaaRxxYyEBlCCj5wN17RugzMg_nrMDCE6fmM1w2Rgi-rxL7P7mPTi06F" },
        overlayColor: { type: String, default: "#ffffff" },
        overlayOpacity: { type: Number, default: 10 },
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
    about: {
        isVisible: { type: Boolean, default: true },
        badgeText: { type: String, default: "What is ACCA?" },
        title: { type: String, default: "Global Professional Accountancy Qualification" },
        description: { type: String, default: "ACCA (the Association of Chartered Certified Accountants) is the global body for professional accountants, offering the Chartered Certified Accountant qualification." },
        bullets: {
            type: [String],
            default: [
                "Recognized in 180+ countries worldwide",
                "High employability and career growth",
                "Flexiblility with exams and practical experience",
                "Membership of a global network of 200,000+ members"
            ]
        },
        videoUrl: { type: String, default: "" },
        stats: {
            type: [
                {
                    value: String,
                    label: String
                }
            ],
            default: [
                { value: "180+", label: "Countries Recognized" },
                { value: "200k+", label: "Professional Members" },
                { value: "500k+", label: "Global Students" }
            ]
        }
    },
    stats: {
        isVisible: { type: Boolean, default: true },
        items: {
            type: [
                {
                    label: String,
                    title: String,
                    icon: String
                }
            ],
            default: [
                {
                    label: "Course Levels",
                    title: "3 Comprehensive Stages",
                    icon: "layers"
                },
                {
                    label: "Duration",
                    title: "2.5 to 3 Years",
                    icon: "schedule"
                },
                {
                    label: "Delivery Mode",
                    title: "Hybrid & Classroom",
                    icon: "laptop_mac"
                }
            ]
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
        title: { type: String, default: "Why Seekshya Academy?" },
        description: { type: String, default: "" },
        mainCard: {
            icon: { type: String, default: "military_tech" },
            title: { type: String, default: "Gold Approved Learning Partner" },
            description: { type: String, default: "We maintain the highest standards of tuition and student support as recognized by ACCA global." },
            tags: { type: [String], default: ["Certified Excellence", "Premium Quality"] }
        },
        statsCard: {
            value: { type: String, default: "92%" },
            label: { type: String, default: "Consistent pass rate above the global average." },
            icon: { type: String, default: "analytics" }
        },
        items: {
            type: [{
                icon: { type: String },
                title: { type: String },
                description: { type: String }
            }],
            default: [
                {
                    title: "Internship Assistance",
                    description: "Placement support in top audit firms and corporate houses.",
                    icon: "work_history",
                },
                {
                    title: "Expert Mentors",
                    description: "Learn from industry veterans and qualified chartered accountants.",
                    icon: "groups",
                },
                {
                    title: "Flexible Fees",
                    description: "Affordable installments and scholarship opportunities for deserving students.",
                    icon: "payments",
                },
            ]
        }
    },
    cta: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Start Your CA Journey with Seekshya" },
        description: { type: String, default: "Join the premier institute dedicated to your success in the ICAN examinations. Your future as a Chartered Accountant begins here." },
        imageUrl: { type: String, default: "" },
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
    eligibility: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Eligibility Path" },
        imageUrl: { type: String, default: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXYpUN3HEF4MncjjH6OPB33Bw-y_VO8-qGLNgum9AVPjfx_wc-pcjcLE5wGicGz7SoZU42Iz7yli4BhSbhNDrDF31x77SxC1qu2LF0e2aHbwh5H9Z1qwaMC-eKVCNbjvp60Rf-PExF8H9UHSlReXdK7ww-krAHFar7gQLXhMVCfdBGXBQqjdggBTnqB1eZq7Fo7aAdybVRSZV9QTvoEZ2zpfcaBiCxrZg2yKyle34mG2I9LxmZ_l9UCoD3_FqniTrKXOcKuYL_Hh21" },
        steps: {
            type: [{
                step: String,
                title: String,
                description: String
            }],
            default: [
                {
                    step: "1",
                    title: "+2 Graduates (Science/Mgmt)",
                    description: "Students who have completed +2 can directly join the ACCA Applied Knowledge level.",
                },
                {
                    step: "2",
                    title: "Bachelors/Masters Holders",
                    description: "Eligible for specific exemptions based on previous academic qualifications in commerce.",
                },
                {
                    step: "3",
                    title: "School Leavers (SEE)",
                    description: "Can start via the Foundations in Accountancy (FIA) route to build core competencies.",
                },
            ]
        }
    },
    structure: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Course Structure" },
        description: { type: String, default: "A modular approach to professional excellence" },
        levels: {
            type: [{
                title: String,
                items: [String],
                isOpen: { type: Boolean, default: false }
            }],
            default: [
                {
                    title: "Applied Knowledge Level",
                    items: ["Business and Technology (BT)", "Management Accounting (MA)", "Financial Accounting (FA)"],
                    isOpen: true,
                },
                {
                    title: "Applied Skills Level",
                    items: ["Corporate and Business Law (LW)", "Performance Management (PM)", "Taxation (TX)", "Financial Reporting (FR)", "Audit and Assurance (AA)", "Financial Management (FM)"],
                    isOpen: false
                },
                {
                    title: "Strategic Professional Level",
                    items: ["Strategic Business Leader (SBL)", "Strategic Business Reporting (SBR)", "Optional Professional Papers"],
                    isOpen: false
                },
            ]
        }
    },
    mentors: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Learn from the Best" },
        description: { type: String, default: "Our tutors are qualified experts with years of corporate experience." },
        teacherIds: [{ type: Schema.Types.ObjectId, ref: 'Teacher' }]
    },
    pricing: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Investment in Your Future" },
        description: { type: String, default: "Transparent fee structure for all academic levels." },
        note: { type: String, default: "* ACCA UK fees (Registration & Exams) are subject to exchange rate fluctuations and UK pricing updates." },
        columns: {
            type: [String],
            default: ["Course Level", "Admission Fee", "Registration", "Tuition (Per Paper)"]
        },
        rows: {
            type: [[String]],
            default: [
                ["Applied Knowledge", "NPR 15,000", "£89 (One-time)", "NPR 12,000"],
                ["Applied Skills", "--", "--", "NPR 18,000"],
                ["Strategic Professional", "--", "--", "NPR 25,000"]
            ]
        }
    },
    faqs: {
        isVisible: { type: Boolean, default: true },
        title: { type: String, default: "Frequently Asked Questions" },
        items: {
            type: [{
                question: String,
                answer: String
            }],
            default: [
                {
                    question: "How long does it take to complete ACCA?",
                    answer: "Most students finish ACCA in 2.5 to 3 years, depending on exemptions, pace, and exam scheduling.",
                },
                {
                    question: "Can I work while studying ACCA?",
                    answer: "Yes. ACCA is designed for flexibility, and many students balance part-time work or internships with study.",
                },
                {
                    question: "Does Seekshya Academy provide mock exams?",
                    answer: "Yes. Mock exams, revision plans, and guided feedback are part of the academic support structure.",
                },
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
