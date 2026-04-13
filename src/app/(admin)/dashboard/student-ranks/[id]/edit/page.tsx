import StudentRankForm from "../../_components/StudentRankForm";

export default async function EditStudentRankPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Student Rank</h1>
                <p className="text-gray-500">Update student rank information.</p>
            </div>
            <StudentRankForm id={id} />
        </div>
    );
}
