"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Testimonials() {
    const images = [
        "/images/testimonials/rajneeta-devi.png",
        "/images/testimonials/ram-dulare.png",
        "/images/testimonials/shiv-daras-yadav.png",
        "/images/testimonials/bimala-devi.png",
        "/images/testimonials/sudhanshu-kumar.png",
        "/images/testimonials/manoj-sharma.png",
        "/images/testimonials/vinay.png",
        "/images/testimonials/manisha-kumari.png",
        "/images/testimonials/jagruti.png",
        "/images/testimonials/balu-katale.png"
    ];

    return (
        <section className="py-12 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    <div className="mb-8 px-8 py-2 bg-primary-600 text-white rounded-full font-bold shadow-lg uppercase tracking-widest text-sm">
                        Testimonials
                    </div>

                    <div className="relative w-full max-w-md mx-auto">
                        <div className="overflow-hidden rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.1)] border-4 border-white bg-white">
                            <motion.div
                                className="flex"
                                animate={{
                                    x: [
                                        "-900%",
                                        "-800%",
                                        "-700%",
                                        "-600%",
                                        "-500%",
                                        "-400%",
                                        "-300%",
                                        "-200%",
                                        "-100%",
                                        "0%",
                                        "-900%"
                                    ]
                                }}
                                transition={{
                                    duration: 50,
                                    times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                                    ease: "easeInOut",
                                    repeat: Infinity,
                                }}
                            >
                                {images.map((src, i) => (
                                    <div key={i} className="flex-shrink-0 w-full aspect-square relative">
                                        <Image
                                            src={src}
                                            alt={`Testimonial ${i + 1}`}
                                            fill
                                            className="object-contain"
                                            priority={i === 0}
                                        />
                                    </div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

