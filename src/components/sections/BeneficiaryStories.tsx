"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, CheckCircle2, Heart, User } from "lucide-react";
import Image from "next/image";

const stories = [
    {
        name: "Pinki Paware",
        age: "41 years",
        role: "ASHA Worker, Nagpur",
        condition: "Severe swelling and pain in leg with no specialist access nearby",
        result: "Connected with Dr. Bhuvnesh Chaturvedi (Bone Specialist) via telemedicine. Swelling reduced, condition under control.",
        video: "/Videos/Impact stories, Voices from the Ground- Access brought healing, and healing brought hope.Her s.mp4",
    },
    {
        name: "Bajrang Sony",
        age: "56 years",
        role: "DigiSwasthya Patient",
        condition: "Suffering from diabetes for over 10 years with no proper medical guidance",
        result: "Received expert consultation through DigiSwasthya. Now managing diabetes with proper medical guidance.",
        video: "/Videos/🌟 Meet Bajrang Sony, 56, who has been battling diabetes for over a decade. After consulting at .mp4",
    },
];

const testimonials = [
    {
        name: "Jaysing Hande",
        problem: "Leg Swelling & Back Pain — DS3",
        body: "After consulting Dr. Leena Saxena online through DigiSwasthya, his health showed remarkable improvement. Within just 15 days, his leg swelling significantly reduced and back pain became much more manageable.",
        image: null
    },
    {
        name: "Sudhanshu Kumar",
        problem: "Lymph Node Swelling — DS2",
        body: "Sudhanshu endured persistent lymph node swelling for an entire year, facing misdiagnoses at three different hospitals. After an online consultation through DigiSwasthya, the correct condition was diagnosed and he made a full recovery.",
        image: "/images/testimonials/sudhanshu-kumar.png"
    },
    {
        name: "Bimala Devi",
        problem: "Early-Stage Cancer — DS2",
        body: "Through DigiSwasthya's online consultations and tests, Bimala was diagnosed with early-stage cancer in time. She received treatment followed by surgery. The timely intervention was a turning point in her health journey.",
        image: "/images/testimonials/bimala-devi.png"
    },
    {
        name: "Balu Katale",
        problem: "Diabetic Foot Ulcers — DS3",
        body: "I work in farming and encountered skin burns on my leg due to agricultural chemicals. Learning about DigiSwasthya through a village health camp, I sought their services. Timely intervention saved both time and money.",
        image: "/images/testimonials/balu-katale.png"
    },
    {
        name: "Jagruti",
        problem: "Weight Loss Problem — DS4",
        body: "Despite treatments from several hospitals, nothing worked. She was introduced to DigiSwasthya and only spent Rs. 400 on the initial prescription. A strict diet plan resulted in positive results. She is grateful to DigiSwasthya.",
        image: "/images/testimonials/jagruti.png"
    },
    {
        name: "Manisha Kumari",
        problem: "Osteosarcoma Cancer — DS1",
        body: "Diagnosed with Osteosarcoma cancer and feeling hopeless, DigiSwasthya Foundation connected us with doctors in Mumbai. Thanks to financial assistance from the Ratan Tata Trust, the surgery was possible. Forever grateful.",
        image: "/images/testimonials/manisha-kumari.png"
    },
    {
        name: "Rajneeta Devi",
        problem: "Breast Cancer — DS1",
        body: "DigiSwasthya arranged a second opinion tele-consultation with an oncologist from Homi Bhabha Cancer Hospital. Rajneeta underwent six cycles of chemotherapy. Today she is fully recovered and running a small business.",
        image: "/images/testimonials/rajneeta-devi.png"
    },
    {
        name: "Ram Dulare",
        problem: "Mouth Ulcer — DS5",
        body: "For eight months I suffered from severe mouth ulcers with no relief at multiple hospitals. I consulted an online doctor from Mumbai through DigiSwasthya, who prescribed effective medication. Within a week I felt significant relief.",
        image: "/images/testimonials/ram-dulare.png"
    },
    {
        name: "Shiv Daras Yadav",
        problem: "Chronic Skin Condition — DS6",
        body: "After multiple unsuccessful treatments, he visited a DigiSwasthya center. Through a tele-consultation with a specialist, he received a precise diagnosis. His condition improved drastically within weeks.",
        image: "/images/testimonials/shiv-daras-yadav.png"
    }
];

const ITEMS_PER_PAGE = 3;

export function BeneficiaryStories() {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(testimonials.length / ITEMS_PER_PAGE);
    const currentTestimonials = testimonials.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

    return (
        <section className="py-20 bg-[#f8fafc]" id="testimonials">
            <div className="container max-w-6xl mx-auto px-4">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-2xl mx-auto mb-16"
                >
                    <div className="inline-flex items-center gap-2 text-primary-600 text-xs font-bold uppercase tracking-widest mb-4">
                        <Heart className="w-3.5 h-3.5 fill-primary-600 animate-pulse" />
                        Real Impact
                    </div>
                    <h2 className="font-serif text-3xl md:text-[2.6rem] font-bold text-gray-900 leading-tight mb-4">
                        Lives changed, <span className="text-primary-600">through timely support</span>
                    </h2>
                    <div className="w-14 h-1 bg-primary-500 mx-auto rounded-full mb-4" />
                    <p className="text-gray-500 text-sm leading-relaxed">
                        Real stories and patient voices from the rural communities supported by DigiSwasthya programs.
                    </p>
                </motion.div>

                {/* 1. Video Stories Grid */}
                <div className="mb-20">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 border-l-4 border-primary-600 pl-3">
                        Featured Video Testimonials
                    </h3>
                    <div className="grid lg:grid-cols-2 gap-8">
                        {stories.map((story, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15, duration: 0.55 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.05)] border border-gray-100 hover:shadow-[0_6px_30px_rgba(0,0,0,0.09)] transition-shadow duration-400"
                            >
                                {/* Video Player */}
                                <div className="bg-gray-900 w-full aspect-video flex items-center justify-center">
                                    <video
                                        controls
                                        preload="metadata"
                                        className="w-full h-full block"
                                    >
                                        <source src={story.video} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>

                                {/* Story Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg leading-tight">
                                                {story.name}
                                            </h4>
                                            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                                {story.role} &bull; {story.age}
                                            </div>
                                        </div>
                                        <span className="text-[10px] bg-primary-50 text-primary-700 font-semibold px-2.5 py-1 rounded-full uppercase tracking-wide mt-0.5 whitespace-nowrap">
                                            Video Story
                                        </span>
                                    </div>

                                    <div className="border-t border-gray-100 mb-3" />

                                    <p className="text-xs text-gray-500 mb-2.5 leading-relaxed">
                                        <span className="text-gray-800 font-semibold">Challenge: </span>
                                        {story.condition}
                                    </p>

                                    <div className="flex items-start gap-2 bg-primary-50 rounded-lg px-3 py-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-xs text-primary-800 font-medium leading-relaxed">
                                            {story.result}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* 2. Written Testimonials Grid (Paginated) */}
                <div className="border-t border-gray-200/60 pt-16">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 border-l-4 border-primary-600 pl-3">
                        Patient Voices & Written Stories
                    </h3>

                    <motion.div
                        key={page}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                    >
                        {currentTestimonials.map((item, i) => (
                            <div
                                key={i}
                                className="flex flex-col bg-white border border-gray-100 rounded-xl p-6 hover:border-primary-200 hover:shadow-md transition-all duration-300"
                            >
                                {/* Profile */}
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-11 h-11 rounded-full bg-primary-50 border border-primary-100 overflow-hidden flex-shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={44}
                                                height={44}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-primary-400" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                                        <div className="text-xs text-primary-600 font-medium">{item.problem}</div>
                                    </div>
                                </div>

                                {/* Quote line */}
                                <div className="border-l-2 border-primary-200 pl-4 flex-grow">
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.body}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Testimonials Pagination Controls */}
                    <div className="flex items-center justify-center gap-3">
                        <button
                            onClick={() => setPage(p => (p - 1 + totalPages) % totalPages)}
                            className="w-9 h-9 rounded-full border border-gray-200 hover:border-primary-600 hover:text-primary-600 flex items-center justify-center transition-colors text-gray-400"
                            aria-label="Previous"
                        >
                            ‹
                        </button>
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`w-2 h-2 rounded-full transition-all ${page === i ? "bg-primary-600 w-5" : "bg-gray-200"}`}
                                aria-label={`Page ${i + 1}`}
                            />
                        ))}
                        <button
                            onClick={() => setPage(p => (p + 1) % totalPages)}
                            className="w-9 h-9 rounded-full border border-gray-200 hover:border-primary-600 hover:text-primary-600 flex items-center justify-center transition-colors text-gray-400"
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
