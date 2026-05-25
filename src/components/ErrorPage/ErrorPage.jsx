import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { useContext } from 'react';
import { HiOutlineWrenchScrewdriver, HiChevronLeft } from "react-icons/hi2";

const ErrorPage = () => {
    const { isDark } = useContext(AuthContext);

    return (
        <div className={`${isDark === 'dark' ? "dark bg-[#0B081A] text-slate-100" : "bg-[#F8FAFC] text-slate-900"} min-h-screen flex flex-col justify-center items-center px-4 relative overflow-hidden transition-colors duration-500`}>
            
            {/* Background Glows */}
            <div className="absolute w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none animate-pulse-glow z-0"></div>
            
            {/* Visual content container */}
            <div className="relative z-10 max-w-md w-full text-center space-y-8 p-8 md:p-12 rounded-3xl backdrop-blur-md bg-white/40 dark:bg-[#130E26]/40 border border-slate-200/50 dark:border-white/5 shadow-2xl">
                
                {/* Floating Broken Circuit Graphic */}
                <div className="relative flex justify-center items-center">
                    <div className="w-24 h-24 rounded-full bg-orange-500/10 flex items-center justify-center border border-orange-500/20 text-orange-500 animate-float-slow">
                        <HiOutlineWrenchScrewdriver className="w-12 h-12" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-black animate-ping"></div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-black">!</div>
                </div>

                <div className="space-y-3">
                    <h1 className="text-7xl font-black tracking-tighter text-gradient-orange">
                        404
                    </h1>
                    <h2 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                        System Disconnected
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        We couldn't resolve a connection to this page. It might have been diagnostic-deleted, moved, or never existed in our schema.
                    </p>
                </div>

                {/* Back to Home CTA */}
                <div className="pt-2">
                    <Link to="/" className="inline-flex">
                        <button className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all text-sm uppercase tracking-wider">
                            <HiChevronLeft className="w-5 h-5" />
                            Back to Safety
                        </button>
                    </Link>
                </div>

            </div>

        </div>
    );
};

export default ErrorPage;