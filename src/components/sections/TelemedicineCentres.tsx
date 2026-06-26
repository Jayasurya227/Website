"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MapPin, ExternalLink, Phone } from "lucide-react";

type Centre = {
    id?: string;
    name: string;
    address: string;
    link: string;
    type: string;
    phone: string;
};

const DEFAULT_CENTRES: Centre[] = [
    {
        name: "Sant Kabir Nagar (DS 1)",
        address: "Kali Road, Kathaicha Chauraha, Nath Nagar, Sant Kabir Nagar, Uttar Pradesh - 272176",
        link: "https://maps.app.goo.gl/4gydYNL5zncHEfbVA",
        type: "Flagship Centre",
        phone: "+91 83184 24800",
    },
    {
        name: "Muzaffarpur (DS 2)",
        address: "Deoria Road, Nawanagar Nizamat, Sahebganj, Muzaffarpur, Bihar - 843125",
        link: "https://maps.app.goo.gl/d8C46korjVmwhAE6A",
        type: "Regional Unit",
        phone: "+91 83184 24800",
    },
    {
        name: "Pune (DS 3)",
        address: "Bhawadi, Ambegaon, Distt. Pune, Maharashtra - 410512",
        link: "https://maps.app.goo.gl/p8pZsGphmd76zhrc6",
        type: "Community Unit",
        phone: "+91 83184 24800",
    },
    {
        name: "Palghar (DS 4)",
        address: "407, A wing, Sadiya Apartment, 90th Ft. Rd. Oswal Nagari, Nalasopara East, Palghar, MH- 401209",
        link: "https://maps.app.goo.gl/szyf7NfRfzfHNhV28",
        type: "Regional Hub",
        phone: "+91 83184 24800",
    },
    {
        name: "Asharafpur (DS 5)",
        address: "Near Bharat Gas Agency, Asharafpur, Uttar Pradesh 272162",
        link: "https://maps.app.goo.gl/v4DK68qZuXnsaBpF9",
        type: "Village Unit",
        phone: "+91 83184 24800",
    },
];

export function TelemedicineCentres() {
    const [centres, setCentres] = useState<Centre[]>(DEFAULT_CENTRES);

    useEffect(() => {
        async function fetchCentres() {
            try {
                const colRef = collection(db, "centres");
                const snap = await getDocs(colRef);

                if (!snap.empty) {
                    const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Centre));
                    setCentres(data);
                } else {
                    // First time: seed Firestore with default centres
                    for (const centre of DEFAULT_CENTRES) {
                        const id = centre.name.replace(/\s+/g, "-").toLowerCase();
                        await setDoc(doc(db, "centres", id), centre);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch centres:", err);
                // Fallback to hardcoded centres silently
            }
        }

        fetchCentres();
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container px-4">
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                        <span className="h-px w-6 bg-primary-600" /> Our Network
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                        Find a <span className="text-primary-600">DigiSwasthya</span> Centre Near You
                    </h2>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                        Bringing quality healthcare closer to your home. Locate our technology-enabled health centres across India.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {centres.map((centre, i) => (
                        <div
                            key={centre.id || i}
                            className="bg-white border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all duration-300 p-7 rounded-xl flex flex-col"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
                                        {centre.type}
                                    </span>
                                    <h4 className="text-lg font-semibold text-gray-900 mt-1">
                                        {centre.name}
                                    </h4>
                                </div>
                                <span className="flex h-2 w-2 mt-2 flex-shrink-0">
                                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                            </div>

                            <div className="space-y-2.5 mb-6 flex-grow">
                                <div className="flex items-start gap-2.5">
                                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-gray-500 text-sm leading-relaxed">{centre.address}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-gray-500">{centre.phone}</span>
                                </div>

                            </div>

                            <a
                                href={centre.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-semibold border-t border-gray-100 pt-4 transition-colors"
                            >
                                View on Map <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
