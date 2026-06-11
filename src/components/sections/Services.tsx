"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Stethoscope, Video, Activity, HeartPulse, ShieldCheck, Target, Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Services() {
    const { t } = useLanguage();

    const services = [
        {
            title: t("services.items.checkups.title"),
            description: t("services.items.checkups.description"),
            icon: <Stethoscope className="w-8 h-8" />,
            color: "bg-blue-50 text-blue-600",
            delay: 0.1
        },
        {
            title: t("services.items.teleconsultation.title"),
            description: t("services.items.teleconsultation.description"),
            icon: <Video className="w-8 h-8" />,
            color: "bg-primary-50 text-primary-600",
            delay: 0.2
        },
        {
            title: t("services.items.diagnostics.title"),
            description: t("services.items.diagnostics.description"),
            icon: <Activity className="w-8 h-8" />,
            color: "bg-emerald-50 text-emerald-600",
            delay: 0.3
        },
        {
            title: t("services.items.referrals.title"),
            description: t("services.items.referrals.description"),
            icon: <HeartPulse className="w-8 h-8" />,
            color: "bg-rose-50 text-rose-600",
            delay: 0.4
        }
    ];

    const impactMetrics = [
        { label: t("impact.patientsServed"), value: "78K+", sub: t("impact.livesTransformed"), icon: <Target className="w-5 h-5" /> },
        { label: t("impact.consultations"), value: "71K+", sub: t("impact.expertAdvice"), icon: <Activity className="w-5 h-5" /> },
        { label: t("impact.livesImpacted"), value: "2M+", sub: t("impact.healthierCommunities"), icon: <Heart className="w-5 h-5" /> }
    ];

    return (
        <section className="py-24 bg-white overflow-hidden" id="services">
            <div className="container max-w-7xl">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold uppercase tracking-widest"
                    >
                        <span className="h-px w-6 bg-primary-600" /> {t("services.badge")}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                    >
                        {t("services.titlePart1")}{" "}
                        <span className="text-primary-600">
                            {t("services.titleHighlight")}
                        </span>{" "}
                        {t("services.titlePart2")}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-500"
                    >
                        {t("services.description")}
                    </motion.p>
                </div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay }}
                            className="p-7 bg-white border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 rounded-xl group"
                        >
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 ${service.color}`}>
                                {service.icon}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">{service.title}</h3>
                            <p className="text-gray-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Impact Band — editorial, clean */}
                <div className="relative rounded-2xl overflow-hidden bg-primary-900">
                    <div className="grid lg:grid-cols-2 gap-0 items-stretch">
                        {/* Photo side */}
                        <div className="relative min-h-[280px]">
                            <Image
                                src="/images/impact-community.jpg"
                                alt="DigiSwasthya Community Impact"
                                fill
                                className="object-cover brightness-75"
                            />
                        </div>
                        {/* Content side */}
                        <div className="p-10 md:p-14 flex flex-col justify-center space-y-6">
                            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white leading-snug">
                                {t("impact.title")}{" "}
                                <span className="text-secondary-400">{t("impact.highlight")}</span>
                            </h3>
                            <p className="text-primary-200 text-base leading-relaxed">
                                {t("impact.description")}
                            </p>
                            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/10">
                                {impactMetrics.map((impact, idx) => (
                                    <div key={idx}>
                                        <div className="text-2xl font-bold text-secondary-400">{impact.value}</div>
                                        <div className="text-xs text-primary-300 uppercase tracking-wide mt-1">{impact.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
