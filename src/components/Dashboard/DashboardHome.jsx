import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { API_BASE_URL } from '../../api/config';
import {
    HiOutlineWrench,
    HiOutlinePlusCircle,
    HiOutlineCalendarDays,
    HiOutlineClipboardDocumentList,
    HiOutlineArrowRight,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
} from 'react-icons/hi2';

const DashboardHome = () => {
    useDocumentTitle('Dashboard');
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({ services: 0, booked: 0, pending: 0, rate: 99.8 });

    useEffect(() => {
        if (!user?.email) return;
        fetch(`${API_BASE_URL}/services`)
            .then((r) => r.json())
            .then((data) => {
                const mine = data.filter((s) => s.providerEmail === user.email);
                setStats((p) => ({ ...p, services: mine.length }));
            })
            .catch(() => {});

        fetch(`${API_BASE_URL}/book-service`)
            .then((r) => r.json())
            .then((data) => {
                const booked  = data.filter((s) => s.userEmail     === user.email);
                const pending = data.filter((s) => s.providerEmail === user.email);
                setStats((p) => ({ ...p, booked: booked.length, pending: pending.length }));
            })
            .catch(() => {});
    }, [user?.email]);

    const STATS = [
        { label: 'My listings',   value: stats.services,       icon: HiOutlineWrench },
        { label: 'My bookings',   value: stats.booked,         icon: HiOutlineCalendarDays },
        { label: 'Pending tasks', value: stats.pending,        icon: HiOutlineClipboardDocumentList },
        { label: 'Success rate',  value: `${stats.rate}%`,    icon: HiOutlineShieldCheck },
    ];

    const ACTIONS = [
        { name: 'Manage services', sub: 'Edit or delete listings',   path: '/dashboard/manage-service',  icon: HiOutlineWrench },
        { name: 'Service to do',   sub: 'Check booking requests',    path: '/dashboard/service-to-do',   icon: HiOutlineClipboardDocumentList },
        { name: 'Booked services', sub: 'View your subscriptions',   path: '/dashboard/booked-services', icon: HiOutlineCalendarDays },
        { name: 'Public catalog',  sub: 'Browse all listings',       path: '/all-services',              icon: HiOutlineUserGroup },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Greeting */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                <div className="space-y-0.5">
                    <p className="eyebrow">Dashboard</p>
                    <h1 className="text-2xl font-black text-zinc-900 dark:text-white">
                        Welcome back, {user?.displayName?.split(' ')[0] || 'there'}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Here&apos;s your workspace overview for today.</p>
                </div>
                <Link to="/dashboard/add-service" className="btn-primary flex-shrink-0">
                    <HiOutlinePlusCircle className="w-4 h-4" />
                    New listing
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="card-minimal p-5 space-y-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-zinc-400">{label}</span>
                            <Icon className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />
                        </div>
                        <p className="text-2xl font-black text-zinc-900 dark:text-white">{value}</p>
                    </div>
                ))}
            </div>

            {/* Quick actions */}
            <div className="space-y-3">
                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Quick actions</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ACTIONS.map(({ name, sub, path, icon: Icon }) => (
                        <Link
                            key={path}
                            to={path}
                            className="card-minimal p-4 flex items-center justify-between group hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded flex items-center justify-center bg-zinc-50 dark:bg-zinc-800">
                                    <Icon className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{name}</p>
                                    <p className="text-xs text-zinc-400">{sub}</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-4 h-4 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
