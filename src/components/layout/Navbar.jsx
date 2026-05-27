import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import {
    HiOutlineSun,
    HiOutlineMoon,
    HiOutlineBars3,
    HiOutlineXMark,
    HiOutlineSquares2X2,
    HiOutlinePlusCircle,
    HiOutlineWrench,
    HiOutlineCalendarDays,
    HiOutlineClipboardDocumentList,
} from 'react-icons/hi2';

const Navbar = () => {
    const { user, logOut, isDark, setIsDark } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const handleLogOut = () => {
        setIsOpen(false);
        logOut().catch(() => {});
    };

    const navLinks = [
        { name: 'Home',      path: '/' },
        { name: 'Services',  path: '/all-services' },
        ...(user ? [{ name: 'Dashboard', path: '/dashboard' }] : []),
    ];

    const linkClass = ({ isActive }) =>
        `relative text-sm font-medium transition-colors duration-150 ${
            isActive
                ? 'text-zinc-900 dark:text-white'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
        }`;

    return (
        <header className="sticky top-0 z-40 w-full bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">

                    {/* Wordmark */}
                    <Link
                        to="/"
                        className="text-base font-black tracking-tight text-zinc-900 dark:text-white hover:opacity-80 transition-opacity"
                    >
                        Electro<span className="text-accent">Fixers</span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <NavLink key={link.path} to={link.path} end={link.path === '/'} className={linkClass}>
                                {link.name}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        {/* Theme toggle */}
                        <button
                            onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                            className="btn-ghost p-2"
                            aria-label="Toggle theme"
                        >
                            {isDark === 'dark'
                                ? <HiOutlineSun className="w-4 h-4" />
                                : <HiOutlineMoon className="w-4 h-4" />}
                        </button>

                        {/* Desktop auth */}
                        <div className="hidden md:flex items-center gap-2">
                            {user ? (
                                <>
                                    <img
                                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=18181b&color=fff`}
                                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=18181b&color=fff`; }}
                                        alt={user.displayName || 'User'}
                                        className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                                    />
                                    <button onClick={handleLogOut} className="btn-outline py-1.5 px-3 text-xs">
                                        Log out
                                    </button>
                                </>
                            ) : (
                                <Link to="/login" className="btn-primary py-1.5 px-4 text-xs">
                                    Log in
                                </Link>
                            )}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden btn-ghost p-2"
                            aria-label="Open menu"
                        >
                            <HiOutlineBars3 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile drawer */}
            <div className={`md:hidden fixed inset-0 z-50 transition-all duration-200 ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                {/* Backdrop */}
                <div
                    onClick={() => setIsOpen(false)}
                    className="absolute inset-0 bg-black/30"
                />

                {/* Drawer panel */}
                <aside className={`absolute inset-y-0 right-0 w-72 bg-white dark:bg-zinc-950 border-l border-zinc-100 dark:border-zinc-900 flex flex-col transform transition-transform duration-200 ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    {/* Drawer header */}
                    <div className="flex items-center justify-between px-5 h-14 border-b border-zinc-100 dark:border-zinc-900">
                        <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-white">
                            Electro<span className="text-accent">Fixers</span>
                        </span>
                        <button onClick={() => setIsOpen(false)} className="btn-ghost p-1">
                            <HiOutlineXMark className="w-5 h-5" />
                        </button>
                    </div>

                    {/* User info */}
                    {user && (
                        <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-3">
                            <img
                                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=18181b&color=fff`}
                                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=18181b&color=fff`; }}
                                alt={user.displayName || 'User'}
                                className="w-9 h-9 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{user.displayName}</p>
                                <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {/* Nav links */}
                    <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                        <div className="space-y-0.5">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    end={link.path === '/'}
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                                            isActive
                                                ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                                                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                        }`
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>

                        {user && (
                            <div className="pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-0.5">
                                <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">Dashboard</p>
                                {[
                                    { name: 'Overview',         path: '/dashboard',                     icon: HiOutlineSquares2X2, end: true },
                                    { name: 'Add service',      path: '/dashboard/add-service',         icon: HiOutlinePlusCircle },
                                    { name: 'Manage services',  path: '/dashboard/manage-service',      icon: HiOutlineWrench },
                                    { name: 'Booked services',  path: '/dashboard/booked-services',     icon: HiOutlineCalendarDays },
                                    { name: 'Service to do',    path: '/dashboard/service-to-do',       icon: HiOutlineClipboardDocumentList },
                                ].map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        end={link.end}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                                                isActive
                                                    ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                                                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                                            }`
                                        }
                                    >
                                        <link.icon className="w-4 h-4 flex-shrink-0" />
                                        {link.name}
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </nav>

                    {/* Footer actions */}
                    <div className="p-4 border-t border-zinc-100 dark:border-zinc-900 space-y-2">
                        <button
                            onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                            className="btn-outline w-full justify-between"
                        >
                            <span>{isDark === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                            {isDark === 'dark'
                                ? <HiOutlineSun className="w-4 h-4" />
                                : <HiOutlineMoon className="w-4 h-4" />}
                        </button>
                        {user ? (
                            <button onClick={handleLogOut} className="btn-primary w-full">
                                Log out
                            </button>
                        ) : (
                            <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary w-full">
                                Log in
                            </Link>
                        )}
                    </div>
                </aside>
            </div>
        </header>
    );
};

export default Navbar;
