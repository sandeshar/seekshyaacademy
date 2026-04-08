import NoticeForm from "../../_components/NoticeForm";

export default async function EditNoticePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <NoticeForm id={id} />;
}
