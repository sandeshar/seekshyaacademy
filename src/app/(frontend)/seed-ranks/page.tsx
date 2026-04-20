"use client";

import { useState } from 'react';
import { createStudentRankCategory } from '@/actions/student-rank-categories';
import { createStudentRank } from '@/actions/student-ranks';

export default function SeedRanks() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const seedData = async () => {
        setLoading(true);
        setMessage('Seeding...');
        try {
            // 1. Create Categories (Using dummy values and relying on the action to handle duplicates if it was robust, but here we just catch potential existing ones or provide a better seeder)
            // For a simple seeder, we can just log that we are attempting creation.
            // If they already exist, the error might still trigger unless we handle it in the action or check first.
            let cat1, cat2;

            try {
                cat1 = await createStudentRankCategory({
                    name: 'All Nepal Rank Holder',
                    slug: 'all-nepal-rank-holder-' + Date.now(),
                    status: 'active',
                    order: 1
                });
            } catch (e) {
                console.log("Cat 1 might already exist or failed", e);
            }

            try {
                cat2 = await createStudentRankCategory({
                    name: 'World Rank Holders',
                    slug: 'world-rank-holders-' + Date.now(),
                    status: 'active',
                    order: 2
                });
            } catch (e) {
                console.log("Cat 2 might already exist or failed", e);
            }

            if (!cat1 || !cat2) {
                setMessage('Categories might already exist. Check console.');
            }

            // 2. Create Students for Category 1
            if (cat1?._id) {
                await createStudentRank({
                    name: "Ujjwal Karki",
                    rank: "All Nepal Rank 1 - SBR",
                    description: "The personalized mentorship at Seekshya Academy was instrumental in my success. The tutors don't just teach for exams; they prepare you for the professional world.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbEyXvH6EhEk6ndH3evP92ppbUNkI7UTsbMe9tc13F8zcoRkYtLobXW-1egTGQ80h4QvQeaHafv_C0SzAx06Ke17LjLG8g6XJQtJ_-qdde1FKJSQ41_eSzlFI-7-7uCjRywMC2YHc35gFm4NbzqLSNHZgZivD6DTl0nKJbwsp3lwnzqeU9DctQ7rp0doOtn5OSgr0ZzyV26IIbrGvCLedGsss2khKcu1qhzue78G5LfeR7HHgScpnIgmB9A0xbppz_YFGZVWKdZKs",
                    categoryId: cat1._id,
                    status: 'active',
                    order: 1
                });

                await createStudentRank({
                    name: "Ankit Sharma",
                    rank: "All Nepal Rank 2 - AFM",
                    description: "Seekshya provided the perfect environment for my ACCA journey. The resources and mock exams were exactly what I needed to excel.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_vetSNCcrhFOPJRBW-Ffgpfmko8PJVNqVPGaT-KkyPYKWDGoSxUcd_HvQdeQMB1CGcHK9NzpQYtDDGih9Sw33yul-J5zgeMcZpqWq8lBQeMHyHNxlKzQH3yNbhn7QJX5pBAkpejWjrKlz2SFP1cjFZUbKqugMupOsB0Rb3DWpkZr7j7MLlVLDjooFcGCTGNBU13XYh52Tjhchdzf4ihiY13q6Dt_O5V3EHMwFhNlGUE8mFE9XZSbMy2pVqEGv_F9Q2bJgfdltF4db",
                    categoryId: cat1._id,
                    status: 'active',
                    order: 2
                });
            }

            // 3. Create Students for Category 2
            if (cat2?._id) {
                await createStudentRank({
                    name: "Bijay Chaurasia",
                    rank: "World Rank 1 - SBR",
                    description: "Achieving a world rank was a dream, and Seekshya made it a reality. The depth of knowledge of the faculty is unmatched.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDmbEyXvH6EhEk6ndH3evP92ppbUNkI7UTsbMe9tc13F8zcoRkYtLobXW-1egTGQ80h4QvQeaHafv_C0SzAx06Ke17LjLG8g6XJQtJ_-qdde1FKJSQ41_eSzlFI-7-7uCjRywMC2YHc35gFm4NbzqLSNHZgZivD6DTl0nKJbwsp3lwnzqeU9DctQ7rp0doOtn5OSgr0ZzyV26IIbrGvCLedGsss2khKcu1qhzue78G5LfeR7HHgScpnIgmB9A0xbppz_YFGZVWKdZKs",
                    categoryId: cat2._id,
                    status: 'active',
                    order: 1
                });

                await createStudentRank({
                    name: "Pooja Gupta",
                    rank: "World Rank 3 - TAX",
                    description: "The support system at Seekshya Academy is incredible. From study materials to doubt-clearing sessions, everything was top-notch.",
                    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_vetSNCcrhFOPJRBW-Ffgpfmko8PJVNqVPGaT-KkyPYKWDGoSxUcd_HvQdeQMB1CGcHK9NzpQYtDDGih9Sw33yul-J5zgeMcZpqWq8lBQeMHyHNxlKzQH3yNbhn7QJX5pBAkpejWjrKlz2SFP1cjFZUbKqugMupOsB0Rb3DWpkZr7j7MLlVLDjooFcGCTGNBU13XYh52Tjhchdzf4ihiY13q6Dt_O5V3EHMwFhNlGUE8mFE9XZSbMy2pVqEGv_F9Q2bJgfdltF4db",
                    categoryId: cat2._id,
                    status: 'active',
                    order: 2
                });
            }

            setMessage('Seeding successful (or categories already existence)!');
        } catch (error: any) {
            console.error(error);
            setMessage('Error seeding: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-10 text-center">
            <h1 className="text-2xl font-bold mb-4">Seed Success Stories</h1>
            <button
                onClick={seedData}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
            >
                {loading ? 'Seeding...' : 'Seed Data'}
            </button>
            {message && <p className="mt-4 font-medium">{message}</p>}
        </div>
    );
}
