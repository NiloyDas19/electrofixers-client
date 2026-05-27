import { useLoaderData } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import BookServiceCard from './BookServiceCard';
import { Link } from 'react-router-dom';

const BookedServices = () => {
    useDocumentTitle('Booked services');
    const services = useLoaderData();
    const { user }  = useContext(AuthContext);
    const [booked, setBooked] = useState([]);

    useEffect(() => {
        setBooked(services.filter((s) => s.userEmail === user?.email));
    }, [services, user?.email]);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div className="pb-6 border-b border-zinc-100 dark:border-zinc-900">
                <p className="eyebrow">Customer orders</p>
                <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                    {booked.length > 0 ? 'Booked services' : 'No bookings yet'}
                </h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    {booked.length > 0
                        ? `Showing ${booked.length} booking${booked.length > 1 ? 's' : ''}.`
                        : "You haven't booked any services. Browse the catalog to get started."}
                </p>
            </div>

            {booked.length === 0 ? (
                <div className="text-center py-20 space-y-2">
                    <p className="text-sm text-zinc-400">No bookings found.</p>
                    <Link to="/all-services" className="btn-outline inline-flex mt-2">Browse services</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {booked.map((s) => <BookServiceCard key={s._id} service={s} />)}
                </div>
            )}
        </div>
    );
};

export default BookedServices;
