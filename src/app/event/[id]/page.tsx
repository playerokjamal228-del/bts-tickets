import { EventBooking } from "@/components/EventBooking";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { getEventData } from "@/lib/data";

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = getEventData(id);

    if (!event) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-secondary flex flex-col">
            <EventBooking event={event} />
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
