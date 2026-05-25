import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const { isDark } = useContext(AuthContext);

    return (
        <footer className={`border-t ${isDark === 'dark' ? "bg-[#0B081A]/90 border-white/5" : "bg-slate-50 border-slate-200"} pt-16 pb-12 transition-all duration-300`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    
                    {/* Column 1: Brand Info */}
                    <div className="md:col-span-1 space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <img src={logo} alt="ElectroFixers" className="w-12 h-10 object-contain" />
                            <span className="text-xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                                ELECTRO<span className="text-orange-500">FIXERS</span>
                            </span>
                        </Link>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                            Your premier destination for expert electronic repair services. We fix smartphones, laptops, gaming consoles, and appliances with precision.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-3">
                            <a href="#" className="p-2 rounded-xl bg-slate-200/50 hover:bg-orange-500 dark:bg-white/5 dark:hover:bg-orange-500 text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaFacebookF className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-xl bg-slate-200/50 hover:bg-orange-500 dark:bg-white/5 dark:hover:bg-orange-500 text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaTwitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-xl bg-slate-200/50 hover:bg-orange-500 dark:bg-white/5 dark:hover:bg-orange-500 text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaLinkedinIn className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 rounded-xl bg-slate-200/50 hover:bg-orange-500 dark:bg-white/5 dark:hover:bg-orange-500 text-slate-600 hover:text-white dark:text-slate-400 dark:hover:text-white transition-all duration-300 hover:-translate-y-1">
                                <FaYoutube className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200">Services</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/all-services" className="text-slate-500 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-500 transition-colors">All Repairs</Link></li>
                            <li><a href="#" className="text-slate-500 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-500 transition-colors">Smartphone Repair</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-500 transition-colors">Laptop & PC Repair</a></li>
                            <li><a href="#" className="text-slate-500 hover:text-orange-500 dark:text-slate-400 dark:hover:text-orange-500 transition-colors">Gaming Consoles</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200">Contact Us</h4>
                        <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                            <li>Email: support@electrofixers.com</li>
                            <li>Phone: +1 (555) 019-2834</li>
                            <li>Address: 4512 Tech Plaza, Silicon Valley, CA</li>
                            <li>Hours: Mon - Sat: 9:00 AM - 7:00 PM</li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200">Newsletter</h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Subscribe to receive repair tips, tech updates, and exclusive discount codes.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="w-full px-4 py-2 text-sm rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-orange-500 transition-all"
                            />
                            <button className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-sm font-bold transition-all shadow-md shadow-orange-500/10">
                                Join
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                    <p>© 2026 ElectroFixers. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-orange-500 transition-colors">Support FAQ</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;