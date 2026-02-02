"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const textReviews = [
    {
        id: 1,
        author: "Sophie T.",
        location: "London, UK",
        date: "Feb 1, 2026",
        text: "I was devastated when I missed the general sale. Prices here were higher obviously, but for a sold-out show, it was worth every penny. Tickets are in my account!",
        rating: 5,
        lang: "en"
    },
    {
        id: 2,
        author: "Maximilian S.",
        location: "Munich, Germany",
        date: "Jan 28, 2026",
        text: "Hatte erst Zweifel, aber der Support hat mir alle Fragen beantwortet. Der Transfer über Ticketmaster.de hat perfekt funktioniert. Wir sehen uns in München!",
        rating: 5,
        lang: "de"
    },
    {
        id: 3,
        author: "Camille D.",
        location: "Paris, France",
        date: "Jan 30, 2026",
        text: "Incroyable ! J'ai reçu mes billets pour le Stade de France en moins d'une heure. Service client très réactif sur WhatsApp.",
        rating: 5,
        lang: "fr"
    },
    {
        id: 4,
        author: "Alejandro R.",
        location: "Madrid, Spain",
        date: "Feb 2, 2026",
        text: "Todo perfecto. Las entradas son oficiales y ya las tengo en mi móvil. ¡Qué ganas de que llegue julio!",
        rating: 5,
        lang: "es"
    },
    {
        id: 5,
        author: "Emily W.",
        location: "Manchester, UK",
        date: "Jan 25, 2026",
        text: "Legit site. I was nervous about the 'instant transfer' promise but it really was instant. Got the email 2 mins after checkout.",
        rating: 5,
        lang: "en"
    },
    {
        id: 6,
        author: "Lisa & Tom",
        location: "Berlin, Germany",
        date: "Jan 29, 2026",
        text: "Endlich Tickets!! Vielen Dank für die schnelle Abwicklung. 100% Weiterempfehlung.",
        rating: 5,
        lang: "de"
    }
];

export function TextReviews() {
    return (
        <section className="py-20 bg-black/50 border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h3 className="text-2xl font-bold text-white mb-4">More Fan Experiences</h3>
                    <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {textReviews.map((review, idx) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="w-4 h-4 text-purple-400 fill-purple-400">★</div>
                                    ))}
                                </div>
                                <Quote className="w-8 h-8 text-white/10" />
                            </div>

                            <p className="text-gray-300 text-sm leading-relaxed mb-6 min-h-[80px]">
                                "{review.text}"
                            </p>

                            <div className="flex justify-between items-end border-t border-white/5 pt-4">
                                <div>
                                    <div className="font-semibold text-white">{review.author}</div>
                                    <div className="text-xs text-gray-500">{review.location}</div>
                                </div>
                                <div className="text-xs text-gray-600 font-mono">
                                    {review.date}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
