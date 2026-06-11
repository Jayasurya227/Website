"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const count = useSpring(0, { stiffness: 50, damping: 30 });
    const display = useTransform(count, (latest) => Math.floor(latest).toLocaleString() + suffix);

    useEffect(() => {
        if (isInView) {
            count.set(value);
        }
    }, [isInView, count, value]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export function Hero() {
    const { t } = useLanguage();

    const stats = [
        { label: t("stats.patientsServed"), value: 50000, suffix: "+" },
        { label: t("stats.consultations"), value: 1200, suffix: "+" },
        { label: t("stats.villagesCovered"), value: 500, suffix: "+" },
        { label: t("stats.livesImpacted"), value: 100000, suffix: "+" },
    ];

    return (
        <section className="relative min-h-[680px] w-full flex items-center overflow-hidden bg-gray-900">
            {/* Background Photo */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/images/hero-new.png')` }}
            >
                {/* Gradient overlay — stronger on left for text, lighter on right to show photo */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
            </div>

            {/* Content — Left aligned like CRY India / Smile Foundation */}
            <div className="relative z-10 container mx-auto px-6 py-24">
                <div className="max-w-2xl">

                    {/* Eyebrow label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 mb-5"
                    >
                        <span className="h-px w-8 bg-secondary-400" />
                        <span className="text-secondary-400 text-sm font-semibold uppercase tracking-widest">
                            DigiSwasthya Foundation
                        </span>
                    </motion.div>

                    {/* Main headline — Playfair serif, editorial */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                        className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6"
                    >
                        {t("hero.titlePart1")}{" "}
                        <span className="text-secondary-400">
                            {t("hero.titleHighlight")}
                        </span>{" "}
                        {t("hero.titlePart2")}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-base md:text-lg text-gray-200 font-normal mb-10 leading-relaxed max-w-xl"
                    >
                        {t("hero.subtitle")}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/donate"
                            className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white font-semibold text-base px-8 py-3.5 rounded-md transition-colors duration-200"
                        >
                            {t("nav.donate")}
                        </Link>
                        <a
                            href="/contact-us"
                            className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base px-8 py-3.5 rounded-md transition-colors duration-200"
                        >
                            {t("hero.bookConsultation")}
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Stats bar — anchored to bottom, clean separator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute bottom-0 left-0 right-0 z-10 bg-black/40 backdrop-blur-sm border-t border-white/10"
            >
                <div className="container mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center md:text-left">
                            <div className="text-2xl md:text-3xl font-bold text-secondary-400">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-xs text-gray-300 uppercase tracking-wide mt-0.5">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
