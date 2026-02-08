import { EventBooking } from "@/components/EventBooking";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { getEventData } from "@/lib/data";


import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const event = getEventData(id);

    if (!event) {
        return {
            title: "Event Not Found | BTS Tour 2026",
        };
    }

    return {
        title: `BTS Tickets ${event.city} | ${event.stadium} - Official Sales 2026`,
        description: `Buy official tickets for BTS at ${event.stadium}, ${event.city}. ${event.date}. Secure payment, instant delivery.`,
        openGraph: {
            title: `BTS Tickets ${event.city} 2026`,
            description: `Join the purple ocean at ${event.stadium}!`,
            images: [`/cities/${event.city.toLowerCase()}.jpg`],
        },
        robots: {
            index: false,
            follow: false,
            googleBot: {
                index: false,
                follow: false,
            },
        },
    };
}

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
