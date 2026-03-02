"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Phone, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactActions } from "./ContactActions";

type ContactType = "Patient" | "Donor" | "Volunteer" | "NGO / CSR Partner" | "General Inquiry";

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
    contactType: ContactType;
    organization?: string;
    partnershipInterest?: string;
    location?: string;
    assistanceNeeded?: string;
    consent: boolean;
}

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
        defaultValues: {
            contactType: "General Inquiry"
        }
    });

    const contactType = watch("contactType");

    const onSubmit = async (data: FormData) => {
        console.log("Form submitted:", data);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-2xl shadow-xl border border-primary-100 text-center space-y-6"
            >
                <div className="flex justify-center">
                    <div className="bg-primary-50 p-4 rounded-full">
                        <CheckCircle2 className="h-16 w-16 text-primary-600" />
                    </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                    Thank you for reaching out to DigiSwasthya. Our team has received your inquiry and will get back to you within 24–48 hours.
                </p>
                <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="mt-4"
                >
                    Send Another Message
                </Button>
            </motion.div>
        );
    }

    return (
        <section className="py-20 bg-gray-100/80" id="message-form">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="p-8 lg:p-12">
                        <div className="mb-10 border-b border-gray-100 pb-8 text-center">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Send us a Message</h3>
                            <p className="text-gray-500 font-medium">Prefer direct communication? Call or message us on WhatsApp.</p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-900">Full Name</label>
                                    <input
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="John Doe"
                                        className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white font-medium"
                                    />
                                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-bold text-gray-900">Email Address</label>
                                    <input
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                        })}
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none bg-white font-medium"
                                    />
                                    {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email.message}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">I am contacting as:</label>
                                <select
                                    {...register("contactType")}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 font-medium focus:ring-2 focus:ring-primary-500 transition-all outline-none appearance-none bg-white shadow-sm"
                                >
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Patient">Patient / Family</option>
                                    <option value="Donor">Donor</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="NGO / CSR Partner">NGO / CSR Partner</option>
                                </select>
                            </div>

                            <AnimatePresence mode="wait">
                                {contactType === "NGO / CSR Partner" && (
                                    <motion.div
                                        key="ngo-fields"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid md:grid-cols-2 gap-6"
                                    >
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-900">Organization Name</label>
                                            <input
                                                {...register("organization", { required: contactType === "NGO / CSR Partner" })}
                                                placeholder="Company or NGO Name"
                                                className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-900">Location</label>
                                            <input
                                                {...register("location", { required: contactType === "NGO / CSR Partner" })}
                                                placeholder="City, State"
                                                className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                            />
                                        </div>
                                        <div className="md:col-span-2 space-y-1.5">
                                            <label className="text-sm font-bold text-gray-900">Partnership Interest</label>
                                            <input
                                                {...register("partnershipInterest")}
                                                placeholder="e.g. CSR Funding, Healthcare Delivery, Tech Support"
                                                className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {contactType === "Patient" && (
                                    <motion.div
                                        key="patient-fields"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="grid md:grid-cols-2 gap-6"
                                    >
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-900">Your Location</label>
                                            <input
                                                {...register("location", { required: contactType === "Patient" })}
                                                placeholder="City, District"
                                                className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-gray-900">Type of Assistance Needed</label>
                                            <input
                                                {...register("assistanceNeeded")}
                                                placeholder="e.g. Telemedicine, Medicines, Diagnosis"
                                                className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">Subject</label>
                                <input
                                    {...register("subject", { required: "Subject is required" })}
                                    placeholder="Brief summary of your inquiry"
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none bg-white font-medium shadow-sm"
                                />
                                {errors.subject && <p className="text-xs text-red-500 font-medium">{errors.subject.message}</p>}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-bold text-gray-900">Message</label>
                                <textarea
                                    {...register("message", { required: "Message is required" })}
                                    placeholder="How can we help you?"
                                    rows={4}
                                    className="w-full border border-gray-300 rounded-xl p-3 text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 outline-none resize-none bg-white font-medium shadow-sm"
                                />
                                {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message.message}</p>}
                            </div>

                            <div className="flex items-start gap-2">
                                <input
                                    {...register("consent", { required: true })}
                                    type="checkbox"
                                    id="consent-form"
                                    className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="consent-form" className="text-xs text-gray-900 font-medium">
                                    I consent to Digiswasthya collecting my details through this form.
                                </label>
                            </div>

                            <motion.div
                                whileHover={{ y: -2 }}
                                whileTap={{ y: 0 }}
                            >
                                <Button
                                    disabled={isSubmitting}
                                    className="w-full py-6 text-lg rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex gap-2 items-center justify-center bg-primary-600 hover:bg-primary-700 text-white"
                                    type="submit"
                                >
                                    {isSubmitting ? (
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5" />
                                            Submit Inquiry
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
