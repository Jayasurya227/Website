"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactActions } from "@/components/features/ContactActions";
import { ContactForm } from "@/components/features/ContactForm";

export default function ContactUs() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <section className="bg-primary-900 text-white py-20 text-center">
                <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                <p className="text-primary-100 italic">&quot;Making healthcare services affordable and accessible for rural communities across India&quot;</p>
            </section>

            <div className="container py-20 px-4">
                {/* Prominent Contact Actions at the Top */}
                <div className="mb-16 bg-white p-8 lg:p-12 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Need Immediate Support?</h2>
                        <p className="text-gray-500 font-medium">Chat with us or call us directly for any healthcare queries.</p>
                    </div>
                    <ContactActions />
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Secondary Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight border-l-4 border-primary-500 pl-4 uppercase">General Support</h3>
                            <div className="space-y-6 text-gray-600 mt-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="bg-primary-50 p-3 rounded-full group-hover:bg-primary-100 transition-colors">
                                        <Mail className="h-5 w-5 text-primary-600" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Email Us</span>
                                        <span className="font-bold text-gray-900">info@digiswasthya.org</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Volunteering</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">Join DigiSwasthya Foundation as a healthcare professional or volunteer.</p>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3 text-primary-700 font-bold text-sm bg-primary-50 p-3 rounded-xl italic">
                                    <Mail className="h-4 w-4" />
                                    <span>support@digiswasthya.org</span>
                                </div>
                                <Button asChild variant="primary" className="w-full shadow-md rounded-xl font-bold">
                                    <a href="https://forms.gle/GvjUfAoMBKvqTNcXA" target="_blank" rel="noopener noreferrer">
                                        Open Volunteering Form
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Centre Addresses */}
                    <div className="lg:col-span-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 tracking-tight border-l-4 border-primary-500 pl-4 uppercase">Our Telemedicine Centres</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: "DS1: Sant Kabir Nagar", addr: "Kali Road, Kathaicha Chauraha, Nath Nagar, Sant Kabir Nagar, Uttar Pradesh - 272176" },
                                { name: "DS2: Muzaffarpur", addr: "Deoria Road, Nawanagar Nizamat, Sahebganj, Muzaffarpur, Bihar - 843125" },
                                { name: "DS3: Pune", addr: "Bhawadi, Ambegaon, Distt. Pune, Maharashtra - 410512" },
                                { name: "DS4: Palghar", addr: "407, A wing, Sadiya Apartment, 90th Ft. Rd. Oswal Nagari, Nalasopara East, Palghar, MH- 401209" },
                                { name: "DS5: Uttar Pradesh", addr: "Near Bharat Gas Agency, Asharafpur, Uttar Pradesh 272162" },
                            ].map((c, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -2 }}
                                    className="bg-white p-5 rounded-2xl border border-gray-100 flex gap-4 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <div className="bg-primary-50 p-2.5 h-10 w-10 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all flex-shrink-0 flex items-center justify-center">
                                        <MapPin className="h-5 w-5 text-primary-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{c.name}</h4>
                                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{c.addr}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-20">
                    <ContactForm />
                </div>
            </div>

            <Footer />
        </main>
    );
}
