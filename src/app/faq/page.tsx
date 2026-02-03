"use client";

import { useLanguage } from "@/lib/language-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";

export default function FAQPage() {
    const { t } = useLanguage();

    const faqIds = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"] as const;

    return (
        <div className="min-h-screen bg-secondary text-white font-sans">
            <main className="max-w-4xl mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {t.faqPage.title}
                </h1>
                <p className="text-gray-400 mb-12">
                    {t.faqPage.subtitle}
                </p>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqIds.map((id, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-white/10 bg-white/5 rounded-lg px-4 backdrop-blur-sm data-[state=open]:border-purple-500/50 transition-all"
                        >
                            <AccordionTrigger className="text-left font-medium hover:text-purple-300 hover:no-underline py-6">
                                {t.faqPage.questions[id]}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400 leading-relaxed pb-6">
                                {t.faqPage.questions[`a${id.substring(1)}` as keyof typeof t.faqPage.questions]}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">{t.faqPage.stillQuestions}</h3>
                        <p className="text-gray-400 text-sm">{t.faqPage.supportTeam}</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
