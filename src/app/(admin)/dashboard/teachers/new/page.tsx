import TeacherForm from "../_components/TeacherForm";

export default function NewTeacherPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Teacher</h1>
                <p className="text-gray-500">Create a new faculty profile for your website.</p>
            </div>
            <TeacherForm />
        </div>
    );
}

