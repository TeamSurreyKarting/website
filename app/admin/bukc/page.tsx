import Breadcrumbs from "@/app/components/ui/Breadcrumbs";

export default function Page() {
    const breadcrumbs = [
        { label: "BUKC", href: "/admin/bukc", active: true },
    ]

    return (
        <>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
        </>
    );
}