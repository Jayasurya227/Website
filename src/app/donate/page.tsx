"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import {
    ShieldCheck,
    Lock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    CreditCard,
    Zap,
    Loader2,
    Heart,
} from "lucide-react";

const loadExternalScript = (src: string): Promise<boolean> => {
    return new Promise((resolve) => {
        if (typeof window !== "undefined" && document.querySelector(`script[src="${src}"]`)) return resolve(true);
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PRESET_AMOUNTS = [500, 1000, 2500, 5000];

export default function DonatePage() {
    const [amount, setAmount] = useState<number | "">(1000);
    const [method, setMethod] = useState<"razorpay">("razorpay");
    const [isRecurring, setIsRecurring] = useState(false);
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDonation = async () => {
        if (status === "processing") return;
        const donationAmount = Number(amount);
        if (!donationAmount || donationAmount < 100) {
            setErrorMessage("Minimum donation amount is ₹100.");
            return;
        }
        setStatus("processing");
        setErrorMessage(null);
        try {
            const orderPromise = fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: donationAmount, method, isRecurring }),
            });
            const sdkPromise = loadExternalScript("https://checkout.razorpay.com/v1/checkout.js");
            const [response, sdkLoaded] = await Promise.all([orderPromise, sdkPromise]);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Gateway Busy");
            if (!sdkLoaded) throw new Error("Connection unstable");
            if (data.isMock) { setTimeout(() => setStatus("success"), 800); return; }
            const options = {
                key: data.key,
                amount: data.amount,
                currency: data.currency,
                name: "DigiSwasthya",
                description: isRecurring ? "Monthly Healthcare Support" : "Healthcare Contribution",
                order_id: data.orderId,
                handler: () => setStatus("success"),
                modal: { ondismiss: () => setStatus("idle") },
                theme: { color: "#1a6fa8" },
                prefill: { name: donorName, email: donorEmail, contact: "" }
            };
            const rzp = new (window as any).Razorpay(options);
            rzp.open();
        } catch (err: any) {
            setErrorMessage(err.message || "Temporary issue. Please try again.");
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    return (
        <main className="ds-donate-page">
            <Navbar />

            {/* ── Hero Strip ── */}
            <div className="ds-hero">
                <div className="ds-hero-inner">
                    <div className="ds-hero-badge">
                        <Heart size={13} fill="#ff8a80" color="#ff8a80" />
                        <span>Support DigiSwasthya Foundation</span>
                    </div>
                    <h1 className="ds-hero-title">Every Rupee Saves a Life</h1>
                    <p className="ds-hero-sub">
                        Help us bring quality healthcare to underserved communities across rural India.
                    </p>
                    <div className="ds-hero-stats">
                        <div className="ds-stat">
                            <span className="ds-stat-num">50,000+</span>
                            <span className="ds-stat-label">Lives Impacted</span>
                        </div>
                        <div className="ds-stat-div" />
                        <div className="ds-stat">
                            <span className="ds-stat-num">120+</span>
                            <span className="ds-stat-label">Villages Reached</span>
                        </div>
                        <div className="ds-stat-div" />
                        <div className="ds-stat">
                            <span className="ds-stat-num">80G</span>
                            <span className="ds-stat-label">Tax Exempt</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Main Content ── */}
            <section className="ds-section">
                <div className="ds-container">
                    <div className="ds-grid">

                        {/* ── LEFT: Images ── */}
                        <div className="ds-images-col">

                            {/* Image A — Medical Camp (Primary Featured) */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65 }}
                                className="ds-img-wrap ds-img-primary"
                            >
                                <div className="ds-img-frame">
                                    <Image
                                        src="/images/ds-medical-camp.jpg"
                                        alt="DigiSwasthya Foundation medical camp — healthcare workers providing services to rural beneficiaries"
                                        width={720}
                                        height={460}
                                        className="ds-img"
                                        priority
                                    />
                                </div>
                                <div className="ds-img-badge ds-badge-green">
                                    <span className="ds-badge-dot" style={{ background: "#4caf50" }} />
                                    <span>DigiSwasthya Medical Camp</span>
                                </div>
                            </motion.div>

                            {/* Image B — Community Outreach (Secondary Supporting) */}
                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.65, delay: 0.18 }}
                                className="ds-img-wrap ds-img-secondary"
                            >
                                <div className="ds-img-frame">
                                    <Image
                                        src="/images/ds-community-outreach.jpg"
                                        alt="DigiSwasthya Foundation community outreach — healthcare worker consulting women and child beneficiaries"
                                        width={720}
                                        height={340}
                                        className="ds-img"
                                    />
                                </div>
                                <div className="ds-img-badge ds-badge-blue">
                                    <span className="ds-badge-dot" style={{ background: "#42a5f5" }} />
                                    <span>Community Healthcare Outreach</span>
                                </div>
                            </motion.div>

                            {/* Impact Statement */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="ds-impact-card"
                            >
                                <div className="ds-impact-icon">
                                    <Heart size={18} fill="#fff" color="#fff" />
                                </div>
                                <p className="ds-impact-text">
                                    <strong>Your contribution</strong> helps bring essential healthcare services to underserved communities across rural India.
                                </p>
                            </motion.div>
                        </div>

                        {/* ── RIGHT: Donation Form ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 28 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.65, delay: 0.1 }}
                            className="ds-form-col"
                        >
                            <div className="ds-form-card">

                                <AnimatePresence mode="wait">
                                    {status === "success" ? (

                                        /* ── IN-CARD SUCCESS STATE ── */
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.45, ease: "easeOut" }}
                                            className="ds-card-success"
                                        >
                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 18 }}
                                                className="ds-card-success-icon"
                                            >
                                                <CheckCircle2 size={56} color="#2e7d32" strokeWidth={1.8} />
                                            </motion.div>

                                            <motion.h2
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.22, duration: 0.38 }}
                                                className="ds-card-success-title"
                                            >
                                                ❤️ Thank You for Your Contribution
                                            </motion.h2>

                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.32, duration: 0.38 }}
                                                className="ds-card-success-msg"
                                            >
                                                Your support enables DigiSwasthya Foundation to continue
                                                providing essential healthcare services to underserved communities.
                                            </motion.p>

                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.42, duration: 0.34 }}
                                                className="ds-card-success-amount"
                                            >
                                                {isRecurring ? "Monthly" : "One-time"} Contribution: <strong>₹{Number(amount).toLocaleString("en-IN")}</strong>
                                            </motion.div>

                                            <motion.a
                                                href="/"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.52, duration: 0.34 }}
                                                className="ds-card-success-btn"
                                            >
                                                Return to Home <ArrowRight size={16} />
                                            </motion.a>
                                        </motion.div>

                                    ) : (

                                        /* ── DONATION FORM ── */
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 1 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Form Header */}
                                            <div className="ds-form-header">
                                                <div className="ds-form-header-left">
                                                    <Lock size={15} color="#a5d6a7" />
                                                    <span>Secure Donation</span>
                                                </div>
                                                <div className="ds-form-header-right">
                                                    <ShieldCheck size={13} color="#80cbc4" />
                                                    <span>SSL Encrypted</span>
                                                </div>
                                            </div>

                                            <div className="ds-form-body">

                                                {/* One-time / Monthly Toggle */}
                                                <div className="ds-toggle">
                                                    <button
                                                        id="btn-one-time"
                                                        className={`ds-toggle-btn${!isRecurring ? " ds-toggle-active" : ""}`}
                                                        onClick={() => setIsRecurring(false)}
                                                    >
                                                        One-time
                                                    </button>
                                                    <button
                                                        id="btn-monthly"
                                                        className={`ds-toggle-btn${isRecurring ? " ds-toggle-active ds-toggle-active-monthly" : ""}`}
                                                        onClick={() => setIsRecurring(true)}
                                                    >
                                                        Monthly
                                                    </button>
                                                </div>

                                                {/* Preset Amounts */}
                                                <div className="ds-field-group">
                                                    <label className="ds-label">Select Amount</label>
                                                    <div className="ds-presets">
                                                        {PRESET_AMOUNTS.map((preset) => (
                                                            <button
                                                                key={preset}
                                                                id={`preset-${preset}`}
                                                                className={`ds-preset-btn${amount === preset ? " ds-preset-active" : ""}`}
                                                                onClick={() => setAmount(preset)}
                                                            >
                                                                ₹{preset.toLocaleString("en-IN")}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Custom Amount */}
                                                <div className="ds-field-group">
                                                    <label className="ds-label">Or Enter Custom Amount</label>
                                                    <div className="ds-input-wrap">
                                                        <span className="ds-rupee">₹</span>
                                                        <Input
                                                            id="donation-amount-input"
                                                            type="number"
                                                            value={amount}
                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                                setAmount(e.target.value === "" ? "" : Number(e.target.value))
                                                            }
                                                            placeholder="Enter amount"
                                                            className="ds-amount-input"
                                                        />
                                                    </div>
                                                    <p className="ds-hint">Minimum donation amount is ₹100</p>
                                                </div>

                                                {/* Donor Name */}
                                                <div className="ds-field-group">
                                                    <label className="ds-label" htmlFor="donor-name-input">Your Name</label>
                                                    <Input
                                                        id="donor-name-input"
                                                        type="text"
                                                        value={donorName}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorName(e.target.value)}
                                                        placeholder="Enter your full name"
                                                        className="ds-text-input"
                                                    />
                                                </div>

                                                {/* Donor Email */}
                                                <div className="ds-field-group">
                                                    <label className="ds-label" htmlFor="donor-email-input">Email Address</label>
                                                    <Input
                                                        id="donor-email-input"
                                                        type="email"
                                                        value={donorEmail}
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDonorEmail(e.target.value)}
                                                        placeholder="Enter your email address"
                                                        className="ds-text-input"
                                                    />
                                                </div>

                                                {/* Payment Method */}
                                                <div className="ds-field-group">
                                                    <label className="ds-label">Payment Method</label>
                                                    <div className="ds-methods">
                                                        <button
                                                            id="method-razorpay"
                                                            className="ds-method-btn ds-method-active"
                                                            onClick={() => setMethod("razorpay")}
                                                        >
                                                            <CreditCard size={20} color="#1a6fa8" />
                                                            <span>Cards / UPI</span>
                                                        </button>
                                                        <button
                                                            id="method-razorpay-2"
                                                            className="ds-method-btn ds-method-active"
                                                            onClick={() => setMethod("razorpay")}
                                                        >
                                                            <Zap size={20} color="#1a6fa8" />
                                                            <span>Razorpay</span>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Error */}
                                                <AnimatePresence>
                                                    {status === "error" && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 8 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0 }}
                                                            className="ds-error"
                                                        >
                                                            <AlertCircle size={15} color="#e53935" />
                                                            <span>{errorMessage}</span>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Donate Button */}
                                                <button
                                                    id="donate-now-btn"
                                                    className={`ds-donate-btn${status === "processing" ? " ds-donate-btn-processing" : ""}`}
                                                    onClick={handleDonation}
                                                    disabled={status === "processing"}
                                                >
                                                    {status === "processing" ? (
                                                        <>
                                                            <Loader2 size={20} className="ds-spin" />
                                                            <span>Processing...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Heart size={18} fill="#fff" color="#fff" />
                                                            <span>Donate {isRecurring ? "Monthly" : "Now"}</span>
                                                            <ArrowRight size={18} />
                                                        </>
                                                    )}
                                                </button>

                                                {/* Trust Row */}
                                                <div className="ds-trust">
                                                    <Lock size={12} color="#90a4ae" />
                                                    <span>Secure Donation</span>
                                                    <span className="ds-trust-dot">•</span>
                                                    <ShieldCheck size={12} color="#90a4ae" />
                                                    <span>Transparent Utilization of Funds</span>
                                                </div>

                                                {/* NGO ID */}
                                                <div className="ds-ngo-id">
                                                    NGO Reg. No: <span>U85300UP2020NPL130635</span>
                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Footer />

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

                /* ── Base ── */
                .ds-donate-page {
                    min-height: 100vh;
                    background: #f8fafc;
                    font-family: 'Inter', 'Segoe UI', sans-serif;
                }

                /* ── Hero ── */
                .ds-hero {
                    background: linear-gradient(135deg, #0d3b6e 0%, #1a6fa8 55%, #1b8f5e 100%);
                    padding: 52px 24px 60px;
                    text-align: center;
                    position: relative;
                    overflow: hidden;
                }
                .ds-hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 15% 85%, rgba(255,255,255,0.06) 0%, transparent 45%),
                        radial-gradient(circle at 85% 15%, rgba(255,255,255,0.06) 0%, transparent 45%);
                }
                .ds-hero-inner { position: relative; z-index: 1; }
                .ds-hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    background: rgba(255,255,255,0.14);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255,255,255,0.22);
                    border-radius: 50px;
                    padding: 6px 18px;
                    margin-bottom: 18px;
                    color: rgba(255,255,255,0.92);
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.09em;
                    text-transform: uppercase;
                }
                .ds-hero-title {
                    color: #fff;
                    font-size: clamp(1.9rem, 4vw, 2.7rem);
                    font-weight: 800;
                    margin: 0 0 14px;
                    line-height: 1.2;
                }
                .ds-hero-sub {
                    color: rgba(255,255,255,0.78);
                    font-size: 16px;
                    max-width: 520px;
                    margin: 0 auto 32px;
                    line-height: 1.65;
                }
                .ds-hero-stats {
                    display: inline-flex;
                    align-items: center;
                    gap: 24px;
                    background: rgba(255,255,255,0.1);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.18);
                    border-radius: 20px;
                    padding: 16px 32px;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                .ds-stat { text-align: center; }
                .ds-stat-num {
                    display: block;
                    font-size: 22px;
                    font-weight: 800;
                    color: #fff;
                    line-height: 1;
                    margin-bottom: 4px;
                }
                .ds-stat-label {
                    font-size: 11px;
                    color: rgba(255,255,255,0.72);
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .ds-stat-div {
                    width: 1px;
                    height: 36px;
                    background: rgba(255,255,255,0.25);
                }

                /* ── Section ── */
                .ds-section { padding: 64px 0 80px; }
                .ds-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 24px;
                }
                .ds-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 48px;
                    align-items: start;
                }
                @media (max-width: 900px) {
                    .ds-grid { grid-template-columns: 1fr; }
                }

                /* ── Images ── */
                .ds-images-col { display: flex; flex-direction: column; gap: 20px; }
                .ds-img-wrap { position: relative; }
                .ds-img-frame {
                    border-radius: 20px;
                    overflow: hidden;
                    background: #e2e8f0;
                }
                .ds-img {
                    width: 100%;
                    height: auto;
                    display: block;
                    object-fit: cover;
                }
                .ds-img-badge {
                    position: absolute;
                    bottom: 14px;
                    left: 14px;
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    background: rgba(255,255,255,0.95);
                    backdrop-filter: blur(8px);
                    border-radius: 50px;
                    padding: 6px 14px;
                    font-size: 12px;
                    font-weight: 700;
                    color: #1a2a3a;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
                }
                .ds-badge-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }
                .ds-impact-card {
                    display: flex;
                    align-items: flex-start;
                    gap: 14px;
                    background: linear-gradient(135deg, #0d3b6e, #1a6fa8);
                    border-radius: 16px;
                    padding: 20px 22px;
                }
                .ds-impact-icon {
                    width: 36px;
                    height: 36px;
                    border-radius: 10px;
                    background: rgba(255,255,255,0.18);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }
                .ds-impact-text {
                    color: rgba(255,255,255,0.9);
                    font-size: 14px;
                    line-height: 1.65;
                    margin: 0;
                }
                .ds-impact-text strong { color: #fff; }

                /* ── Form Card ── */
                .ds-form-col { position: sticky; top: 24px; }
                .ds-form-card {
                    background: #fff;
                    border-radius: 28px;
                    border: 1px solid #e8eef5;
                    box-shadow: 0 20px 60px rgba(13,59,110,0.1), 0 4px 16px rgba(0,0,0,0.04);
                    overflow: hidden;
                }
                .ds-form-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 16px 24px;
                    background: linear-gradient(90deg, #0d3b6e, #1a6fa8);
                }
                .ds-form-header-left, .ds-form-header-right {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: rgba(255,255,255,0.88);
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.07em;
                    text-transform: uppercase;
                }
                .ds-form-body { padding: 28px 28px 24px; }

                /* ── Toggle ── */
                .ds-toggle {
                    display: flex;
                    background: #f1f5f9;
                    border-radius: 14px;
                    padding: 5px;
                    gap: 4px;
                    margin-bottom: 28px;
                }
                .ds-toggle-btn {
                    flex: 1;
                    padding: 12px 0;
                    border-radius: 11px;
                    border: none;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    transition: all 0.22s ease;
                    background: transparent;
                    color: #94a3b8;
                }
                .ds-toggle-active {
                    background: #fff;
                    color: #0d3b6e;
                    box-shadow: 0 2px 10px rgba(13,59,110,0.12);
                }
                .ds-toggle-active-monthly { color: #1a6fa8; }

                /* Field Groups */
                .ds-field-group { margin-bottom: 24px; }
                .ds-label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    color: #37474f;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    margin-bottom: 12px;
                }

                /* Presets */
                .ds-presets {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 8px;
                }
                .ds-preset-btn {
                    padding: 13px 6px;
                    border-radius: 12px;
                    border: 2px solid #e2e8f0;
                    background: #f8fafc;
                    color: #64748b;
                    font-weight: 700;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .ds-preset-btn:hover {
                    border-color: #93c5fd;
                    background: #f0f7ff;
                    color: #0d3b6e;
                }
                .ds-preset-active {
                    border-color: #1a6fa8 !important;
                    background: linear-gradient(135deg, #e3f2fd, #e8f5e9) !important;
                    color: #0d3b6e !important;
                    box-shadow: 0 0 0 3px rgba(26,111,168,0.08);
                }

                /* Custom Amount Input */
                .ds-input-wrap { position: relative; }
                .ds-rupee {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #0d3b6e;
                    font-weight: 800;
                    font-size: 22px;
                    pointer-events: none;
                    z-index: 1;
                }
                .ds-amount-input {
                    height: 68px !important;
                    padding-left: 44px !important;
                    border-radius: 14px !important;
                    border: 2px solid #e2e8f0 !important;
                    background: #f8fafc !important;
                    font-size: 22px !important;
                    font-weight: 800 !important;
                    color: #0d1b2a !important;
                    outline: none !important;
                    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                .ds-amount-input:focus {
                    border-color: #1a6fa8 !important;
                    box-shadow: 0 0 0 4px rgba(26,111,168,0.09) !important;
                    background: #fff !important;
                }
                .ds-hint {
                    font-size: 11px;
                    color: #b0bec5;
                    margin-top: 7px;
                    padding-left: 2px;
                }

                /* Text Inputs (Name / Email) */
                .ds-text-input {
                    height: 54px !important;
                    padding: 0 18px !important;
                    border-radius: 14px !important;
                    border: 2px solid #b0bec5 !important;
                    background: #f0f4f7 !important;
                    font-size: 16px !important;
                    font-weight: 600 !important;
                    color: #1a2a3a !important;
                    outline: none !important;
                    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, transform 0.2s ease !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                .ds-text-input::placeholder {
                    color: #90a4ae !important;
                    font-weight: 400 !important;
                }
                .ds-text-input:hover {
                    border-color: #78909c !important;
                    background: #eaf0f5 !important;
                }
                .ds-text-input:focus {
                    border-color: #1a6fa8 !important;
                    box-shadow: 0 0 0 4px rgba(26,111,168,0.13) !important;
                    background: #fff !important;
                    transform: translateY(-1px) !important;
                }

                /* Payment Methods */
                .ds-methods {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }
                .ds-method-btn {
                    padding: 18px 12px;
                    border-radius: 14px;
                    border: 2px solid #e2e8f0;
                    background: #f8fafc;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    opacity: 0.6;
                    font-size: 11px;
                    font-weight: 700;
                    color: #0d3b6e;
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                }
                .ds-method-btn:hover {
                    border-color: #93c5fd;
                    background: #f0f7ff;
                    opacity: 0.85;
                }
                .ds-method-active {
                    border-color: #1a6fa8 !important;
                    background: linear-gradient(135deg, #e3f2fd, #f0f7ff) !important;
                    opacity: 1 !important;
                    box-shadow: 0 0 0 3px rgba(26,111,168,0.08);
                }

                /* Error */
                .ds-error {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 14px 16px;
                    background: #fff5f5;
                    border: 1px solid #ffcdd2;
                    border-radius: 12px;
                    margin-bottom: 16px;
                    color: #c62828;
                    font-size: 13px;
                    font-weight: 600;
                }

                /* Donate Button */
                .ds-donate-btn {
                    width: 100%;
                    padding: 22px 24px;
                    border-radius: 16px;
                    border: none;
                    background: linear-gradient(135deg, #0d3b6e 0%, #1a6fa8 50%, #1b8f5e 100%);
                    color: #fff;
                    font-size: 17px;
                    font-weight: 800;
                    letter-spacing: 0.03em;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    box-shadow: 0 8px 32px rgba(13,59,110,0.30);
                    transition: transform 0.22s ease, box-shadow 0.22s ease;
                    margin-bottom: 20px;
                    position: relative;
                    overflow: hidden;
                }
                .ds-donate-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent);
                    opacity: 0;
                    transition: opacity 0.22s;
                }
                .ds-donate-btn:hover::after { opacity: 1; }
                .ds-donate-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 44px rgba(13,59,110,0.38);
                }
                .ds-donate-btn:active { transform: translateY(-1px); }
                .ds-donate-btn-processing {
                    background: #b0bec5 !important;
                    box-shadow: none !important;
                    cursor: not-allowed !important;
                    transform: none !important;
                }

                /* Trust */
                .ds-trust {
                    border-top: 1px solid #f1f5f9;
                    padding-top: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    flex-wrap: wrap;
                    color: #78909c;
                    font-size: 12px;
                    font-weight: 600;
                }
                .ds-trust-dot { color: #cfd8dc; margin: 0 2px; }

                /* NGO ID */
                .ds-ngo-id {
                    text-align: center;
                    margin-top: 14px;
                    font-size: 10px;
                    color: #b0bec5;
                    letter-spacing: 0.08em;
                    font-weight: 600;
                    text-transform: uppercase;
                }
                .ds-ngo-id span {
                    color: #90a4ae;
                    font-family: monospace;
                }

                /* ── In-Card Success State ── */
                .ds-card-success {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 48px 28px 52px;
                    min-height: 480px;
                }
                .ds-card-success-icon {
                    width: 96px;
                    height: 96px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #e8f5e9, #f1f8f1);
                    border: 2px solid #a5d6a7;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 28px;
                    box-shadow: 0 8px 24px rgba(46,125,50,0.12);
                }
                .ds-card-success-title {
                    font-size: 22px;
                    font-weight: 800;
                    color: #0d1b2a;
                    margin-bottom: 16px;
                    line-height: 1.35;
                    max-width: 320px;
                }
                .ds-card-success-msg {
                    font-size: 14px;
                    color: #546e7a;
                    line-height: 1.75;
                    max-width: 340px;
                    margin-bottom: 24px;
                    font-weight: 500;
                }
                .ds-card-success-amount {
                    display: inline-block;
                    background: #e8f5e9;
                    border: 1px solid #a5d6a7;
                    border-radius: 50px;
                    padding: 8px 20px;
                    font-size: 13px;
                    color: #2e7d32;
                    font-weight: 600;
                    margin-bottom: 32px;
                    letter-spacing: 0.02em;
                }
                .ds-card-success-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #1a6fa8, #1b8f5e);
                    color: #fff;
                    font-weight: 700;
                    font-size: 14px;
                    padding: 14px 32px;
                    border-radius: 50px;
                    text-decoration: none;
                    box-shadow: 0 6px 20px rgba(26,111,168,0.28);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .ds-card-success-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 28px rgba(26,111,168,0.36);
                }

                /* ── Spin ── */
                .ds-spin { animation: ds-spin 1s linear infinite; }
                @keyframes ds-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* ── Number Input ── */
                input[type=number]::-webkit-inner-spin-button,
                input[type=number]::-webkit-outer-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            `}</style>
        </main>
    );
}
