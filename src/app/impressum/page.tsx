"use client";

import { useLanguage } from "@/lib/language-context";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpressumPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-black text-white selection:bg-purple-500/30">
            <Header />

            <main className="max-w-4xl mx-auto px-4 py-32">
                <Card className="bg-[#111] border-white/10 backdrop-blur-sm">
                    <CardHeader className="pb-8 border-b border-white/5">
                        <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent">
                            {t.impressumPage.title}
                        </CardTitle>
                        <p className="text-gray-400 mt-2 text-lg">{t.impressumPage.subtitle}</p>
                    </CardHeader>

                    <CardContent className="space-y-8 pt-8">

                        {/* Company Details */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-purple-400 font-semibold mb-2">{t.impressumPage.addressTitle}</h3>
                                <p className="text-xl font-bold text-white mb-2">{t.impressumPage.companyName}</p>
                                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                                    {t.impressumPage.address}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-purple-400 font-semibold mb-2">{t.impressumPage.contactTitle}</h3>
                                <div className="space-y-4">
                                    <p className="text-gray-300">
                                        Email: <a href={`mailto:${t.impressumPage.email}`} className="text-white hover:text-purple-400 transition-colors">{t.impressumPage.email}</a>
                                    </p>
                                    <p className="text-gray-300 whitespace-pre-line">
                                        {t.impressumPage.whatsapp}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-white/5 w-full my-4" />

                        {/* Registration & Representation */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">{t.impressumPage.representedTitle}</h3>
                                <p className="text-gray-300">{t.impressumPage.representedBy}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">{t.impressumPage.regTitle}</h3>
                                <p className="text-gray-300 whitespace-pre-line">{t.impressumPage.regNumber}</p>
                            </div>
                        </div>

                        {/* VAT */}
                        <div>
                            <h3 className="text-gray-500 text-sm uppercase tracking-wider font-semibold mb-2">{t.impressumPage.vatTitle}</h3>
                            <p className="text-gray-300">{t.impressumPage.vatNumber}</p>
                        </div>

                        <div className="h-px bg-white/5 w-full my-4" />

                        {/* Disclaimers */}
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-white font-semibold mb-2">{t.impressumPage.disclaimerTitle}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                                    {t.impressumPage.disclaimerText}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">{t.impressumPage.disclaimerLinksTitle}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                                    {t.impressumPage.disclaimerLinksText}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">{t.impressumPage.copyrightTitle}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                                    {t.impressumPage.copyrightText}
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2">{t.impressumPage.disputeTitle}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed text-justify">
                                    {t.impressumPage.disputeText}
                                </p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </main>

            <Footer />
        </div>
    );
}
