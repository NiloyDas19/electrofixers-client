import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Root = () => {
    const { isDark } = useContext(AuthContext);
    
    return (
        <div className={`${isDark === 'dark' ? "dark bg-[#0B081A] text-slate-100" : "bg-[#F8FAFC] text-slate-900"} min-h-screen transition-colors duration-500 relative overflow-hidden font-sans`}>
            {/* Soft Ambient Background Glows */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none z-0 animate-pulse-glow"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/10 blur-[150px] pointer-events-none z-0 animate-pulse-glow"></div>
            
            <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Root;