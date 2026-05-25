import { useContext, useEffect, useState } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import { useLoaderData } from 'react-router-dom';
import ServiceToDOCard from './ServiceToDoCard';

const ServiceToDo = () => {
    DocumentTitle('Service To Do');
    const { user } = useContext(AuthContext);
    const bookedServices = useLoaderData();
    const [myService, setMyService] = useState([]);

    useEffect(() => {
        const newBookedServices = bookedServices.filter(service => service.providerEmail === user.email);
        setMyService(newBookedServices);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 min-h-screen">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    📋 Provider Schedule
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                    {myService.length > 0 ? (
                        <>Repair Appointments <span className="text-gradient-orange">To Do</span></>
                    ) : (
                        <>No Scheduled <span className="text-gradient-orange">Appointments</span></>
                    )}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                    {myService.length > 0 
                        ? "Review diagnostics orders placed by customers, check diagnostic details, and update repair progress statuses dynamically."
                        : "You don't have any incoming repair appointments scheduled. Active bookings will appear here instantly."
                    }
                </p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    myService.map(service => (
                        <ServiceToDOCard key={service._id} service={service} />
                    ))
                }
            </div>
            
        </div>
    );
};

export default ServiceToDo;