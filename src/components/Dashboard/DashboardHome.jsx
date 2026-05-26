import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import DocumentTitle from '../../documentTitle/DocumentTitle';
import { 
    HiOutlineWrench, 
    HiOutlinePlusCircle, 
    HiOutlineCalendarDays, 
    HiOutlineClipboardDocumentList,
    HiOutlineSparkles,
    HiOutlineShieldCheck,
    HiOutlineUserGroup,
    HiOutlineArrowRight
} from "react-icons/hi2";

const DashboardHome = () => {
    DocumentTitle('Dashboard Overview');
    const { user } = useContext(AuthContext);
    
    // We can show some statistics (mock values mixed with user info)
    const [stats, setStats] = useState({
        totalServices: 0,
        bookedServices: 0,
        pendingTasks: 0,
        satisfaction: 99.8
    });

    useEffect(() => {
        // Fetch services count for stats
        fetch('https://elctrofixers-client-side.vercel.app/services')
            .then(res => res.json())
            .then(data => {
                // filter user's added services if possible or show overall catalog counts
                const myServices = data.filter(item => item.providerEmail === user?.email);
                setStats(prev => ({
                    ...prev,
                    totalServices: myServices.length || 0
                }));
            })
            .catch(err => console.error(err));

        // Fetch bookings for stats
        fetch('https://elctrofixers-client-side.vercel.app/book-service')
            .then(res => res.json())
            .then(data => {
                // booked services: where customer email matches current user
                const booked = data.filter(item => item.userEmail === user?.email);
                // service to do: where provider email matches current user and status is pending
                const todo = data.filter(item => item.providerEmail === user?.email);
                const pending = todo.filter(item => item.status === 'pending');

                setStats(prev => ({
                    ...prev,
                    bookedServices: booked.length || 0,
                    pendingTasks: todo.length || 0
                }));
            })
            .catch(err => console.error(err));
    }, [user?.email]);

    return (
        <div className="space-y-8 relative z-10">
            
            {/* Header Greeting Banner */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
                    <img 
                        src={user?.photoURL || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} 
                        alt={user?.displayName || "User"} 
                        className="w-16 h-16 rounded-full object-cover border-2 border-blue-600/80 p-0.5 shadow-sm bg-white dark:bg-slate-900"
                    />
                    <div>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100">
                            Welcome Back, <span className="text-blue-600">{user?.displayName || "Expert Fixer"}</span>!
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                            Your service command center is fully online. Here is your workshop status for today.
                        </p>
                    </div>
                </div>
                
                <Link 
                    to="/dashboard/add-service"
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition-all text-sm flex items-center gap-2"
                >
                    <HiOutlinePlusCircle className="w-5 h-5" />
                    New Listing
                </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Stat 1 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">My Listings</span>
                        <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
                            <HiOutlineWrench className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{stats.totalServices}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Services offered in catalog</p>
                    </div>
                </div>

                {/* Stat 2 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">My Bookings</span>
                        <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600">
                            <HiOutlineCalendarDays className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{stats.bookedServices}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Services booked by you</p>
                    </div>
                </div>

                {/* Stat 3 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Pending Tasks</span>
                        <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-900/20 text-sky-600">
                            <HiOutlineClipboardDocumentList className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{stats.pendingTasks}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pending repairs to solve</p>
                    </div>
                </div>

                {/* Stat 4 */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm transition-all duration-300 hover:border-slate-300 dark:hover:border-slate-700">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Success Rate</span>
                        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600">
                            <HiOutlineShieldCheck className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-4">
                        <span className="text-3xl font-black text-slate-800 dark:text-slate-100">{stats.satisfaction}%</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Excellent diagnostic rating</p>
                    </div>
                </div>

            </div>

            {/* Quick Actions & Tips */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Quick Navigation Cards */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                    <h3 className="text-lg md:text-xl font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        <HiOutlineSparkles className="w-5 h-5 text-blue-600" />
                        Quick Actions Center
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        
                        <Link 
                            to="/dashboard/manage-service"
                            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600/30 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 group-hover:scale-105 transition-transform">
                                    <HiOutlineWrench className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Manage Services</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Edit or delete listings</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </Link>

                        <Link 
                            to="/dashboard/service-to-do"
                            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600/30 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 group-hover:scale-105 transition-transform">
                                    <HiOutlineClipboardDocumentList className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Service To-Dos</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Check booking requests</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </Link>

                        <Link 
                            to="/dashboard/booked-services"
                            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600/30 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 rounded-xl bg-sky-50 dark:bg-sky-900/20 text-sky-600 group-hover:scale-105 transition-transform">
                                    <HiOutlineCalendarDays className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Booked Services</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">View your subscriptions</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </Link>

                        <Link 
                            to="/all-services"
                            className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-600/30 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-3.5">
                                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 group-hover:scale-105 transition-transform">
                                    <HiOutlineUserGroup className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Public Catalog</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Browse overall listings</p>
                                </div>
                            </div>
                            <HiOutlineArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </Link>

                    </div>
                </div>

                {/* Professional Tips Panel */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-5 shadow-sm">
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                        💡 Expert Tips
                    </h3>
                    <div className="space-y-4 text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
                            <span className="font-bold text-blue-600 block">Fast Response times</span>
                            Clients prefer technicians who acknowledge booking requests under 2 hours. Keep an eye on the "Service To Do" page!
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="font-bold text-slate-700 dark:text-slate-300 block">Clear Diagnostic Outlines</span>
                            Provide comprehensive instructions when creating services. Clear details eliminate booking hesitations!
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default DashboardHome;
