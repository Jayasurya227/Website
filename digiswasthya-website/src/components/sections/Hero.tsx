"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NextImage from "next/image";
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
        <section className="relative min-h-[700px] w-full flex items-center justify-center overflow-hidden bg-gray-900">
            {/* Visual Element: Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/images/hero-new.png')`,
                }}
            >
                {/* Soft dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

                {/* Fallback pattern in case image fails */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center text-center">

                {/* Headline: Fade-in on load */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-4xl leading-tight tracking-tight mb-6"
                >
                    {t("hero.titlePart1")}{" "}
                    <span className="text-secondary-400 font-extrabold italic">
                        {t("hero.titleHighlight")}
                    </span>{" "}
                    {t("hero.titlePart2")}
                </motion.h1>

                {/* Subheading: Clear and human */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-lg md:text-xl text-gray-200 max-w-2xl font-light mb-10 leading-relaxed"
                >
                    {t("hero.subtitle")}
                </motion.p>

                {/* Call-to-Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-5 mb-16"
                >
                    <motion.div whileHover={{ scale: 1.05 }} className="transition-all duration-300">
                        <Button
                            variant="primary"
                            size="lg"
                            className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg font-semibold px-10 py-7 rounded-full shadow-lg shadow-secondary-500/20"
                            asChild
                        >
                            <Link href="/donate">
                                {t("nav.donate")}
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05 }} className="transition-all duration-300">
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-white border-white/40 hover:bg-white/10 text-lg font-semibold px-10 py-7 rounded-full backdrop-blur-sm shadow-xl"
                            asChild
                        >
                            <a href="/contact-us">
                                {t("hero.bookConsultation")}
                            </a>
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Impact Statistics: Horizontal layout with animated counters */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-5xl border-t border-white/10 pt-12"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <h3 className="text-3xl md:text-4xl font-black text-secondary-400 mb-1">
                                <Counter value={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Subtle Gradient bottom overlay for smooth transition to next section */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-gray-900 to-transparent pointer-events-none" />
        </section>
    );
}
