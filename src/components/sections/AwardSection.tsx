"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function AwardSection() {
    const { t } = useLanguage();

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 bg-gray-50 rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                    {/* Image Side */}
                    <div className="w-full lg:w-3/5 relative min-h-[300px] md:min-h-[450px] bg-gray-200/50">
                        <Image
                            src="/images/award-recognition.png"
                            alt="DigiSwasthya Award Recognition"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>

                    {/* Content Side */}
                    <div className="w-full lg:w-2/5 p-8 lg:p-12 space-y-6 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-xs font-bold uppercase tracking-wider"
                        >
                            {t("award.badge")}
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
                        >
                            {t("award.titlePart1")}{" "}
                            <span className="text-primary-600">
                                {t("award.titleHighlight")}
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg text-gray-700 font-medium italic border-l-4 border-primary-500 pl-4 leading-relaxed"
                        >
                            {t("award.quote")}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-600 leading-relaxed"
                        >
                            {t("award.description")}
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
}
