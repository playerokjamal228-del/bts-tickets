"use client";

import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-secondary text-white">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Cookie Policy
                </h1>

                <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
                    <p className="text-sm text-gray-500">Last updated: January 2026</p>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">What Are Cookies?</h2>
                        <p>Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Types of Cookies We Use</h2>

                        <h3 className="text-lg font-medium text-purple-300 mt-4 mb-2">Essential Cookies</h3>
                        <p>Required for the website to function. These cannot be disabled.</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Session management</li>
                            <li>Shopping cart functionality</li>
                            <li>Security features</li>
                        </ul>

                        <h3 className="text-lg font-medium text-purple-300 mt-4 mb-2">Analytics Cookies</h3>
                        <p>Help us understand how visitors use our site.</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Page views and navigation</li>
                            <li>Device and browser information</li>
                            <li>Aggregate usage statistics</li>
                        </ul>

                        <h3 className="text-lg font-medium text-purple-300 mt-4 mb-2">Marketing Cookies</h3>
                        <p>Used to deliver relevant advertisements.</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Ad personalization</li>
                            <li>Campaign tracking</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Managing Cookies</h2>
                        <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.</p>
                        <p className="mt-2">Most browsers allow you to:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>View and delete cookies</li>
                            <li>Block all cookies</li>
                            <li>Block third-party cookies</li>
                            <li>Accept all cookies</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-white mb-3">Contact Us</h2>
                        <p>Questions about our cookie policy? Contact us at: <a href="mailto:privacy@bts-tour.eu" className="text-purple-400 hover:text-purple-300">privacy@bts-tour.eu</a></p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
