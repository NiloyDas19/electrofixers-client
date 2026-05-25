import { Link, useLoaderData } from "react-router-dom";
import DocumentTitle from './../../documentTitle/DocumentTitle';
import { HiOutlineMapPin, HiCheckCircle, HiShieldCheck, HiOutlineSparkles } from "react-icons/hi2";

const ServiceDetails = () => {
    DocumentTitle('View Details');
    const service = useLoaderData();
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 relative z-10">
            
            {/* Page Header */}
            <div className="space-y-2 border-b border-slate-200 dark:border-white/5 pb-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    🛠️ Service Details
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-100">
                    {serviceName}
                </h1>
            </div>

            {/* Split Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                
                {/* Left Column: Image, Details & Diagnostic Bullet Points (66% Width) */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* Visual Banner Image */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-xl">
                        <img 
                            src={imageUrl} 
                            className="w-full h-full object-cover animate-pulse-glow" 
                            alt={serviceName} 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-orange-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg">
                            <HiOutlineMapPin className="w-4 h-4" />
                            {serviceArea}
                        </div>
                    </div>

                    {/* Service Description Section */}
                    <div className="bg-white dark:bg-[#130E26]/60 border border-slate-100 dark:border-white/5 rounded-3xl p-8 space-y-6 shadow-sm">
                        <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <HiOutlineSparkles className="text-orange-500 w-6 h-6" />
                            About This Service
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                            {description}
                        </p>

                        <div className="border-t border-slate-100 dark:border-white/5 pt-6 space-y-4">
                            <h4 className="font-bold text-slate-800 dark:text-slate-200">What is included in this repair?</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-500 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <HiCheckCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
                                    Complete diagnostic troubleshooting
                                </li>
                                <li className="flex items-center gap-2">
                                    <HiCheckCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
                                    Premium quality brand-authentic parts
                                </li>
                                <li className="flex items-center gap-2">
                                    <HiCheckCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
                                    Comprehensive hardware performance tests
                                </li>
                                <li className="flex items-center gap-2">
                                    <HiCheckCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
                                    90-Day service warranty coverage
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Right Column: Sticky Pricing, Provider & Booking Widget (33% Width) */}
                <div className="lg:col-span-1 space-y-8 lg:sticky lg:top-28">
                    
                    {/* Booking Glass Widget */}
                    <div className="bg-white dark:bg-[#130E26]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 shadow-xl space-y-6">
                        
                        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-white/5">
                            <span className="text-sm text-slate-400 font-bold uppercase tracking-wider">Service Fee</span>
                            <span className="text-3xl font-black text-orange-500">${price}</span>
                        </div>

                        {/* Fast trust checklist */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                <HiShieldCheck className="text-orange-500 w-5 h-5" />
                                <span>No Hidden Diagnostics Fees</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                <HiShieldCheck className="text-orange-500 w-5 h-5" />
                                <span>Verified OEM Brand Components</span>
                            </div>
                            <div className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
                                <HiShieldCheck className="text-orange-500 w-5 h-5" />
                                <span>Fast Same-Day Turnaround Available</span>
                            </div>
                        </div>

                        {/* CTA checkout button */}
                        <Link to={`/book-now/${_id}`} className="block">
                            <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-wider">
                                Book Appointment
                            </button>
                        </Link>

                    </div>

                    {/* Provider Info Card */}
                    <div className="bg-white dark:bg-[#130E26]/40 border border-slate-100 dark:border-white/5 rounded-3xl p-6 shadow-sm space-y-4">
                        <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider">Your Repair Expert</h4>
                        
                        <div className="flex items-center gap-4">
                            <img 
                                src={providerImageUrl} 
                                className="w-16 h-16 rounded-full object-cover border-2 border-orange-500 shadow-md" 
                                alt={providerName} 
                            />
                            <div>
                                <h3 className="font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                                    {providerName}
                                    <span className="text-[10px] bg-orange-500/10 text-orange-500 font-bold px-2 py-0.5 rounded-full uppercase">
                                        PRO
                                    </span>
                                </h3>
                                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1">
                                    <HiOutlineMapPin className="w-3.5 h-3.5 text-orange-500" />
                                    {serviceArea}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-slate-100 dark:border-white/5 pt-4">
                            <p className="text-xs text-slate-400 leading-relaxed">
                                {providerName} is a top-tier certified electronics technician registered with ElectroFixers, with a high track record of successful diagnostic resolutions.
                            </p>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default ServiceDetails;