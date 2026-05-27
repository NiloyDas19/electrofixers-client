import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ServiceToDoCard from './ServiceToDoCard';

const ServiceToDo = () => {
    useDocumentTitle('Service to do');
    const { user }        = useContext(AuthContext);
    const bookedServices  = useLoaderData();
    const [mine, setMine] = useState([]);

    useEffect(() => {
        setMine(bookedServices.filter((s) => s.providerEmail === user?.email));
    }, [bookedServices, user?.email]);

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="pb-6 border-b border-zinc-100 dark:border-zinc-900">
                <p className="eyebrow">Provider schedule</p>
                <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {mine.length > 0 ? 'Repair appointments' : 'No appointments'}
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {mine.length > 0
                        ? `${mine.length} appointment${mine.length > 1 ? 's' : ''} assigned to you.`
                        : 'No incoming repair appointments yet. Active bookings will appear here.'}
                </p>
            </div>

            {mine.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-sm text-zinc-400">No appointments to show.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {mine.map((s) => <ServiceToDoCard key={s._id} service={s} />)}
                </div>
            )}
        </div>
    );
};

export default ServiceToDo;
