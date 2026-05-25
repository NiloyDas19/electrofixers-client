import { useLoaderData } from 'react-router-dom';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../providers/AuthProviders";
import BookServiceCard from './BookServiceCard';

const BookedServices = () => {
    DocumentTitle('Booked Services');
    const services = useLoaderData();
    const { user } = useContext(AuthContext);
    const [bookedServices, setBookedServices] = useState([]);

    useEffect(() => {
        const newBookedServices = services.filter(service => service.userEmail === user.email);
        setBookedServices(newBookedServices);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 min-h-screen">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    🛒 Customer Orders
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                    {bookedServices.length > 0 ? (
                        <>Purchased <span className="text-gradient-orange">Appointments</span></>
                    ) : (
                        <>No Booked <span className="text-gradient-orange">Services</span></>
                    )}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                    {bookedServices.length > 0 
                        ? "Track diagnostics schedules, check active service status badges, and review instructions shared with your repair technicians."
                        : "You haven't booked any electronic repairs yet. Find expert local diagnostic services in our main catalog!"
                    }
                </p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    bookedServices.map(service => (
                        <BookServiceCard key={service._id} service={service} />
                    ))
                }
            </div>
            
        </div>
    );
};

export default BookedServices;