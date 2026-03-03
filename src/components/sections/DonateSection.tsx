"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function DonateSection() {
    const { t } = useLanguage();
    const customVideoId = "KOQjv1xyfkg"; // From user

    return (
        <section className="py-20 bg-gray-50">
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* Content Side */}
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl text-primary-700 uppercase">{t("donateSection.title")}</h2>
                            <p className="text-gray-700 leading-relaxed font-medium">
                                {t("donateSection.description")}
                            </p>
                            <div className="bg-white p-6 rounded-lg border border-primary-100 shadow-sm">
                                <p className="text-gray-800 font-medium mb-4">
                                    {t("donateSection.boxText")}{" "}
                                    <span className="text-green-600 font-bold">{t("donateSection.boxHighlight")}</span>{" "}
                                    {t("donateSection.boxTextAfter")}
                                </p>
                                <div className="space-y-2 text-sm text-gray-600 font-bold">
                                    <p><strong>1) {t("donateSection.donateNowLabel")}:</strong> bit.ly/Gift2DS</p>
                                    <p><strong>2) {t("donateSection.upiLabel")}:</strong> digiswasthya@yesbank</p>
                                </div>
                            </div>
                        </div>

                        <Button asChild size="lg" className="w-full sm:w-auto text-lg px-8 py-6 gap-2 bg-green-600 hover:bg-green-700">
                            <Link href="/donate">
                                <Heart className="h-5 w-5 fill-current" /> {t("nav.donate").toUpperCase()}
                            </Link>
                        </Button>
                    </div>

                    {/* Video Side */}
                    <div className="space-y-6">
                        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${customVideoId}`}
                                title="DigiSwasthya Introduction"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
