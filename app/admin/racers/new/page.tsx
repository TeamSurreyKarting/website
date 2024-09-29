import NewRacerForm from "@/app/components/admin/racers/form";

export default function Page() {
    return (
        <>
            <h1 className="text-2xl flex-1">New Racer</h1>
            <hr className="my-6" />
            <NewRacerForm />
        </>
    );
}
