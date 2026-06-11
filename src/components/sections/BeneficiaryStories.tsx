"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const stories = [
    {
        name: "Ramesh Kumar",
        location: "Sant Kabir Nagar, UP",
        condition: "Chronic illness, no specialist access",
        result: "Diagnosed & treated within 24 hours via teleconsultation",
        image: "/stories/ramesh.png",
    },
    {
        name: "Sunita Devi",
        location: "Muzaffarpur, Bihar",
        condition: "High-risk pregnancy, no prenatal care access",
        result: "Safe delivery through our partner hospital network",
        image: "/stories/sunita.png",
    },
];

export function BeneficiaryStories() {
    return (
        <section className="py-20 bg-primary-950 overflow-hidden">
            <div className="container max-w-7xl">

                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-secondary-400 text-sm font-semibold uppercase tracking-widest mb-4">
                        <span className="h-px w-6 bg-secondary-400" /> Real Impact
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-snug">
                        Lives changed,<br />
                        <span className="text-secondary-400">one consultation at a time</span>
                    </h2>
                    <p className="mt-4 text-primary-300 leading-relaxed">
                        Case studies represent real scenarios supported by DigiSwasthya programs. Personal details anonymized to protect privacy.
                    </p>
                </div>

                {/* Stories — editorial two-column */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {stories.map((story, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                            className="flex gap-6 bg-primary-900/50 border border-primary-800 rounded-xl p-7 hover:border-primary-700 transition-colors duration-300"
                        >
                            {/* Photo */}
                            <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-primary-800">
                                <Image
                                    src={story.image}
                                    alt={story.name}
                                    width={80}
                                    height={80}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center">
                                <div className="font-semibold text-white text-base">{story.name}</div>
                                <div className="text-xs text-primary-400 mb-3">{story.location}</div>
                                <div className="text-xs text-primary-300 mb-1">
                                    <span className="text-primary-500 font-semibold">Challenge: </span>
                                    {story.condition}
                                </div>
                                <div className="text-xs text-secondary-400 font-semibold">
                                    ✓ {story.result}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
