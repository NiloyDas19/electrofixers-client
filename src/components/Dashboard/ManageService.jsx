import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { useContext, useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ManageServiceCard from './ManageServiceCard';
import { Link } from 'react-router-dom';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

const ManageService = () => {
    useDocumentTitle('Manage services');
    const services = useLoaderData();
    const { user }  = useContext(AuthContext);
    const [mine, setMine] = useState([]);

    useEffect(() => {
        setMine(services.filter((s) => s.providerEmail === user?.email));
    }, [services, user?.email]);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-900">
                <div className="space-y-0.5">
                    <p className="eyebrow">Provider dashboard</p>
                    <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                        {mine.length > 0 ? 'Manage services' : 'No listings yet'}
                    </h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {mine.length > 0
                            ? `You have ${mine.length} active listing${mine.length > 1 ? 's' : ''}.`
                            : "You haven't listed any services yet."}
                    </p>
                </div>
                <Link to="/dashboard/add-service" className="btn-primary flex-shrink-0">
                    <HiOutlinePlusCircle className="w-4 h-4" />
                    Add service
                </Link>
            </div>

            {mine.length === 0 ? (
                <div className="text-center py-20 space-y-2">
                    <p className="text-zinc-400 text-sm">No services to show. Start by adding one.</p>
                    <Link to="/dashboard/add-service" className="btn-outline inline-flex mt-2">Add service</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mine.map((s) => <ManageServiceCard key={s._id} service={s} />)}
                </div>
            )}
        </div>
    );
};

export default ManageService;
