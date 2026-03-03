import { StatsCounter } from "@/components/features/StatsCounter";

export function StatsSection() {
    return (
        <section className="py-20 bg-primary-900 text-white">
            <div className="container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold sm:text-4xl text-white">Strength in Numbers</h2>
                    <p className="mt-4 text-primary-100 max-w-2xl mx-auto">
                        Our impact across rural India through dedicated healthcare services.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                    <StatsCounter value={78573} label="Patients Served" suffix="+" />
                    <StatsCounter value={71571} label="Total Consultations" />
                    <StatsCounter value={1851} label="Health & Awareness Camps" />
                    <StatsCounter value={119} label="Health Camps at CHCs/PHCs" />
                    <StatsCounter value={209} label="Expert Doctors Onboard" />
                    <StatsCounter value={2050000} label="Lives Impacted" suffix="+" />
                </div>
            </div>
        </section>
    );
}
