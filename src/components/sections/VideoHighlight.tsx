"use client";

import { motion } from "framer-motion";

export function VideoHighlight() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left — text */}
                    <div>
                        <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                            <span className="h-px w-6 bg-primary-600" /> Watch Our Story
                        </div>
                        <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-snug mb-4">
                            See DigiSwasthya in action
                        </h2>
                        <p className="text-gray-500 leading-relaxed">
                            Watch how we are bringing specialist healthcare to the doorstep of rural communities across India through technology-enabled telemedicine centers.
                        </p>
                    </div>

                    {/* Right — video */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative aspect-video rounded-xl overflow-hidden shadow-lg bg-black"
                    >
                        <iframe
                            className="absolute inset-0 w-full h-full"
                            src="https://www.youtube.com/embed/KOQjv1xyfkg?autoplay=0&rel=0&modestbranding=1"
                            title="DigiSwasthya Impact Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
