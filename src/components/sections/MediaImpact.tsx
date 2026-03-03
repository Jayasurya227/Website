"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Jaysing Hande",
        problem: "Problem - Leg Swelling & Back Pain - DS3",
        body: "Jaysing Hande experienced severe leg swelling and back pain after a piece of wood penetrated his body. This condition left him struggling to carry out even basic tasks. However, after consulting Dr. Leena Saxena online through DigiSwasthya, his health showed remarkable improvement. Within just 15 days, his leg swelling significantly reduced, and the back pain became much more manageable.",
        image: null
    },
    {
        name: "Sudhanshu Kumar",
        problem: "Problem - Lymph Node Swelling - DS2",
        body: "Sudhanshu Kumar endured persistent lymph node swelling for an entire year, facing misdiagnoses at three different hospitals. Frustrated and in pain, he turned to DigiSwasthya for help. After an online consultation, a thorough diagnostic process revealed the correct condition, and a prescribed medication course helped Sudhanshu make a full recovery.",
        image: "/images/testimonials/sudhanshu-kumar.png"
    },
    {
        name: "Bimala Devi",
        problem: "Problem - Cancer Treatment - DS2",
        body: "Bimala Devi struggled with prolonged lower abdomen issues, trying multiple treatments without success. She then discovered DigiSwasthya Foundation's Telemedicine Center. Through online consultations and tests, Bimala was diagnosed with early-stage cancer. She received treatment in Gorakhpur, followed by surgery. The timely intervention of DigiSwasthya was a turning point in her health journey. After surgery, regular follow-ups ensured steady recovery. Bimala is deeply grateful for the accurate diagnosis and ongoing support.",
        image: "/images/testimonials/bimala-devi.png"
    },
    {
        name: "Balu Katale",
        problem: "Problem - Diabetic foot ulcers DS3",
        body: "I'm from a small village Thugaon, Post. Karegaon, Pune. I work in farming and encountered skin burns on my leg due to agricultural chemicals. I experienced frequent pus discharge, bleeding, and severe itching. Learning about DigiSwasthya through a village health camp, I sought their services. Comprehensive tests were followed by Dr. Leena consultation. Timely intervention saved both time and money.",
        image: "/images/testimonials/balu-katale.png"
    },
    {
        name: "Jagruti",
        problem: "Problem - Weight Loss Problem - DS4",
        body: "Jagruti has had a weight issue since 12 to 13 years old. Despite treatments from several hospitals, nothing worked. She was introduced to DigiSwasthya through a relative and only spent Rs. 400 on the initial prescription. A strict diet plan was followed for two months, resulting in a 2 kg weight gain. She is happy with the results and is grateful to DigiSwasthya for their support.",
        image: "/images/testimonials/jagruti.png"
    },
    {
        name: "Manisha Kumari",
        problem: "Problem - Osteosarcoma Cancer - DS1",
        body: "I am from Muzaffarpur, Bihar, and was diagnosed with Osteosarcoma cancer. Feeling hopeless, my parents reached out to DigiSwasthya Foundation. They connected us with doctors in Mumbai for the necessary surgery. Thanks to financial assistance from the Ratan Tata Trust, I was able to undergo the surgery. I am forever grateful to DigiSwasthya Foundation for their unwavering support.",
        image: "/images/testimonials/manisha-kumari.png"
    },
    {
        name: "Rajneeta Devi",
        problem: "Problem - Breast Cancer - DS1",
        body: "When Ranjeeta Ji was diagnosed with breast cancer, the local hospital suggested immediate surgery. A fellow villager referred her to DigiSwasthya. We arranged a second opinion tele-consultation with Dr. Rakesh Mittal, an oncologist from Homi Bhabha Cancer Hospital. Ranjeeta Ji underwent six cycles of chemotherapy. Today she is fully recovered, leading a healthy life, and running a small business.",
        image: "/images/testimonials/rajneeta-devi.png"
    },
    {
        name: "Ram Dulare",
        problem: "Problem - Mouth Ulcer - DS5",
        body: "For eight months, I suffered from severe mouth ulcers, making eating unbearable. I found no relief at multiple hospitals. Then, I discovered the DigiSwasthya Telemedicine Center in Ashrafpur. I consulted an online doctor from Mumbai, who prescribed effective medication. Within a week, I felt significant relief and could eat without discomfort. The center provided free, high-quality care, saving me time and money.",
        image: "/images/testimonials/ram-dulare.png"
    },
    {
        name: "Shiv Daras Yadav",
        problem: "Problem - Chronic Skin Condition - DS6",
        body: "Shiv Daras Yadav suffered from a persistent skin condition that affected his ability to work and lead a normal life. After multiple unsuccessful treatments, he visited a DigiSwasthya center. Through a tele-consultation with a specialist, he received a precise diagnosis and treatment plan. His condition improved drastically within weeks, allowing him to regain his confidence and return to his livelihood.",
        image: "/images/testimonials/shiv-daras-yadav.png"
    }
];

export function MediaImpact() {
    const [page, setPage] = useState(0);
    const itemsPerPage = 3;
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const handleNext = () => {
        setPage((prev) => (prev + 1) % totalPages);
    };

    const handlePrev = () => {
        setPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const currentTestimonials = testimonials.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

    return (
        <section className="py-12 bg-white" id="testimonials">
            <div className="container mx-auto px-4 relative">
                {/* Header */}
                <div className="text-center mb-10">
                    <motion.h2
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-black text-gray-900 tracking-tight"
                    >
                        Testimonials
                    </motion.h2>
                </div>

                <div className="relative max-w-7xl mx-auto">
                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 shadow-lg text-primary-600 hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/90 shadow-lg text-primary-600 hover:bg-primary-600 hover:text-white transition-all transform hover:scale-110"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Testimonials Grid with Animation */}
                    <div className="overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={page}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
                            >
                                {currentTestimonials.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center bg-gray-50/50 p-6 rounded-3xl border border-gray-100 shadow-sm"
                                    >
                                        {/* Profile Placeholder / Image (Decreased Size) */}
                                        <div className="w-14 h-14 mb-4 rounded-full bg-gray-100 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden grayscale">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    width={56}
                                                    height={56}
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <User className="w-8 h-8 text-gray-400" />
                                            )}
                                        </div>

                                        {/* Patient Name */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">
                                            {item.name}
                                        </h3>

                                        {/* Problem Line */}
                                        <p className="text-[10px] font-bold text-primary-600 mb-4 uppercase tracking-wider text-center">
                                            {item.problem}
                                        </p>

                                        {/* Body Text (Justified) */}
                                        <p className="text-gray-600 leading-relaxed text-justify text-xs md:text-sm">
                                            {item.body}
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-1.5 mt-10">
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i)}
                            className={`w-2 h-2 rounded-full transition-all ${page === i ? "bg-primary-600 w-4" : "bg-gray-200"}`}
                            aria-label={`Go to page ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
