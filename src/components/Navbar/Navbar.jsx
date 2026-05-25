import { useContext, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import logo from "../../assets/logo.png"
import { Tooltip } from 'react-tooltip';
import { HiSun, HiMoon, HiMenu } from "react-icons/hi";

const Navbar = () => {
    const { user, logOut, isDark, setIsDark, loading } = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('theme', isDark);
    }, [isDark]);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log("Log Out Successful");
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const navLinks = <>
        <li>
            <NavLink 
                to="/" 
                className={({ isActive }) => 
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-orange-500 hover:bg-orange-500/5 ${isActive ? "text-orange-500 bg-orange-500/10 font-semibold" : "text-slate-600 dark:text-slate-300"}`
                }
            >
                Home
            </NavLink>
        </li>
        <li>
            <NavLink 
                to="/all-services" 
                className={({ isActive }) => 
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-orange-500 hover:bg-orange-500/5 ${isActive ? "text-orange-500 bg-orange-500/10 font-semibold" : "text-slate-600 dark:text-slate-300"}`
                }
            >
                Services
            </NavLink>
        </li>
        {user && (
            <li className="relative group">
                <details className="dropdown dropdown-end">
                    <summary className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:text-orange-500 hover:bg-orange-500/5 cursor-pointer list-none text-slate-600 dark:text-slate-300 flex items-center gap-1 select-none">
                        Dashboard
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <ul className="dropdown-content menu p-2 shadow-2xl bg-white dark:bg-[#130E26] rounded-xl w-52 mt-2 border border-slate-100 dark:border-white/10 text-slate-700 dark:text-slate-200 z-50">
                        <li><NavLink to="/add-service" className="hover:bg-orange-500/10 hover:text-orange-500 rounded-lg">Add Service</NavLink></li>
                        <li><NavLink to="/manage-service" className="hover:bg-orange-500/10 hover:text-orange-500 rounded-lg">Manage Service</NavLink></li>
                        <li><NavLink to="/booked-services" className="hover:bg-orange-500/10 hover:text-orange-500 rounded-lg">Booked Services</NavLink></li>
                        <li><NavLink to="/service-to-do" className="hover:bg-orange-500/10 hover:text-orange-500 rounded-lg">Service To Do</NavLink></li>
                    </ul>
                </details>
            </li>
        )}
    </>

    return (
        <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/70 dark:bg-[#0B081A]/75 border-b border-slate-200/50 dark:border-white/5 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    
                    {/* Brand Logo & Name */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Dropdown */}
                        <div className="dropdown lg:hidden">
                            <div tabIndex={0} role="button" className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all">
                                <HiMenu className="w-6 h-6" />
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu menu-sm p-3 mt-3 shadow-2xl bg-white dark:bg-[#130E26] border border-slate-100 dark:border-white/10 rounded-2xl w-56 space-y-2 z-50 text-slate-800 dark:text-slate-200">
                                {navLinks}
                                <div className="border-t border-slate-100 dark:border-white/10 my-2"></div>
                                <div className="flex items-center justify-between px-3 py-1">
                                    <span className="text-xs text-slate-400">Theme</span>
                                    <button 
                                        onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                                        className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-orange-500 hover:scale-105 transition-all"
                                    >
                                        {isDark === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                                    </button>
                                </div>
                            </ul>
                        </div>
                        
                        <Link to="/" className="flex items-center gap-2 group">
                            <img src={logo} alt="ElectroFixers Logo" className="w-12 h-10 object-contain group-hover:scale-105 transition-all duration-300" />
                            <span className="text-xl md:text-2xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">
                                ELECTRO<span className="text-orange-500 group-hover:text-orange-600 transition-colors">FIXERS</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-2">
                        <ul className="menu menu-horizontal items-center gap-1 px-1">
                            {navLinks}
                        </ul>
                    </nav>

                    {/* Right Action Area: Theme Toggle + Auth Status */}
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle Button (Desktop) */}
                        <button 
                            onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                            className="hidden lg:flex p-2.5 rounded-xl border border-slate-200/60 dark:border-white/10 hover:border-orange-500/50 dark:hover:border-orange-500/50 hover:bg-orange-500/5 dark:hover:bg-orange-500/5 text-slate-600 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-500 transition-all duration-300 hover:scale-105"
                            aria-label="Toggle theme"
                        >
                            {isDark === 'dark' ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
                        </button>

                        <div className="flex items-center gap-3">
                            {loading ? (
                                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-white/5 animate-pulse flex items-center justify-center">
                                    <span className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                                </div>
                            ) : user ? (
                                <>
                                    {/* User Avatar */}
                                    <div className="avatar cursor-pointer" data-tooltip-id="user-tooltip">
                                        <div className="w-10 h-10 rounded-full border-2 border-orange-500/60 hover:border-orange-500 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[#0B081A] ring-slate-100 dark:ring-white/10 transition-all hover:scale-105">
                                            <img src={user.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt={user.displayName} />
                                        </div>
                                    </div>
                                    {/* Logout Button */}
                                    <button 
                                        onClick={handleLogOut} 
                                        className="btn btn-sm md:btn-md bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold border-none rounded-xl px-5 py-2 shadow-lg shadow-orange-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="btn btn-sm md:btn-md bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold border-none rounded-xl px-5 py-2 shadow-lg shadow-orange-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>

                </div>
            </div>
            
            <Tooltip
                id="user-tooltip"
                content={user?.displayName || "Profile"}
                place="bottom"
                className="z-50 !bg-slate-900 !text-white !rounded-lg !px-3 !py-1 text-xs shadow-lg"
            />
        </header>
    );
};

export default Navbar;