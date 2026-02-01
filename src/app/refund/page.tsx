"use client";

import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-secondary text-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Refund Policy
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-sm text-gray-500">Last updated: January 2026</p>

                    <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6 mb-6">
                        <h3 className="text-lg font-semibold text-purple-300 mb-2">Important Notice</h3>
                        <p className="text-gray-300">All ticket sales are final. Refunds are only available in specific circumstances outlined below.</p>
                    </div>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Event Cancellation</h2>
                        <p>If an event is cancelled and not rescheduled:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Full refund will be processed automatically</li>
                            <li>Refunds are issued to the original payment method</li>
                            <li>Processing time: 7-14 business days</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Event Rescheduling</h2>
                        <p>If an event is rescheduled to a new date:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Your original tickets remain valid for the new date</li>
                            <li>Refund requests accepted within 14 days of announcement</li>
                            <li>Contact support with your order number</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">No Refund Situations</h2>
                        <p>Refunds are NOT available for:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Change of mind or personal circumstances</li>
                            <li>Inability to attend the event</li>
                            <li>Incorrect ticket selection by customer</li>
                            <li>Weather conditions (unless event is cancelled)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">How to Request a Refund</h2>
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>Email <a href="mailto:refunds@bts-tour.eu" className="text-purple-400 hover:text-purple-300">refunds@bts-tour.eu</a></li>
                            <li>Include your order number and full name</li>
                            <li>Explain the reason for your refund request</li>
                            <li>Allow 5 business days for response</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Contact Support</h2>
                        <p>For refund inquiries:</p>
                        <p className="mt-2">Email: <a href="mailto:refunds@bts-tour.eu" className="text-purple-400 hover:text-purple-300">refunds@bts-tour.eu</a></p>
                        <p>Response time: 24-48 hours</p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
