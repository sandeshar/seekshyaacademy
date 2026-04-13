import dbConnect from "@/db/db";
import Homepage from "@/db/homepage";
import { headers } from "next/headers";

export default async function SeedStatsPage() {
    // Access headers to opt-out of static rendering 
    // and allow DB operations at runtime
    await headers();

    await dbConnect();

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

    let home = await Homepage.findOne();
    let result = "";
    if (home) {
        // Force update regardless of existing state
        home.stats = statsData;
        home.about = aboutData;
        home.markModified('stats');
        home.markModified('about');
        await home.save();
        result = "Updated existing homepage document!";
    } else {
        await Homepage.create({
            stats: statsData,
            about: aboutData,
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
            <div className="mt-6 flex gap-4">
                <a href="/" className="px-6 py-2 bg-primary text-white rounded-lg">Go to Homepage</a>
                <a href="/dashboard/homepage" className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg">Go to CMS</a>
            </div>
        </div>
    );
}
