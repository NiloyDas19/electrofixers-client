import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Root = () => {
    const { isDark } = useContext(AuthContext);
    
    return (
        <div className={`${isDark === 'dark' ? "dark bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-900"} min-h-screen transition-colors duration-300 relative font-sans`}>
            
            <div className="relative z-10 flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
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