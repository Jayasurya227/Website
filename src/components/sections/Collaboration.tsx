import React from "react";

export function Collaboration() {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                {/* Header */}
                <div className="max-w-2xl mb-14">
                    <div className="inline-flex items-center gap-2 text-primary-600 text-sm font-semibold uppercase tracking-widest mb-4">
                        <span className="h-px w-6 bg-primary-600" /> Partner With Us
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
                        Help us fulfil our mission
                    </h2>
                    <p className="mt-4 text-gray-500 leading-relaxed">
                        Here are some of the ways you can collaborate with DigiSwasthya Foundation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CollabCard
                        number="01"
                        title="Impact Investors"
                        description="We are looking for social/impact investors to provide capital and guidance to scale up. Apart from patient capital, we seek know-how in emerging medical technologies and experiences in implementing public-private partnerships."
                    />
                    <CollabCard
                        number="02"
                        title="Centre Sponsors"
                        description="We are seeking sponsors to fund expansion into rural areas and aspirational districts of their choice. The center can be co-branded with the sponsoring brand, making a meaningful social impact while strengthening your brand presence."
                    />
                    <CollabCard
                        number="03"
                        title="Campaign Sponsors"
                        description="Companies, trusts, and individuals with a thrust to sponsor specific interventions like breast care detections, girls screening for anemia, newborn baby screening, diabetic screening, and heart screening programs."
                    />
                </div>
            </div>
        </section>
    );
}

function CollabCard({ number, title, description }: { number: string; title: string; description: string }) {
    return (
        <div className="group border-t-2 border-gray-100 hover:border-primary-500 pt-7 transition-colors duration-300">
            <div className="text-5xl font-serif font-bold text-gray-300 group-hover:text-primary-300 transition-colors duration-300 mb-4 leading-none">
                {number}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
        </div>
    );
}
