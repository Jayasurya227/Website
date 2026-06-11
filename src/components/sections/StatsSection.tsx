import { StatsCounter } from "@/components/features/StatsCounter";

export function StatsSection() {
    return (
        <section className="py-16 bg-primary-900 text-white">
            <div className="container">
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 xl:gap-6">
                    <div className="xl:col-span-6 mb-2">
                        <div className="inline-flex items-center gap-2 text-secondary-400 text-sm font-semibold uppercase tracking-widest mb-1">
                            <span className="h-px w-6 bg-secondary-400" /> Our Impact
                        </div>
                        <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">
                            Strength in Numbers
                        </h2>
                    </div>
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
