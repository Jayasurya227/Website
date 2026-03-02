"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { ContactActions } from "@/components/features/ContactActions";
import { useLanguage } from "@/context/LanguageContext";

type FormData = {
    name: string;
    email: string;
    message: string;
    consent: boolean;
};

export function Footer() {
    const { t } = useLanguage();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        // Ideally send to API
        console.log("Form Data:", data);
        alert(t("footer.success"));
    };

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {/* Brand & Address */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white">DigiSwasthya</h3>
                        <p className="text-sm">
                            {t("footer.tagline")}
                        </p>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+91 83184 24800</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>info@digiswasthya.org</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 mt-1" />
                                <span>{t("footer.address")}</span>
                            </div>
                        </div>
                        <ContactActions variant="compact" />
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.quickLinks")}</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/donate" className="text-primary-400 font-bold hover:underline">{t("nav.donate")}</Link></li>
                            <li><Link href="/" className="hover:text-primary-400">{t("nav.home")}</Link></li>
                            <li><Link href="/about-us" className="hover:text-primary-400">{t("nav.about")}</Link></li>
                            <li><Link href="/contact-us" className="hover:text-primary-400">{t("nav.contact")}</Link></li>
                            <li><Link href="/our-team" className="hover:text-primary-400">{t("nav.team")}</Link></li>
                            <li><Link href="/media" className="hover:text-primary-400">{t("nav.media")}</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.connect")}</h4>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/DigiSwasthya/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400"><Facebook className="h-5 w-5" /></a>
                            <a href="https://x.com/DigiSwasthya" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400"><Twitter className="h-5 w-5" /></a>
                            <a href="https://www.instagram.com/digiswasthya/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400"><Instagram className="h-5 w-5" /></a>
                            <a href="https://www.linkedin.com/company/digiswasthya" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400"><Linkedin className="h-5 w-5" /></a>
                            <a href="https://www.youtube.com/channel/UC52n8c8U4jAtHsIzq7-wKvQ" target="_blank" rel="noopener noreferrer" className="hover:text-primary-400"><Youtube className="h-5 w-5" /></a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">{t("footer.sendMessage")}</h4>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                            <div>
                                <input
                                    {...register("name", { required: true })}
                                    placeholder={t("footer.form.name")}
                                    className="w-full rounded bg-gray-800 border-gray-700 text-sm p-2 focus:ring-primary-500 text-white"
                                />
                                {errors.name && <span className="text-xs text-red-400">{t("footer.form.nameRequired")}</span>}
                            </div>
                            <div>
                                <input
                                    {...register("email", { required: true })}
                                    placeholder={t("footer.form.email")}
                                    type="email"
                                    className="w-full rounded bg-gray-800 border-gray-700 text-sm p-2 focus:ring-primary-500 text-white"
                                />
                                {errors.email && <span className="text-xs text-red-400">{t("footer.form.emailRequired")}</span>}
                            </div>
                            <div>
                                <textarea
                                    {...register("message", { required: true })}
                                    placeholder={t("footer.form.message")}
                                    rows={3}
                                    className="w-full rounded bg-gray-800 border-gray-700 text-sm p-2 focus:ring-primary-500 text-white"
                                />
                                {errors.message && <span className="text-xs text-red-400">{t("footer.form.messageRequired")}</span>}
                            </div>
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    {...register("consent", { required: true })}
                                    id="consent"
                                    className="mt-1 rounded border-gray-700 bg-gray-800"
                                />
                                <label htmlFor="consent" className="text-xs text-gray-400">{t("footer.form.consent")}</label>
                            </div>
                            {errors.consent && <span className="text-xs text-red-400 block">{t("footer.form.consentRequired")}</span>}

                            <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full text-white bg-primary-600 hover:bg-primary-700">
                                {isSubmitting ? t("footer.form.sending") : t("footer.form.submit")}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs text-gray-500">
                    {t("footer.copyright")}
                </div>
            </div>
        </footer>
    );
}
