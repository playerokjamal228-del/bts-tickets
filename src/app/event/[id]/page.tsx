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
            images: [`/cities/${event.city.toLowerCase()}.png`],
        },
    };
}

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const event = getEventData(id);

    if (!event) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: `BTS Tour 2026 - ${event.city}`,
        startDate: '2026-07-01T19:00', // Approximate
        location: {
            '@type': 'Place',
            name: event.stadium,
            address: {
                '@type': 'PostalAddress',
                addressLocality: event.city,
                addressCountry: event.country
            }
        },
        image: [
            `https://bts-tour.com/cities/${event.city.toLowerCase()}.png`
        ],
        description: `BTS World Tour 2026 live in ${event.city} at ${event.stadium}.`,
        offers: {
            '@type': 'AggregateOffer',
            lowPrice: '100',
            priceCurrency: 'EUR',
            availability: 'https://schema.org/InStock',
            url: `https://bts-tour.com/event/${id}`
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <EventBooking event={event} />
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
}
