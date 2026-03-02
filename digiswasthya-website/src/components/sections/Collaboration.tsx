import { Handshake, Building2, HeartHandshake } from "lucide-react";

export function Collaboration() {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Help us to fulfil our mission</h2>
                    <p className="mt-4 text-lg text-gray-600">Here are some of the ways you can collaborate</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <CollabCard
                        title="Impact Investors"
                        icon={<Building2 className="h-10 w-10 text-primary-600 mb-4" />}
                        description="We are looking for social/ impact investors to provide capital and guidance to us to scale up. Apart from patient capital, we seek their know-how in emerging medical technologies and their experiences in implementing public-private partnerships. Comprehensive timely MIS is provided that helps investors to assess the social impact."
                    />
                    <CollabCard
                        title="Centre Sponsors"
                        icon={<Handshake className="h-10 w-10 text-primary-600 mb-4" />}
                        description="We are seeking sponsors to fund the expansion into the rural areas/aspirational districts of their choice where they have significant operations and business. The center can be co-branded with the sponsoring brand. By partnering with us, sponsors can make a meaningful social impact while strengthening their brand presence in underserved regions."
                    />
                    <CollabCard
                        title="Campaign Sponsors"
                        icon={<HeartHandshake className="h-10 w-10 text-primary-600 mb-4" />}
                        description="Companies, trusts, and individuals with a thrust to sponsor specific interventions like breast care detections, girls screening programs for anemia, newborn baby screening programs, diabetic screening, heart screening, etc. A transparent mechanism is implemented wherein the providing organization sends the bill directly to the sponsor."
                    />
                </div>
            </div>
        </section>
    );
}

function CollabCard({ title, description, icon }: { title: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="bg-gray-50 p-8 rounded-xl border hover:shadow-lg transition-shadow">
            {icon}
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
        </div>
    );
}
