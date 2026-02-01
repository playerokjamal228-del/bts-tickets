"use client";

import { useState } from "react";
import { Star, CheckCircle, ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

interface Review {
    id: number;
    name: string;
    location: string;
    text: string;
    rating: number;
    verified: boolean;
    lang: string;
}

const reviews: Review[] = [
    // English Reviews
    {
        id: 1,
        name: "Anna K.",
        location: "Berlin",
        text: "Website didn't crash during the sale! Got VIP in 2 minutes. Thank you!",
        rating: 5,
        verified: true,
        lang: "en",
    },
    {
        id: 2,
        name: "Sophie L.",
        location: "London",
        text: "The seat map is amazing! I could see exactly where my view would be. 10/10",
        rating: 5,
        verified: true,
        lang: "en",
    },
    // German Reviews
    {
        id: 3,
        name: "Lena M.",
        location: "München",
        text: "Endlich eine Ticket-Seite, die nicht abstürzt! Tickets in 30 Sekunden gekauft 💜",
        rating: 5,
        verified: true,
        lang: "de",
    },
    {
        id: 4,
        name: "Julia F.",
        location: "Hamburg",
        text: "Super übersichtlich und einfach zu bedienen. Die Stadionkarte ist sehr hilfreich!",
        rating: 5,
        verified: true,
        lang: "de",
    },
    // French Reviews
    {
        id: 5,
        name: "Chloé D.",
        location: "Paris",
        text: "Super pratique la carte du stade, facile de comprendre où on sera assis. Meilleure expérience!",
        rating: 5,
        verified: true,
        lang: "fr",
    },
    {
        id: 6,
        name: "Marie B.",
        location: "Lyon",
        text: "Site rapide et fiable. J'ai eu mes billets VIP sans stress! Merci 💜",
        rating: 5,
        verified: true,
        lang: "fr",
    },
    // Spanish Reviews
    {
        id: 7,
        name: "María S.",
        location: "Madrid",
        text: "¡Por fin un sitio de tickets que no se cuelga! Conseguí mis entradas en menos de un minuto 💜",
        rating: 5,
        verified: true,
        lang: "es",
    },
    {
        id: 8,
        name: "Carmen R.",
        location: "Barcelona",
        text: "El mapa del estadio es increíble. Pude ver exactamente dónde estaría mi asiento. ¡Perfecto!",
        rating: 5,
        verified: true,
        lang: "es",
    },
    // More reviews
    {
        id: 9,
        name: "Emma W.",
        location: "Amsterdam",
        text: "Best ticket buying experience ever! The interactive map made choosing seats so easy.",
        rating: 5,
        verified: true,
        lang: "en",
    },
    {
        id: 10,
        name: "Lisa H.",
        location: "Wien",
        text: "Schneller Support und sichere Zahlung. Kann ich nur weiterempfehlen!",
        rating: 5,
        verified: true,
        lang: "de",
    },
];

export function Reviews() {
    const { t } = useLanguage();
    const [showAll, setShowAll] = useState(false);

    const visibleReviews = showAll ? reviews : reviews.slice(0, 4);

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {t.reviews.trustedBy} <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.reviews.worldwide}</span> Worldwide
                    </h2>
                    <p className="text-gray-400">{t.reviews.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {visibleReviews.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-4">
                                {Array.from({ length: review.rating }).map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-purple-400 text-purple-400" />
                                ))}
                            </div>

                            {/* Quote */}
                            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                                "{review.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-white font-medium text-sm">{review.name}</span>
                                        {review.verified && (
                                            <CheckCircle className="w-4 h-4 text-purple-400" />
                                        )}
                                    </div>
                                    <span className="text-gray-500 text-xs">{review.location}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Show More Button */}
                {!showAll && reviews.length > 4 && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAll(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-full text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                        >
                            Show More Reviews
                            <ChevronDown className="w-4 h-4" />
                        </button>
                    </div>
                )}

                {showAll && (
                    <div className="text-center mt-10">
                        <button
                            onClick={() => setShowAll(false)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-full text-white font-medium transition-all duration-300"
                        >
                            Show Less
                            <ChevronDown className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
