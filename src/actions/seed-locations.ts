import dbConnect from "@/db/db";
import Location from "@/db/locations";

export const seedLocations = async () => {
    await dbConnect();

    const existingCount = await Location.countDocuments();
    if (existingCount > 0) {
        return { success: false, message: "Locations alreadyExist. Skipping seed." };
    }

    const locations = [
        {
            name: "Kathmandu Central Branch",
            slug: "kathmandu-central",
            address: "Putalisadak, Kathmandu, Nepal",
            phone: "+977-1-4412345",
            email: "ktm@seekshya.com",
            mapUrl: "https://maps.google.com",
            image: "https://images.unsplash.com/photo-1544971587-b842c27f8e14?auto=format&fit=crop&q=80&w=1000",
            content: "<h2>Welcome to our Central Branch</h2><p>Seekshya Academy's Kathmandu Central Branch is located in the heart of the city, providing world-class education facilities and expert faculty for students pursuing various competitive exams and professional courses.</p><p>Our facilities include:</p><ul><li>Spacious Classrooms</li><li>Digital Library</li><li>Canteen</li><li>Career Counseling Center</li></ul>",
            status: "published",
            isMainBranch: true,
            seo: {
                title: "Best Academy in Kathmandu | Seekshya Academy",
                description: "Seekshya Academy Kathmandu Branch offers top-tier coaching and resources for your academic success.",
                keywords: "academy, kathmandu, coaching, seekshya"
            }
        },
        {
            name: "Pokhara Lakeside Campus",
            slug: "pokhara-lakeside",
            address: "Lakeside, Pokhara, Nepal",
            phone: "+977-61-554433",
            email: "pokhara@seekshya.com",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
            content: "<h2>Eduation Amidst Nature</h2><p>Our Pokhara branch offers a serene learning environment perfect for students who want to focus on their studies away from the hustle of the capital.</p><p>Known for its excellent faculty and high success rate in engineering entrance preparations.</p>",
            status: "published",
            isMainBranch: false,
            seo: {
                title: "Seekshya Academy Pokhara | Lakeside Campus",
                description: "Located in beautiful Pokhara, our campus provides the perfect environment for focused learning.",
                keywords: "pokhara, academy, engineering, entrance"
            }
        },
        {
            name: "Lalitpur Innovation Center",
            slug: "lalitpur-innovation",
            address: "Jawalakhel, Lalitpur, Nepal",
            phone: "+977-1-5522110",
            email: "lalitpur@seekshya.com",
            image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000",
            content: "<h2>Focus on Innovation</h2><p>The Lalitpur branch focuses on IT and Management related courses, equipped with the latest computer labs and high-speed internet.</p>",
            status: "draft",
            isMainBranch: false,
            seo: {
                title: "IT & Management Academy Lalitpur | Seekshya",
                description: "The best IT and Management coaching in Lalitpur.",
                keywords: "lalitpur, it, management, coaching"
            }
        }
    ];

    await Location.insertMany(locations);
    return { success: true, message: `Successfully seeded ${locations.length} locations.` };
};
