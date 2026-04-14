import dbConnect from "@/db/db";
import Homepage from "@/db/homepage";
import Teacher from "@/db/teachers";
import { headers } from "next/headers";

export default async function SeedStatsPage() {
    // Access headers to opt-out of static rendering 
    // and allow DB operations at runtime
    await headers();

    await dbConnect();

    // Find first 3 teachers to seed mentors
    const teacherDocs = await Teacher.find({ status: 'active' }).limit(3).lean();
    const teacherIds = teacherDocs.map(t => t._id);

    const statsData = {
        isVisible: true,
        items: [
            {
                label: "Course Levels",
                title: "3 Comprehensive Stages",
                icon: "layers",
            },
            {
                label: "Duration",
                title: "2.5 to 3 Years",
                icon: "schedule",
            },
            {
                label: "Delivery Mode",
                title: "Hybrid & Classroom",
                icon: "laptop_mac",
            },
        ],
    };

    const aboutData = {
        isVisible: true,
        badgeText: "What is ACCA?",
        title: "Global Professional Accountancy Qualification",
        description: "ACCA (the Association of Chartered Certified Accountants) is the global body for professional accountants, offering business-relevant, first-choice qualifications to people of ambition worldwide.",
        bullets: [
            "Recognized in 180+ countries worldwide",
            "High employability and career growth",
            "Flexibility with exams and practical experience",
            "Membership of a global network of 200,000+ members"
        ],
        stats: [
            { value: "180+", label: "Countries Recognized" },
            { value: "200k+", label: "Professional Members" },
            { value: "500k+", label: "Global Students" }
        ]
    };

    const whyData = {
        isVisible: true,
        title: "Why Seekshya Academy?",
        description: "",
        mainCard: {
            icon: "military_tech",
            title: "Gold Approved Learning Partner",
            description: "We maintain the highest standards of tuition and student support as recognized by ACCA global.",
            tags: ["Certified Excellence", "Premium Quality"]
        },
        statsCard: {
            value: "92%",
            label: "Consistent pass rate above the global average.",
            icon: "analytics"
        },
        items: [
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
    };

    const eligibilityData = {
        isVisible: true,
        title: "Eligibility Path",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXYpUN3HEF4MncjjH6OPB33Bw-y_VO8-qGLNgum9AVPjfx_wc-pcjcLE5wGicGz7SoZU42Iz7yli4BhSbhNDrDF31x77SxC1qu2LF0e2aHbwh5H9Z1qwaMC-eKVCNbjvp60Rf-PExF8H9UHSlReXdK7ww-krAHFar7gQLXhMVCfdBGXBQqjdggBTnqB1eZq7Fo7aAdybVRSZV9QTvoEZ2zpfcaBiCxrZg2yKyle34mG2I9LxmZ_l9UCoD3_FqniTrKXOcKuYL_Hh21",
        steps: [
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
    };

    const structureData = {
        isVisible: true,
        title: "Course Structure",
        description: "A modular approach to professional excellence",
        levels: [
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
    };

    const mentorData = {
        isVisible: true,
        title: "Learn from the Best",
        description: "Our tutors are qualified experts with years of corporate experience.",
        teacherIds: teacherIds
    };

    let home = await Homepage.findOne();
    let result = "";
    if (home) {
        // Force update regardless of existing state
        home.stats = statsData;
        home.about = aboutData;
        home.whyChooseUs = whyData;
        home.eligibility = eligibilityData;
        home.structure = structureData;
        home.mentors = mentorData;
        home.markModified('stats');
        home.markModified('about');
        home.markModified('whyChooseUs');
        home.markModified('eligibility');
        home.markModified('structure');
        home.markModified('mentors');
        await home.save();
        result = "Updated existing homepage document!";
    } else {
        await Homepage.create({
            stats: statsData,
            about: aboutData,
            whyChooseUs: whyData,
            eligibility: eligibilityData,
            structure: structureData,
            mentors: mentorData
        });
        result = "Created brand new homepage document!";
    }

    return (
        <div className="p-10 font-sans">
            <h1 className="text-2xl font-bold mb-2 text-green-600">Seeding Result: {result}</h1>
            <p className="text-gray-600 mb-6">Database Location: {process.env.MONGODB_URI || "Localhost"}</p>
            <div className="bg-gray-50 p-6 rounded-xl border mb-6">
                <h3 className="font-bold mb-2">Stats to add:</h3>
                <pre className="text-xs">{JSON.stringify(statsData, null, 2)}</pre>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border mb-6">
                <h3 className="font-bold mb-2">About to add:</h3>
                <pre className="text-xs">{JSON.stringify(aboutData, null, 2)}</pre>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl border mb-6">
                <h3 className="font-bold mb-2">Why Choose Us to add:</h3>
                <pre className="text-xs">{JSON.stringify(whyData, null, 2)}</pre>
            </div>
            <div className="mt-6 flex gap-4">
                <a href="/" className="px-6 py-2 bg-primary text-white rounded-lg">Go to Homepage</a>
                <a href="/dashboard/homepage" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg">Go to CMS</a>
            </div>
        </div>
    );
}
