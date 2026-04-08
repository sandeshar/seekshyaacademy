import TeacherForm from "../../_components/TeacherForm";

export default async function EditTeacherPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Teacher</h1>
                <p className="text-gray-500">Update teacher information and profile.</p>
            </div>
            <TeacherForm id={id} />
        </div>
    );
}

