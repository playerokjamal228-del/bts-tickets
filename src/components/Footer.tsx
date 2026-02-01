"use client";

import Link from "next/link";
import { Instagram, Twitter, Music2, Mail, CreditCard } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-[#050505] border-t border-white/5 w-full">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                            BTS TOUR 2026
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            {t.footer.slogan}<br />
                            Europe's biggest concert event.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-gray-500 hover:text-purple-400 transition-colors">
                                <Music2 className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t.footer.quickLinks}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">{t.nav.events}</Link></li>
                            <li><Link href="/checkout" className="text-gray-500 hover:text-white transition-colors text-sm">{t.nav.cart}</Link></li>
                            <li><a href="mailto:support@bts-tour.eu" className="text-gray-500 hover:text-white transition-colors text-sm">{t.footer.support}</a></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t.footer.legal}</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-gray-500 hover:text-white transition-colors text-sm">{t.footer.privacy}</Link></li>
                            <li><Link href="/terms" className="text-gray-500 hover:text-white transition-colors text-sm">{t.footer.terms}</Link></li>
                            <li><Link href="/cookies" className="text-gray-500 hover:text-white transition-colors text-sm">{t.footer.cookies}</Link></li>
                            <li><Link href="/refund" className="text-gray-500 hover:text-white transition-colors text-sm">{t.footer.refund}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">{t.footer.contact}</h4>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                            <Mail className="w-4 h-4" />
                            <a href="mailto:support@bts-tour.eu" className="hover:text-white transition-colors">
                                support@bts-tour.eu
                            </a>
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                            Mon-Fri: 9:00 - 18:00 CET<br />
                            24/7 support during ticket sales
                        </p>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="border-t border-white/5 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                            <CreditCard className="w-4 h-4" />
                            <span>{t.footer.securePayments}</span>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">VISA</div>
                            <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">Mastercard</div>
                            <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">PayPal</div>
                            <div className="px-3 py-1 bg-white/5 rounded text-gray-400 text-xs font-bold border border-white/10">Apple Pay</div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center mt-8 pt-8 border-t border-white/5">
                    <p className="text-gray-600 text-xs">
                        {t.footer.copyright}
                        <span className="text-purple-500 ml-1">💜</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
