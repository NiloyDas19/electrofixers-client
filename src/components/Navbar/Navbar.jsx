import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import logo from "../../assets/logo.png";
import { Tooltip } from 'react-tooltip';
import { 
    HiOutlineSun, 
    HiOutlineMoon, 
    HiOutlineBars3, 
    HiOutlineXMark,
    HiOutlineSparkles
} from "react-icons/hi2";

const Navbar = () => {
    const { user, logOut, isDark, setIsDark, loading } = useContext(AuthContext);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('theme', isDark);
    }, [isDark]);

    const handleLogOut = () => {
        setIsDrawerOpen(false);
        logOut()
            .then(() => {
                console.log("Log Out Successful");
            })
            .catch((error) => {
                console.error("Logout error:", error.message);
            });
    };

    // Main industry-standard clean links
    const links = [
        { name: "Home", path: "/" },
        { name: "Services", path: "/all-services" },
        ...(user ? [{ name: "Dashboard", path: "/dashboard" }] : [])
    ];

    return (
        <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Left Side: Brand Logo & Title */}
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <img 
                                src={logo} 
                                alt="ElectroFixers Logo" 
                                className="w-11 h-9 object-contain group-hover:scale-105 transition-all duration-300" 
                            />
                            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                                ELECTRO<span className="text-blue-600 group-hover:text-blue-700 transition-colors">FIXERS</span>
                            </span>
                        </Link>
                    </div>

                    {/* Middle: Desktop Navigation Links (Industry Standard) */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {links.map((link) => (
                            <NavLink 
                                key={link.path}
                                to={link.path} 
                                className={({ isActive }) => 
                                    `relative text-sm font-semibold tracking-wide transition-colors duration-300 py-1.5 px-1 group ${
                                        isActive 
                                            ? "text-blue-600 font-bold" 
                                            : "text-slate-600 dark:text-slate-300 hover:text-blue-600"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.name}
                                        {/* Line indicator beneath active links */}
                                        <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 rounded-full transition-transform duration-300 origin-left ${
                                            isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                                        }`} />
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Side: Theme Toggle & Authentication Status */}
                    <div className="flex items-center gap-4">
                        
                        {/* Theme Toggle Button (Desktop) */}
                        <button 
                            onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                            className="hidden lg:flex p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-600/30 hover:bg-blue-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-all duration-300"
                            aria-label="Toggle Theme Mode"
                        >
                            {isDark === 'dark' ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                        </button>

                        {/* Login / Profile Slot */}
                        <div className="hidden lg:flex items-center gap-3">
                            {loading ? (
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
                                    <span className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                                </div>
                            ) : user ? (
                                <>
                                    {/* User Avatar */}
                                    <Link to="/dashboard" className="avatar cursor-pointer" data-tooltip-id="user-tooltip">
                                        <div className="w-10 h-10 rounded-full border-2 border-blue-600/60 hover:border-blue-600 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 ring-slate-100 dark:ring-slate-800 transition-all">
                                            <img src={user.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt={user.displayName} />
                                        </div>
                                    </Link>
                                    
                                    {/* Logout Button */}
                                    <button 
                                        onClick={handleLogOut} 
                                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                                >
                                    Login
                                </Link>
                            )}
                        </div>

                        {/* Hamburger Menu Trigger (Mobile) */}
                        <button 
                            onClick={() => setIsDrawerOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                            aria-label="Open menu"
                        >
                            <HiOutlineBars3 className="w-7 h-7" />
                        </button>
                    </div>

                </div>
            </div>

            {/* Sliding Mobile Drawer Overlay */}
            <div className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
                
                {/* Backdrop Overlay */}
                <div 
                    onClick={() => setIsDrawerOpen(false)}
                    className="absolute inset-0 bg-black/45 backdrop-blur-sm"
                />

                {/* Sliding Content Drawer */}
                <aside className={`absolute inset-y-0 right-0 w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out z-10 ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
                    
                    {/* Drawer Header */}
                    <div className="p-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-2">
                            <img src={logo} alt="Logo" className="w-8 h-7 object-contain" />
                            <span className="font-extrabold text-slate-800 dark:text-slate-100">
                                ELECTRO<span className="text-blue-600">FIXERS</span>
                            </span>
                        </div>
                        <button 
                            onClick={() => setIsDrawerOpen(false)}
                            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                        >
                            <HiOutlineXMark className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Quick Profile Section inside Drawer */}
                    {user && (
                        <div className="p-6 flex items-center gap-3.5 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
                            <img 
                                src={user.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} 
                                alt={user.displayName} 
                                className="w-12 h-12 rounded-full object-cover border border-blue-600 p-0.5"
                            />
                            <div>
                                <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm line-clamp-1">{user.displayName}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Navigation Menu */}
                    <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                        {links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsDrawerOpen(false)}
                                className={({ isActive }) => 
                                    `flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                                        isActive 
                                            ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20 font-bold" 
                                            : "text-slate-600 dark:text-slate-400 hover:text-blue-600 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Drawer Footer Actions */}
                    <div className="p-5 border-t border-slate-200 dark:border-slate-800 space-y-4">
                        
                        {/* Theme Toggle in Drawer */}
                        <div className="flex items-center justify-between px-3 py-1">
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                <HiOutlineSparkles className="w-4 h-4 text-blue-600" />
                                Theme Mode
                            </span>
                            <button 
                                onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-blue-600 bg-slate-50 dark:bg-slate-800 transition-transform active:scale-95"
                            >
                                {isDark === 'dark' ? <HiOutlineSun className="w-5 h-5" /> : <HiOutlineMoon className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Login/Logout Button in Drawer */}
                        {user ? (
                            <button 
                                onClick={handleLogOut} 
                                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all text-center"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link 
                                to="/login" 
                                onClick={() => setIsDrawerOpen(false)}
                                className="block w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all text-center"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                </aside>
            </div>

            <Tooltip
                id="user-tooltip"
                content={user?.displayName || "Profile Overview"}
                place="bottom"
                className="z-50 !bg-slate-900 !text-white !rounded-lg !px-3 !py-1.5 text-xs shadow-lg font-semibold"
            />
        </header>
    );
};

export default Navbar;