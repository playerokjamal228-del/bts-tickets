"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle, ChevronLeft, ChevronRight, Play, Pause, X, Maximize2 } from "lucide-react";

const reviews = [
    {
        id: 1,
        author: "Sarah J.",
        location: "London, UK",
        rating: 5,
        text: "I recorded this just to show my friends that it actually worked! 😭 Transfer was instant. Select, send, done. Tickets are safely in my Ticketmaster app now.",
        mediaType: "video",
        mediaSrc: "/reviews/video-london-transfer.mp4",
        ticketType: "Sec 105, Row 9"
    },
    {
        id: 7,
        author: "Jessica & Co.",
        location: "London, UK",
        rating: 5,
        text: "Tickets secured for 2026!! The view from Sec 119 looks insane on the map. Transfer was super smooth, already have them in my Apple Wallet. Ready for summer! 💜",
        mediaType: "video",
        mediaSrc: "/reviews/LONDON_4.mp4",
        ticketType: "Sec 119, Row 24, Seats 8-11"
    },
    {
        id: 2,
        author: "Helena M.",
        location: "Munich, Germany",
        rating: 5,
        text: "Best email notification EVER. Woke up to find my tickets were successfully transferred. Smooth communication, no stress. Thank you!",
        mediaType: "image",
        mediaSrc: "/reviews/screen-helena-email.jpg",
        ticketType: "Ticketmaster Transfer"
    },
    {
        id: 3,
        author: "Lukas & Marie",
        location: "Munich, Germany",
        rating: 5,
        text: "Endlich sicher dabei in München! Hatte Sorge wegen Fakeshops, aber hier lief alles über den offiziellen Ticketmaster-Transfer. Sehr seriöse Abwicklung!",
        mediaType: "image",
        mediaSrc: "/reviews/screen-munich-blue.jpg",
        ticketType: "Sec 102 (Allianz Arena)"
    },
    {
        id: 4,
        author: "Ashley K.",
        location: "London, UK",
        rating: 5,
        text: "Legit!! Just got the 'You Got Em' email. I missed out on the general sale and was panicking, but this saved me. Expensive but worth it for the peace of mind.",
        mediaType: "image",
        mediaSrc: "/reviews/screen-stanford-email.jpg",
        ticketType: "Sec 102, Seats 29-30"
    },
    {
        id: 5,
        author: "Tobias",
        location: "Munich, Germany",
        rating: 5,
        text: "Der Transfer-Prozess war kinderleicht. Link bekommen, akzeptiert und zack – die Tickets waren auf meinem Handy. Kein PDF-Quatsch, echte Mobile Tickets.",
        mediaType: "image",
        mediaSrc: "/reviews/screen-transfer-selection.jpg",
        ticketType: "Sec 232 Reserved"
    },
    {
        id: 6,
        author: "Chloe",
        location: "Brussels, Belgium",
        rating: 5,
        text: "Sorted the whole squad for Brussels! Was worried about buying 4 tickets at once, but they all arrived in my account together. Recommended.",
        mediaType: "image",
        mediaSrc: "/reviews/screen-brussels-list.jpg",
        ticketType: "4x Standing Floor"
    }
];

// Star rating display
function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                />
            ))}
        </div>
    );
}

// Single review card
function ReviewCard({ review, onExpand }: { review: typeof reviews[0], onExpand: (src: string, type: string) => void }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.div
            className="flex-shrink-0 w-[300px] md:w-[320px] bg-white/5 backdrop-blur-md rounded-3xl p-3 border border-white/10 hover:border-purple-500/30 transition-colors group/card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
        >
            {/* Minimalist Media Container */}
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-gray-900 shadow-inner group/media">
                {review.mediaType === "video" ? (
                    <div className="relative w-full h-full">
                        <video
                            ref={videoRef}
                            src={review.mediaSrc}
                            className="w-full h-full object-cover"
                            loop
                            muted
                            playsInline
                        // No poster as requested
                        />
                        <button
                            onClick={toggleVideo}
                            className={`absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/10 transition-colors ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
                        >
                            {isPlaying ? (
                                <Pause className="w-14 h-14 text-white drop-shadow-lg" />
                            ) : (
                                <Play className="w-14 h-14 text-white fill-white drop-shadow-lg" />
                            )}
                        </button>
                    </div>
                ) : (
                    <Image
                        src={review.mediaSrc}
                        alt={`Review from ${review.author}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 300px, 320px"
                    />
                )}

                {/* Expand Button / Overlay - Only for images to not block video controls */}
                {review.mediaType !== "video" && (
                    <button
                        onClick={() => onExpand(review.mediaSrc, review.mediaType)}
                        className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100 group-hover/media:opacity-100 transition-opacity duration-300 pointer-events-none group-hover/media:pointer-events-auto"
                    >
                        <Maximize2 className="w-10 h-10 text-white drop-shadow-xl transform scale-90 hover:scale-100 transition-transform" />
                    </button>
                )}

                {/* Gradient Overlay for text readability on top of image */}
                <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>

            {/* Review content */}
            <div className="mt-4 px-1 space-y-3">
                {/* Header with verified badge */}
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-white tracking-wide">{review.author}</span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-green-400 bg-green-900/30 px-2 py-0.5 rounded-full border border-green-500/20">
                                <CheckCircle className="w-3 h-3" />
                                VERIFIED
                            </span>
                        </div>
                        <p className="text-xs text-purple-300 font-medium mt-0.5">{review.location}</p>
                    </div>
                    {/* Compact Rating */}
                    <div className="bg-white/5 px-2 py-1 rounded-lg">
                        <StarRating rating={review.rating} />
                    </div>
                </div>

                {/* Ticket type badge */}
                <div className="inline-block text-xs font-mono text-gray-300 bg-white/5 border border-white/10 px-2 py-1 rounded">
                    🎟️ {review.ticketType}
                </div>

                {/* Review text */}
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-4 font-light">
                    &ldquo;{review.text}&rdquo;
                </p>
            </div>
        </motion.div>
    );
}

export function ReviewsCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [expandedMedia, setExpandedMedia] = useState<{ src: string, type: string } | null>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 340;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="py-20 md:py-32 bg-secondary overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient-x">ARMY</span> Worldwide
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Real fans, real tickets, real memories.
                    </p>
                </motion.div>

                {/* Carousel container */}
                <div className="relative group/carousel">
                    {/* Navigation buttons */}
                    <button
                        onClick={() => scroll("left")}
                        className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-20 p-4 bg-zinc-900/80 border border-white/20 hover:bg-purple-600 hover:border-purple-500 rounded-full backdrop-blur-xl transition-all hidden md:flex items-center justify-center shadow-2xl group active:scale-95 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                        aria-label="Scroll left"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-20 p-4 bg-zinc-900/80 border border-white/20 hover:bg-purple-600 hover:border-purple-500 rounded-full backdrop-blur-xl transition-all hidden md:flex items-center justify-center shadow-2xl group active:scale-95 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                        aria-label="Scroll right"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Scrollable reviews */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory px-4 md:px-0"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {reviews.map((review) => (
                            <div key={review.id} className="snap-center">
                                <ReviewCard
                                    review={review}
                                    onExpand={(src, type) => setExpandedMedia({ src, type })}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Mobile scroll hint */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-secondary to-transparent pointer-events-none md:hidden" />
                </div>

                {/* Bottom trust indicators */}
                <motion.div
                    className="mt-8 pt-8 border-t border-white/5 flex flex-wrap justify-center gap-8 md:gap-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="group cursor-default">
                        <div className="text-4xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">150+</div>
                        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Transfers</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-4xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">100%</div>
                        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Verified</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-4xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">4.9/5</div>
                        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Rating</div>
                    </div>
                    <div className="group cursor-default">
                        <div className="text-4xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">24/7</div>
                        <div className="text-sm font-medium text-gray-400 uppercase tracking-widest">Support</div>
                    </div>
                </motion.div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {expandedMedia && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setExpandedMedia(null)}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
                    >
                        <motion.button
                            className="absolute top-4 right-4 p-2 text-white hover:text-purple-400 z-[101]"
                            onClick={(e) => { e.stopPropagation(); setExpandedMedia(null); }}
                        >
                            <X className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[90vh] w-full rounded-2xl overflow-hidden shadow-2xl bg-black"
                        >
                            {expandedMedia.type === "video" ? (
                                <video
                                    src={expandedMedia.src}
                                    className="w-full h-full max-h-[85vh] object-contain"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <div className="relative w-full h-[80vh]">
                                    <Image
                                        src={expandedMedia.src}
                                        alt="Expanded review"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
