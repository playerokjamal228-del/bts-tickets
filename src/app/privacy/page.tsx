"use client";

import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-secondary text-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Privacy Policy
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-sm text-gray-500">Last updated: January 2026</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us, including:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Name and contact information (email, phone number)</li>
                            <li>Billing and payment information</li>
                            <li>Event preferences and ticket selections</li>
                            <li>Communications you send to us</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
                        <p>We use the information we collect to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Process your ticket purchases and payments</li>
                            <li>Send you order confirmations and event updates</li>
                            <li>Respond to your questions and requests</li>
                            <li>Improve our services and user experience</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
                        <p>We do not sell your personal information. We may share your information with:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Event organizers (for ticket verification)</li>
                            <li>Payment processors (to complete transactions)</li>
                            <li>Service providers (who assist our operations)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
                        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">5. Your Rights</h2>
                        <p>Under GDPR and applicable laws, you have the right to:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Access your personal data</li>
                            <li>Correct inaccurate data</li>
                            <li>Request deletion of your data</li>
                            <li>Object to data processing</li>
                            <li>Data portability</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">6. Contact Us</h2>
                        <p>For privacy-related inquiries, please contact us at: <a href="mailto:privacy@bts-tour.eu" className="text-purple-400 hover:text-purple-300">privacy@bts-tour.eu</a></p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
