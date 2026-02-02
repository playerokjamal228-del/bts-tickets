"use client";

import { useLanguage } from "@/lib/language-context";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Footer } from "@/components/Footer";

export default function FAQPage() {
    const { t } = useLanguage();

    const faqItems = [
        {
            question: "How will I receive my tickets?",
            answer: "All tickets are delivered digitally via Ticketmaster Transfer or the official stadium app (e.g., Stade de France App). Once your purchase is confirmed, you will receive an email with a link to accept your tickets directly into your secure account. This is the safest method to ensure authenticity."
        },
        {
            question: "How does the Ticketmaster Transfer work?",
            answer: "It's safe, instant, and official. 1) You receive an email from Ticketmaster with an 'Accept Tickets' link. 2) Click the link and log in to your Ticketmaster account (or create one). 3) The tickets are legally transferred to your name and stay in your account forever. No PDFs, just secure mobile tickets."
        },
        {
            question: "Are the tickets authentic?",
            answer: "Yes. We offer a 100% Buyer Guarantee. Every ticket sold on our platform is verified and transferred directly from the original issuer. You are guaranteed entry to the event, or we will provide a full refund of 150% of your order value."
        },
        {
            question: "When will I get my tickets?",
            answer: "Due to the event organizer's anti-scalping rules, barcodes are typically released 3-7 days before the concert. Don't worry — your order is confirmed immediately, and we will keep you updated via email at every step."
        },
        {
            question: "Is my payment secure?",
            answer: "Absolutely. We use industry-standard 256-bit SSL encryption and process payments via Stripe and Adyen. We do not store your credit card information. We also support protected payment methods like PayPal and Apple Pay."
        },
        {
            question: "Can I sit together with my friends?",
            answer: "Yes. If you buy multiple tickets in a single order (e.g., 2 or 4 tickets), they are guaranteed to be seated together side-by-side."
        }
    ];

    return (
        <div className="min-h-screen bg-secondary text-white font-sans">
            <main className="max-w-4xl mx-auto px-4 py-24">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Frequently Asked Questions
                </h1>
                <p className="text-gray-400 mb-12">
                    Find answers to common questions about tickets, delivery, and authenticity.
                </p>

                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqItems.map((item, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="border border-white/10 bg-white/5 rounded-lg px-4 backdrop-blur-sm data-[state=open]:border-purple-500/50 transition-all"
                        >
                            <AccordionTrigger className="text-left font-medium hover:text-purple-300 hover:no-underline py-6">
                                {item.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400 leading-relaxed pb-6">
                                {item.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
                        <p className="text-gray-400 text-sm">Our support team is available 24/7 to assist you.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
