"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ShieldCheck,
    Lock,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    CreditCard,
    Wallet,
    Loader2,
    Activity,
    Heart
} from "lucide-react";

// Zero-latency Script Loader
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


export default function DonatePage() {
    const [amount, setAmount] = useState<number | "">(1000);
    const [method, setMethod] = useState<"razorpay" | "paypal">("razorpay");
    const [isRecurring, setIsRecurring] = useState(false);
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
            // 1. Lightweight Order Creation (<500ms)
            const orderPromise = fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: donationAmount, method, isRecurring }),
            });

            // 2. Parallel SDK Loading
            const sdkPromise = method === "razorpay"
                ? loadExternalScript("https://checkout.razorpay.com/v1/checkout.js")
                : Promise.resolve(true);

            const [response, sdkLoaded] = await Promise.all([orderPromise, sdkPromise]);
            const data = await response.json();

            if (!response.ok) throw new Error(data.error || "Gateway Busy");
            if (!sdkLoaded) throw new Error("Connection unstable");

            if (method === "razorpay") {
                if (data.isMock) {
                    setTimeout(() => setStatus("success"), 800);
                    return;
                }

                const options = {
                    key: data.key,
                    amount: data.amount,
                    currency: data.currency,
                    name: "DigiSwasthya",
                    description: isRecurring ? "Monthly Healthcare Support" : "Healthcare Contribution",
                    order_id: data.orderId,
                    handler: () => setStatus("success"),
                    modal: { ondismiss: () => setStatus("idle") },
                    theme: { color: "#0ea5e9" },
                    prefill: { email: "", contact: "" }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            } else {
                window.location.href = data.approvalUrl || "#";
            }

        } catch (err: any) {
            setErrorMessage(err.message || "Temporary issue. Please try again.");
            setStatus("error");
            setTimeout(() => setStatus("idle"), 3000);
        }
    };

    if (status === "success") {
        return (
            <main className="min-h-screen bg-white">
                <Navbar />
                <div className="container py-40 flex flex-col items-center text-center">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-8 border border-emerald-100">
                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                    </motion.div>
                    <h1 className="text-5xl font-black text-gray-900 mb-6">Thank You!</h1>
                    <p className="text-xl text-gray-500 max-w-lg mb-10 leading-relaxed">
                        {isRecurring ? "Your monthly contribution of" : "Your contribution of"} <span className="text-gray-900 font-bold">₹{amount}</span> is saving lives in rural India.
                    </p>
                    <Button asChild size="lg" className="rounded-2xl px-12 py-8 text-lg font-bold shadow-xl shadow-primary-600/20">
                        <a href="/">Return to Home</a>
                    </Button>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8FAFC]">
            <Navbar />
            <section className="py-24">
                <div className="container max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-20 items-start">

                        {/* Impact & Transparency Side */}
                        <div className="space-y-10 lg:sticky lg:top-32">
                            <div className="space-y-6">
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-bold border border-primary-100">
                                    <ShieldCheck className="w-4 h-4" /> 100% Impact Transparency
                                </motion.div>
                                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1]">
                                    Your Contribution, <br /><span className="text-primary-600">Purely Purpose-Driven</span>
                                </h1>
                                <p className="text-lg text-slate-500 leading-relaxed">
                                    At DigiSwasthya, we ensure every rupee is optimized to provide immediate medical relief to those who need it most.
                                </p>
                            </div>

                            {/* Fund Breakdown Card */}
                            <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-8">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                                    <Activity className="w-5 h-5 text-primary-600" /> Fund Utilization
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        { label: "Patient Care & Medicines", p: "70%", color: "bg-primary-600" },
                                        { label: "Diagnostics & Telemedicine", p: "20%", color: "bg-emerald-500" },
                                        { label: "Awareness & Community Outreach", p: "10%", color: "bg-amber-500" },
                                    ].map((item, i) => (
                                        <div key={i} className="space-y-3">
                                            <div className="flex justify-between text-sm font-bold items-center">
                                                <span className="text-slate-600">{item.label}</span>
                                                <span className="px-2 py-1 bg-slate-50 rounded-lg text-slate-900 text-xs">{item.p}</span>
                                            </div>
                                            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: item.p }}
                                                    transition={{ duration: 1.2, delay: i * 0.1, ease: "circOut" }}
                                                    className={`h-full ${item.color}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none">
                                        NGO ID: <span className="text-slate-900 font-mono">U85300UP2020NPL130635</span>
                                    </p>
                                    <div className="flex gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest leading-none">Audited & Verified</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "SSL Secured", icon: Lock, color: "text-slate-400" },
                                    { label: "Tax Benefits", icon: ShieldCheck, color: "text-slate-400" },
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-slate-50/50 rounded-2xl border border-slate-200/50">
                                        <item.icon className={`w-4 h-4 ${item.color}`} />
                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden relative"
                        >
                            <div className="bg-slate-900 p-5 text-center flex items-center justify-center gap-3">
                                <Lock className="w-4 h-4 text-emerald-400" />
                                <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">Guaranteed Secure Transaction</span>
                            </div>

                            <div className="p-8 md:p-12 space-y-10">
                                {/* Type Toggle */}
                                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                                    <button
                                        onClick={() => setIsRecurring(false)}
                                        className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${!isRecurring ? "bg-white text-slate-900 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                    > One-time</button>
                                    <button
                                        onClick={() => setIsRecurring(true)}
                                        className={`flex-1 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${isRecurring ? "bg-white text-primary-600 shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
                                    > Monthly</button>
                                </div>

                                {/* Amount */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Enter Donation Amount</label>
                                    <div className="relative group">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-900 font-black text-2xl group-focus-within:text-primary-600">₹</div>
                                        <Input
                                            type="number"
                                            value={amount}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                                            placeholder="Enter amount (e.g. 500, 1000, 5000)"
                                            className="h-20 pl-14 rounded-3xl border-slate-100 bg-slate-50 font-black text-2xl text-slate-900 focus:bg-white focus:ring-8 focus:ring-primary-500/5 focus:border-primary-600 transition-all shadow-inner"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-medium px-2 italic">Minimum donation amount is ₹100</p>
                                </div>

                                {/* Method */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">Payment Method</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setMethod("razorpay")}
                                            className={`p-6 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${method === "razorpay"
                                                ? "border-primary-600 bg-primary-50 shadow-md"
                                                : "border-slate-50 opacity-50 hover:opacity-100 hover:border-slate-200"
                                                }`}
                                        >
                                            <CreditCard className="w-6 h-6 text-primary-600" />
                                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Cards/UPI</span>
                                        </button>
                                        <button
                                            onClick={() => setMethod("paypal")}
                                            className={`p-6 rounded-[32px] border-2 flex flex-col items-center gap-3 transition-all ${method === "paypal"
                                                ? "border-primary-600 bg-primary-50 shadow-md"
                                                : "border-slate-50 opacity-50 hover:opacity-100 hover:border-slate-200"
                                                }`}
                                        >
                                            <Wallet className="w-6 h-6 text-primary-600" />
                                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">PayPal</span>
                                        </button>
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="space-y-6">
                                    <AnimatePresence>
                                        {status === "error" && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-5 bg-rose-50 text-rose-600 rounded-2xl text-xs font-black flex items-center gap-3 border border-rose-100">
                                                <AlertCircle className="w-4 h-4 shrink-0" /> {errorMessage}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <Button
                                        onClick={handleDonation}
                                        disabled={status === "processing"}
                                        className="w-full h-24 rounded-[32px] text-2xl font-black gap-4 shadow-[0_20px_40px_-12px_rgba(14,165,233,0.4)] relative overflow-hidden group active:scale-[0.98] transition-transform"
                                    >
                                        {status === "processing" ? (
                                            <>
                                                <Loader2 className="w-7 h-7 animate-spin" />
                                                <span className="tracking-tight">Initializing...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Donate {isRecurring ? "Monthly" : "Now"}</span>
                                                <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-500" />
                                            </>
                                        )}
                                    </Button>

                                    <div className="flex justify-center items-center gap-8 py-2">
                                        <div className="flex items-center gap-2">
                                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">78K+ Beneficiaries</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                        <div className="flex items-center gap-2">
                                            <ShieldCheck className="w-3 h-3 text-primary-500" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">100% Tax Exempt</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
