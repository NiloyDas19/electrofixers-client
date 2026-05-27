import { useContext, useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
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
    HiOutlineMoon,
} from 'react-icons/hi2';

const SIDEBAR_LINKS = [
    { name: 'Overview',         path: '/dashboard',                     icon: HiOutlineSquares2X2,            end: true },
    { name: 'Add service',      path: '/dashboard/add-service',         icon: HiOutlinePlusCircle },
    { name: 'Manage services',  path: '/dashboard/manage-service',      icon: HiOutlineWrench },
    { name: 'Booked services',  path: '/dashboard/booked-services',     icon: HiOutlineCalendarDays },
    { name: 'Service to do',    path: '/dashboard/service-to-do',       icon: HiOutlineClipboardDocumentList },
];

const NavItem = ({ link, onClick }) => {
    const Icon = link.icon;
    return (
        <NavLink
            to={link.path}
            end={link.end}
            onClick={onClick}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded text-sm font-medium transition-colors ${
                    isActive
                        ? 'text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800'
                        : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
                }`
            }
        >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {link.name}
        </NavLink>
    );
};

const DashboardLayout = () => {
    const { user, logOut, isDark, setIsDark } = useContext(AuthContext);
    const [mobileOpen, setMobileOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => navigate('/')).catch(() => {});
    };

    const SidebarContent = ({ onNav, onClose }) => (
        <>
            {/* Brand */}
            <div className={`px-5 h-14 flex items-center border-b border-zinc-100 dark:border-zinc-900 flex-shrink-0 ${onClose ? 'justify-between' : ''}`}>
                <Link to="/" className="text-sm font-black tracking-tight text-zinc-900 dark:text-white hover:opacity-80 transition-opacity">
                    Electro<span className="text-accent">Fixers</span>
                </Link>
                {onClose && (
                    <button onClick={onClose} className="btn-ghost p-1">
                        <HiOutlineXMark className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* User info */}
            {user && (
                <div className="px-5 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center gap-3 flex-shrink-0">
                    <img
                        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=18181b&color=fff`}
                        onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'U')}&background=18181b&color=fff`; }}
                        alt={user.displayName || 'User'}
                        className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                    />
                    <div className="min-w-0">
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">{user.displayName}</p>
                        <p className="text-xs text-zinc-400 truncate">{user.email}</p>
                    </div>
                </div>
            )}

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                {SIDEBAR_LINKS.map((link) => (
                    <NavItem key={link.path} link={link} onClick={onNav} />
                ))}
            </nav>

            {/* Footer */}
            <div className="px-3 py-4 border-t border-zinc-100 dark:border-zinc-900 space-y-1 flex-shrink-0">
                <button
                    onClick={() => setIsDark(isDark === 'dark' ? 'light' : 'dark')}
                    className="btn-ghost w-full justify-between text-xs"
                >
                    <span>{isDark === 'dark' ? 'Light mode' : 'Dark mode'}</span>
                    {isDark === 'dark'
                        ? <HiOutlineSun className="w-4 h-4" />
                        : <HiOutlineMoon className="w-4 h-4" />}
                </button>
                <Link to="/" className="btn-ghost w-full text-xs">
                    <HiOutlineHome className="w-4 h-4" />
                    Back to site
                </Link>
                <button onClick={handleLogOut} className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                    <HiOutlineArrowLeftOnRectangle className="w-4 h-4" />
                    Log out
                </button>
            </div>
        </>
    );

    return (
        <div className={`min-h-screen flex ${
            isDark === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
        }`}>

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-56 h-screen sticky top-0 bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-900">
                <SidebarContent onNav={null} />
            </aside>

            {/* Mobile top bar */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 flex items-center justify-between px-4 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900">
                <button onClick={() => setMobileOpen(true)} className="btn-ghost p-2" aria-label="Open menu">
                    <HiOutlineBars3 className="w-5 h-5" />
                </button>
                <span className="text-sm font-black tracking-tight text-zinc-900 dark:text-white">
                    Electro<span className="text-accent">Fixers</span>
                </span>
                <Link to="/" className="btn-ghost p-2">
                    <HiOutlineHome className="w-4 h-4" />
                </Link>
            </div>

            {/* Mobile drawer */}
            <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-200 ${
                mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
                <div onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-black/30" />
                <aside className={`absolute inset-y-0 left-0 w-56 bg-white dark:bg-zinc-950 border-r border-zinc-100 dark:border-zinc-900 flex flex-col transform transition-transform duration-200 ${
                    mobileOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                    <SidebarContent onNav={() => setMobileOpen(false)} onClose={() => setMobileOpen(false)} />
                </aside>
            </div>

            {/* Main content */}
            <main className="flex-1 min-h-screen pt-14 lg:pt-0 overflow-x-hidden">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
