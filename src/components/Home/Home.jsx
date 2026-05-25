import Banner from "./Banner/Banner";
import DocumentTitle from './../../documentTitle/DocumentTitle';
import { Link, useLoaderData } from "react-router-dom";
import PopularServicesCard from "./PopularServicesCard";
import { useContext, useEffect, useState } from "react";
import Client from "./Client";
import { AuthContext } from "../../providers/AuthProviders";
import logo from "../../assets/logo.png"

const Home = () => {
    DocumentTitle('Home');
    const services = useLoaderData();
    const [clients, setClients] = useState([]);
    const { isDark } = useContext(AuthContext);

    useEffect(() => {
        fetch('review.json')
            .then(res => res.json())
            .then(data => setClients(data));
    }, []);

    return (
        <div className="space-y-24 pb-20">
            <Banner />

            {/* Popular services */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        ⚡ Top Rated
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                        Popular <span className="text-gradient-orange">Services</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                        Discover our most in-demand electronic repair services, trusted by thousands of customers. From cracked smartphone displays to corrupted hard drives, our experts handle it all with certified parts.
                    </p>
                </div>
                
                {/* 3-Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        services.slice(0, 6).map(service => (
                            <PopularServicesCard key={service._id} service={service} />
                        ))
                    }
                </div>
                
                <div className="text-center pt-4">
                    <Link to={`/all-services`}>
                        <button className="px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/25 hover:scale-[1.03] active:scale-[0.98] transition-all">
                            View All Services
                        </button>
                    </Link>
                </div>
            </div>

            {/* Clients Review */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        💬 Testimonials
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                        What Our <span className="text-gradient-orange">Clients Say</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                        Read real feedback from customers who experienced our fast, high-quality, and transparent device repair services.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        clients.map((client, index) => (
                            <Client key={index} client={client} />
                        ))
                    }
                </div>
            </div>

            {/* Frequently Asked Question */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                <div className="text-center space-y-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        ❓ Help Center
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                        Frequently Asked <span className="text-gradient-orange">Questions</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                        Got questions? We have got answers. Find quick details about our booking process, repair warranties, and more.
                    </p>
                </div>

                <div className="space-y-4 pt-4">
                    <div className="collapse collapse-plus border border-slate-100 dark:border-white/5 bg-white dark:bg-[#130E26]/50 rounded-2xl shadow-sm transition-all duration-300">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                            What services does the website offer?
                        </div>
                        <div className="collapse-content text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            <p>We provide comprehensive electronic repair solutions including smartphones, gaming consoles, PCs/laptops, television units, and smart appliances.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus border border-slate-100 dark:border-white/5 bg-white dark:bg-[#130E26]/50 rounded-2xl shadow-sm transition-all duration-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                            How can users book a service?
                        </div>
                        <div className="collapse-content text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            <p>Simply navigate to a service card, click "View Details", and then click "Book Now". Fill out our modern scheduling form with your repair date, special instructions, and confirm.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus border border-slate-100 dark:border-white/5 bg-white dark:bg-[#130E26]/50 rounded-2xl shadow-sm transition-all duration-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                            What additional features does the website provide?
                        </div>
                        <div className="collapse-content text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            <p>Beyond booking, registered service providers can manage their offerings, create new repair postings, monitor customer schedules, and track active work statuses in their dynamic dashboard panels.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus border border-slate-100 dark:border-white/5 bg-white dark:bg-[#130E26]/50 rounded-2xl shadow-sm transition-all duration-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                            How does the website handle user authentication?
                        </div>
                        <div className="collapse-content text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            <p>We leverage the Context API paired with robust Firebase Authentication to enable email/password sign-ins as well as one-click Google Social Single Sign-On (SSO) securely.</p>
                        </div>
                    </div>

                    <div className="collapse collapse-plus border border-slate-100 dark:border-white/5 bg-white dark:bg-[#130E26]/50 rounded-2xl shadow-sm transition-all duration-300">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-base md:text-lg font-bold text-slate-800 dark:text-slate-200">
                            Is the website responsive?
                        </div>
                        <div className="collapse-content text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            <p>Yes, absolutely! ElectroFixers is designed with full responsiveness using Tailwind grids, meaning the UI scales flawlessly whether you are on a phone, tablet, or large desktop monitor.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* About US Section (Sleek Dual Column) */}
            <div id="about-us" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`p-8 md:p-16 rounded-3xl border transition-all duration-300 ${isDark === 'dark' ? "bg-[#130E26]/40 border-white/5 shadow-2xl" : "bg-white border-slate-100 shadow-xl"}`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Left Side: Text Details */}
                        <div className="space-y-6">
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                                🛠️ Who We Are
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-slate-100 leading-tight">
                                Delivering Excellence in <span className="text-gradient-orange">Gadget Services</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                                Welcome to ElectroFixers, your ultimate solution for high-quality electronics repair. Our certified specialists carry years of experience in troubleshooting hardware and software malfunctions.
                            </p>
                            <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                                We pride ourselves on transparent pricing, premium warranty protections, and fast turnaround times. We understand the vital role that smartphones, consoles, and computers play in your daily life, which is why we complete most repairs on the same day.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                <div className="space-y-2">
                                    <span className="text-3xl font-black text-orange-500">10k+</span>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Devices Fixed</p>
                                </div>
                                <div className="space-y-2">
                                    <span className="text-3xl font-black text-orange-500">99.8%</span>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Client Satisfaction</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: High-tech Branding Column */}
                        <div className="relative flex justify-center items-center">
                            {/* Floating background glows */}
                            <div className="absolute w-[200px] h-[200px] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse-glow"></div>
                            
                            {/* Brand Card Graphic */}
                            <div className="backdrop-blur-md bg-orange-500/5 dark:bg-white/5 border border-orange-500/10 dark:border-white/10 p-10 rounded-3xl w-full max-w-md shadow-2xl flex flex-col items-center justify-center space-y-6 text-center group hover:border-orange-500/30 transition-all duration-300">
                                <img src={logo} className="w-32 h-28 object-contain animate-float-slow" alt="ElectroFixers Emblem" />
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-slate-800 dark:text-slate-200">
                                        ElectroFixers Inc.
                                    </h3>
                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest">
                                        Established 2024
                                    </p>
                                </div>
                                <div className="w-full h-[1px] bg-slate-200/50 dark:bg-white/5"></div>
                                <p className="text-xs text-slate-400 italic">
                                    "Precision diagnostics, authentic components, and reliable repair support."
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;