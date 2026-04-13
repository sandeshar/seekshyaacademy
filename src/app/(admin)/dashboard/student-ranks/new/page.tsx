import StudentRankForm from "../_components/StudentRankForm";

export default function NewStudentRankPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Student Rank</h1>
                <p className="text-gray-500">Create a new student achievement entry.</p>
            </div>
            <StudentRankForm />
        </div>
    );
}
