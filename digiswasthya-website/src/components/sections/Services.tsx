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
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-700 text-sm font-bold border border-primary-100"
                    >
                        <ShieldCheck className="w-4 h-4" /> {t("services.badge")}
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
                    {services.map((service, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: service.delay }}
                            whileHover={{ y: -10 }}
                            className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-primary-600/10 transition-all duration-500 group"
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500 ${service.color}`}>
                                {service.icon}
                            </div>
                            <h3 className="text-xl font-black text-slate-900 mb-4">{service.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {service.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Visual Impact Section (Compacted Design) */}
                <div className="relative rounded-[40px] bg-[#0a1128] p-8 md:p-14 overflow-hidden">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500/10 to-transparent pointer-events-none" />

                    {/* Particles */}
                    <div className="absolute top-6 right-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
                    <div className="absolute bottom-12 right-1/4 w-1 w-1 bg-emerald-400 rounded-full animate-pulse delay-700" />

                    <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                                    {t("impact.title")} <br />
                                    <span className="text-blue-400">
                                        {t("impact.highlight")}
                                    </span>
                                </h3>
                                <p className="text-gray-400 text-base leading-relaxed max-w-md">
                                    {t("impact.description")}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-6">
                                {impactMetrics.slice(0, 2).map((impact, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 backdrop-blur-sm">
                                            {impact.icon}
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-white leading-none mb-0.5">{impact.value}</div>
                                            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{impact.label}</div>
                                            <div className="text-[8px] text-gray-600 uppercase tracking-wider">{impact.sub}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Infographic (Scaled Down) */}
                        <div className="relative flex justify-center lg:justify-end">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative w-64 h-64 md:w-[320px] md:h-[320px]"
                            >
                                <div className="absolute inset-0 rounded-full border border-white/5 animate-[pulse_4s_infinite]" />

                                <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-[#1a2b4b] shadow-xl group">
                                    <Image
                                        src="/images/impact-community.jpg"
                                        alt="DigiSwasthya Community Impact"
                                        fill
                                        className="object-cover brightness-50 transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128]/80 via-transparent to-transparent" />

                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                        <motion.div
                                            initial={{ y: 15, opacity: 0 }}
                                            whileInView={{ y: 0, opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <div className="text-5xl md:text-6xl font-black text-white leading-tight">2M+</div>
                                            <div className="text-[10px] md:text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mt-1">{t("impact.livesImpacted")}</div>
                                            <div className="text-[8px] md:text-[9px] font-medium text-gray-400 uppercase tracking-widest mt-2 px-4 py-1 border-t border-white/10">Transforming Rural Lives</div>
                                        </motion.div>
                                    </div>
                                </div>

                                <div className="absolute top-[8%] left-[82%] w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)]" />
                                <div className="absolute bottom-[5%] left-[18%] w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]" />
                            </motion.div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
