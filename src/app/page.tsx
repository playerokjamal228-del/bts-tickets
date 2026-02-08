"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { TextReviews } from "@/components/TextReviews";
import { Footer } from "@/components/Footer";
import { DateSelectModal } from "@/components/DateSelectModal";
import { ComparisonBlock } from "@/components/ComparisonBlock";

import { useLanguage } from "@/lib/language-context";
import { useState, useRef } from "react";

// Mock data for initial UI (matches seed data)
const TOUR_SCHEDULE = [
  {
    id: "belgium",
    country: "Belgium",
    city: "Brussels",
    stadium: "King Baudouin Stadium",
    dates: ["July 01", "July 02"],
  },
  {
    id: "uk",
    country: "UK",
    city: "London",
    stadium: "Wembley Stadium",
    dates: ["July 06", "July 07"],
  },
  {
    id: "germany",
    country: "Germany",
    city: "Munich",
    stadium: "Allianz Arena",
    dates: ["July 11", "July 12"],
  },
  {
    id: "france",
    country: "France",
    city: "Paris",
    stadium: "Stade de France",
    dates: ["July 17", "July 18"],
  },
  {
    id: "spain",
    country: "Spain",
    city: "Madrid",
    stadium: "Santiago Bernabéu",
    dates: ["July 26", "July 27"],
  },
];

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState<typeof TOUR_SCHEDULE[0] | null>(null);
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-white font-sans">


      {/* Date Selection Modal */}
      <DateSelectModal
        isOpen={!!selectedLocation}
        onClose={() => setSelectedLocation(null)}
        city={selectedLocation?.city || ""}
        eventId={selectedLocation?.id || ""}
        dates={selectedLocation?.dates || []}
      />

      {/* Hero Section */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/hero.png"
            alt="BTS Concert Crowd"
            fill
            className="object-cover opacity-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-pink-900/30" />
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-purple-300 border border-purple-500/30 mb-6">
            <Sparkles className="w-4 h-4" />
            {t.hero.ticketsOnSale}
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
            {t.hero.title}
          </h1>
          <p className="text-4xl md:text-6xl font-bold text-purple-400 mb-6">{t.hero.year}</p>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 font-light">
            {t.hero.subtitle}
            <br />
            <span className="text-purple-300">{t.hero.purpleOcean}</span>
          </p>

          <a href="#locations">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-lg px-10 py-7 rounded-full shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(168,85,247,0.7)] font-semibold"
            >
              {t.hero.getTickets}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Tour Locations */}
      <section id="locations" className="py-24 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto relative overflow-x-clip">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 tracking-tight">
          TOUR <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.tour.locations}</span>
        </h2>
        <p className="text-gray-400 text-center mb-16 max-w-xl mx-auto">
          {t.tour.chooseCity}
        </p>

        {/* Improved single-row horizontal scroll layout */}
        <div className="relative group/container">
          {/* Scroll Buttons - Desktop Only */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute -left-6 lg:-left-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 backdrop-blur border border-white/20 rounded-full items-center justify-center text-white hover:bg-purple-600 hover:border-purple-500 transition-all hover:scale-110 shadow-xl"
            aria-label="Scroll left"
          >
            <ArrowRight className="w-6 h-6 rotate-180" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute -right-6 lg:-right-16 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/80 backdrop-blur border border-white/20 rounded-full items-center justify-center text-white hover:bg-purple-600 hover:border-purple-500 transition-all hover:scale-110 shadow-xl"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory px-4 md:px-0 -mx-4 md:mx-0 no-scrollbar items-stretch scroll-smooth"
          >
            {TOUR_SCHEDULE.map((loc, index) => (
              <div
                key={loc.id}
                className="group cursor-pointer min-w-[300px] md:min-w-[350px] flex-shrink-0 snap-center"
                onClick={() => setSelectedLocation(loc)}
              >
                <Card className="h-full border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-20px_rgba(168,85,247,0.4)] hover:border-purple-500/50 overflow-hidden flex flex-col">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="h-56 relative overflow-hidden">
                      {/* City Image */}
                      <Image
                        src={`/cities/${loc.city.toLowerCase()}.png`}
                        alt={`${loc.city} Stadium`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 2}
                        quality={75}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Animated gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-white/20 z-10">
                        {loc.dates.length} {t.tour.dates}
                      </div>

                      <div className="absolute bottom-4 left-4 z-10 text-shadow">
                        <h3 className="text-3xl font-bold text-white mb-0 leading-none">
                          {loc.city}
                        </h3>
                        <p className="text-purple-300 font-medium">{loc.country}</p>
                      </div>
                    </div>
                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-zinc-900/40">
                      <div>
                        <div className="flex items-center text-gray-300 text-sm mb-3">
                          <MapPin className="w-4 h-4 mr-2 text-purple-400 flex-shrink-0" />
                          {loc.stadium}
                        </div>
                        <div className="flex items-start text-gray-400 text-sm">
                          <Calendar className="w-4 h-4 mr-2 text-purple-400 mt-1 flex-shrink-0" />
                          <div className="flex flex-wrap gap-2">
                            {loc.dates.map((date) => (
                              <span
                                key={date}
                                className="bg-purple-500/20 px-2 py-1 rounded text-purple-200 text-xs whitespace-nowrap"
                              >
                                {date}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 flex justify-between items-center text-purple-400 font-semibold group-hover:text-pink-400 transition-colors border-t border-white/5 mt-4">
                        {t.tour.selectTickets}
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Scroll Hint Gradient */}
          <div className="absolute right-0 top-0 bottom-8 w-12 bg-gradient-to-l from-secondary/80 to-transparent pointer-events-none md:hidden" />
        </div>
      </section>

      {/* Comparison Section */}
      <ComparisonBlock />

      {/* Reviews Section */}
      <ReviewsCarousel />
      <TextReviews />

      {/* Footer */}
      <Footer />
    </div>
  );
}
