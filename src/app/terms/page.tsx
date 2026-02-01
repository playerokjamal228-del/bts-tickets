"use client";

import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-secondary text-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Terms of Service
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-sm text-gray-500">Last updated: January 2026</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
                        <p>By accessing and using BTS Tour 2026 ticket services, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. Ticket Purchases</h2>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>All ticket sales are final and non-transferable unless otherwise stated</li>
                            <li>Tickets are subject to availability</li>
                            <li>Maximum purchase limit applies per customer</li>
                            <li>Resale of tickets at inflated prices is prohibited</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Payment Terms</h2>
                        <p>We accept bank transfers and approved payment methods. Full payment is required at the time of purchase. All prices are in EUR and include applicable taxes.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Event Changes</h2>
                        <p>Event dates, times, and venues are subject to change. In case of cancellation:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Full refund will be processed within 14 business days</li>
                            <li>Rescheduled events: original tickets remain valid</li>
                            <li>Venue changes: original tickets remain valid</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. User Conduct</h2>
                        <p>You agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Use automated systems to purchase tickets</li>
                            <li>Provide false or misleading information</li>
                            <li>Attempt to circumvent security measures</li>
                            <li>Use the service for any unlawful purpose</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Limitation of Liability</h2>
                        <p>Our liability is limited to the ticket price paid. We are not responsible for any consequential damages, lost profits, or other indirect losses.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">7. Contact</h2>
                        <p>For questions about these terms, contact: <a href="mailto:legal@bts-tour.eu" className="text-purple-400 hover:text-purple-300">legal@bts-tour.eu</a></p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
