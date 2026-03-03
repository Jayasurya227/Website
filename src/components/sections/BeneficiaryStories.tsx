"use client";

import { motion } from "framer-motion";
import { Heart, Quote, ArrowRight, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const stories = [
    {
        title: "Case Study: Improving Rural Access to Specialist Care",
        profile: "A 52-year-old farmer from a remote village in Uttar Pradesh",
        challenge: "Faced recurring health issues with no qualified medical practitioner access within a 40km radius. Financial constraints prevented travel to urban centers.",
        intervention: "Facilitated immediate connection with an urban specialist via the DigiSwasthya teleconsultation platform at the village center.",
        outcome: "Received accurate diagnosis and treatment plan within 24 hours. Follow-up completed within 2 weeks, allowing return to sustainable work.",
        image: "/stories/ramesh.png",
        delay: 0.1
    },
    {
        title: "Case Study: Maternal Health Support Through Teleconsultation",
        profile: "Expectant mother from a rural district in Bihar",
        challenge: "Needed urgent specialized prenatal care but faced severe financial and transportation barriers to the nearest city, risking complications.",
        intervention: "Provided regular specialized pre-natal teleconsultations and nutritional guidance at the local DigiSwasthya center.",
        outcome: "Maintained consistent health monitoring throughout the final trimester. Safe delivery ensured through our partner hospital network.",
        image: "/stories/sunita.png",
        delay: 0.3
    }
];

export function BeneficiaryStories() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container max-w-7xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl space-y-4">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-wider"
                        >
                            <Heart className="w-4 h-4 fill-current" /> Impact Analysis & Case Studies
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-black text-slate-900 leading-tight"
                        >
                            Documenting Our <br />
                            <span className="text-rose-600 tracking-tighter">Human Impact</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Stories Grid */}
                <div className="grid lg:grid-cols-2 gap-12">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: story.delay, duration: 0.8 }}
                            className="group flex flex-col md:flex-row bg-slate-50 rounded-[40px] overflow-hidden border border-slate-100 transition-all duration-700"
                        >
                            {/* Image Container */}
                            <div className="relative w-full md:w-2/5 aspect-[4/5] overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10" />
                                <motion.img
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5 }}
                                    src={story.image}
                                    alt="Health Impact Case Study"
                                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute bottom-6 left-6 z-20 pr-6">
                                    <div className="text-white font-bold text-sm leading-tight">{story.profile}</div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-10 flex-1 flex flex-col justify-center">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-black text-slate-900 leading-tight border-b border-rose-100 pb-3">{story.title}</h3>

                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Challenge</div>
                                            <p className="text-slate-600 leading-relaxed text-sm font-medium">
                                                {story.challenge}
                                            </p>
                                        </div>

                                        <div className="space-y-1 border-l-2 border-rose-200 pl-4">
                                            <div className="text-[10px] font-black text-rose-400 uppercase tracking-widest">The Intervention</div>
                                            <p className="text-slate-700 leading-relaxed text-sm font-medium italic">
                                                {story.intervention}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">The Outcome</div>
                                            <p className="text-slate-900 leading-relaxed text-sm font-bold">
                                                {story.outcome}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Transparency Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                        Case studies represent real scenarios supported by DigiSwasthya programs. Personal details are anonymized to protect privacy.
                    </p>
                </motion.div>

            </div>
        </section>
    );
}
