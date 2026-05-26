import { useContext, useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import logo from '../../assets/logo.png';
import { 
    HiOutlineWrench, 
    HiOutlinePlusCircle, 
    HiOutlineClipboardDocumentList, 
    HiOutlineCalendarDays, 
    HiOutlineSquares2X2, 
    HiOutlineArrowLeftOnRectangle,
    HiOutlineHome,
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineSun,
    HiOutlineMoon
} from "react-icons/hi2";

const DashboardLayout = () => {
    const { user, logOut, isDark, setIsDark } = useContext(AuthContext);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error("Logout error:", error);
            });
    };

    const sidebarLinks = [
        {
            name: "Overview",
            path: "/dashboard",
            icon: HiOutlineSquares2X2,
            end: true
        },
        {
            name: "Add Service",
            path: "/dashboard/add-service",
            icon: HiOutlinePlusCircle
        },
        {
            name: "Manage Services",
            path: "/dashboard/manage-service",
            icon: HiOutlineWrench
        },
        {
            name: "Booked Services",
            path: "/dashboard/booked-services",
            icon: HiOutlineCalendarDays
        },
        {
            name: "Service To Do",
            path: "/dashboard/service-to-do",
            icon: HiOutlineClipboardDocumentList
        }
    ];

    return (
        <div className={`min-h-screen flex flex-col lg:flex-row ${isDark === 'dark' ? "dark bg-[#0B081A] text-slate-100" : "bg-[#F8FAFC] text-slate-900"} transition-colors duration-500 relative overflow-hidden font-sans`}>
            
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none z-0"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-600/5 blur-[120px] pointer-events-none z-0"></div>

            {/* Desktop Left Sidebar (Sticky) */}
            <aside className="hidden lg:flex flex-col w-72 h-screen sticky top-0 bg-white/80 dark:bg-[#130E26]/80 backdrop-blur-md border-r border-slate-200/50 dark:border-white/5 z-20">
                
                {/* Brand Logo & Name */}
                <div className="p-6 border-b border-slate-200/50 dark:border-white/5">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img src={logo} alt="ElectroFixers Logo" className="w-10 h-8 object-contain group-hover:scale-105 transition-all duration-300" />
                        <span className="text-lg font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                            ELECTRO<span className="text-orange-500">FIXERS</span>
                        </span>
                    </Link>
                </div>

                {/* Quick Profile Section */}
                <div className="p-6 flex flex-col items-center text-center border-b border-slate-200/50 dark:border-white/5 space-y-3">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full blur opacity-25 group-hover:opacity-50 transition-opacity"></div>
                        <img 
                            src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} 
                            alt={user?.displayName || "User"} 
                            className="relative w-20 h-20 rounded-full object-cover border-2 border-orange-500/80 p-0.5 shadow-lg bg-white dark:bg-[#0B081A]"
                        />
                    </div>
                    <div>
                        <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-base line-clamp-1">{user?.displayName || "Expert Fixer"}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 mt-1.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
                            🛠️ Service Provider
                        </span>
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                end={link.end}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                                        isActive 
                                            ? "text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-md shadow-orange-500/20" 
                                            : "text-slate-600 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-500/5 dark:hover:bg-orange-500/5"
                                    }`
                                }
                            >
                                <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                {link.name}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Sidebar Footer Actions */}
                <div className="p-4 border-t border-slate-200/50 dark:border-white/5 space-y-2">
                    <button
                        onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                        className="flex w-full items-center justify-between px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 hover:border-orange-500/30 text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-all text-sm font-semibold"
                    >
                        <span>Theme Mode</span>
                        {isDark === 'dark' ? <HiOutlineSun className="w-5 h-5 text-orange-500" /> : <HiOutlineMoon className="w-5 h-5 text-orange-500" />}
                    </button>
                    <button 
                        onClick={handleLogOut}
                        className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/5 dark:hover:bg-rose-500/10 transition-all"
                    >
                        <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
                        Log Out
                    </button>
                </div>
            </aside>

            {/* Mobile Top Navigation Bar */}
            <header className="lg:hidden h-16 w-full sticky top-0 flex items-center justify-between px-4 bg-white/90 dark:bg-[#0B081A]/90 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 z-20">
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsMobileOpen(true)}
                        className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                        aria-label="Open dashboard menu"
                    >
                        <HiOutlineBars3 className="w-6 h-6" />
                    </button>
                    <span className="text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                        Provider <span className="text-orange-500">Panel</span>
                    </span>
                </div>
                
                <Link to="/" className="p-2 text-slate-600 dark:text-slate-400 hover:text-orange-500 transition-colors">
                    <HiOutlineHome className="w-6 h-6" />
                </Link>
            </header>

            {/* Mobile Sidebar Overlay Drawer */}
            <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                
                {/* Backdrop Blur Overlay */}
                <div 
                    onClick={() => setIsMobileOpen(false)}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                />

                {/* Sliding Content Drawer */}
                <aside className={`absolute inset-y-0 left-0 w-72 bg-white dark:bg-[#130E26] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out z-10 ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    
                    {/* Header */}
                    <div className="p-5 flex items-center justify-between border-b border-slate-200/50 dark:border-white/5">
                        <span className="text-base font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                            ELECTRO<span className="text-orange-500">FIXERS</span>
                        </span>
                        <button 
                            onClick={() => setIsMobileOpen(false)}
                            className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
                        >
                            <HiOutlineXMark className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Quick Profile Section */}
                    <div className="p-5 flex items-center gap-3.5 border-b border-slate-200/50 dark:border-white/5">
                        <img 
                            src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} 
                            alt={user?.displayName || "User"} 
                            className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/80 p-0.5 shadow-md bg-white dark:bg-[#0B081A]"
                        />
                        <div>
                            <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">{user?.displayName || "Expert Fixer"}</h4>
                            <span className="text-[10px] text-orange-500 font-semibold uppercase tracking-wider">
                                Provider Panel
                            </span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                        {sidebarLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.end}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={({ isActive }) => 
                                        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                            isActive 
                                                ? "text-white bg-gradient-to-r from-orange-500 to-amber-600 shadow-md shadow-orange-500/10" 
                                                : "text-slate-600 dark:text-slate-400 hover:text-orange-500 hover:bg-orange-500/5 dark:hover:bg-orange-500/5"
                                        }`
                                    }
                                >
                                    <Icon className="w-5 h-5" />
                                    {link.name}
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-slate-200/50 dark:border-white/5 space-y-2">
                        <button
                            onClick={() => {
                                setIsDark(isDark === 'dark' ? 'light' : 'dark');
                                setIsMobileOpen(false);
                            }}
                            className="flex w-full items-center justify-between px-4 py-2 rounded-xl border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-orange-500 text-sm font-semibold"
                        >
                            <span>Theme Mode</span>
                            {isDark === 'dark' ? <HiOutlineSun className="w-5 h-5 text-orange-500" /> : <HiOutlineMoon className="w-5 h-5 text-orange-500" />}
                        </button>
                        <button 
                            onClick={() => {
                                setIsMobileOpen(false);
                                handleLogOut();
                            }}
                            className="flex w-full items-center gap-3 px-4 py-2 rounded-xl text-sm font-semibold text-rose-500 hover:bg-rose-500/5 transition-all"
                        >
                            <HiOutlineArrowLeftOnRectangle className="w-5 h-5" />
                            Log Out
                        </button>
                    </div>

                </aside>
            </div>

            {/* Right Panel Main Content Workspace */}
            <main className="flex-1 relative z-10 p-4 md:p-8 overflow-x-hidden min-h-screen">
                <div className="max-w-7xl mx-auto py-4">
                    <Outlet />
                </div>
            </main>

        </div>
    );
};

export default DashboardLayout;
