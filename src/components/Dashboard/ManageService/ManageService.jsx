import { useLoaderData } from 'react-router-dom';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import { useContext, useEffect, useState } from 'react';
import ManageServiceCard from './ManageServiceCard';

const ManageService = () => {
    DocumentTitle('Managed Service')
    const services = useLoaderData();
    const { user } = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);

    useEffect(() => {
        const newServices = services.filter(service => service.providerEmail === user.email);
        setMyServices(newServices);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 min-h-screen">
            
            {/* Header Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    ⚙️ Provider Dashboard
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                    {myServices.length > 0 ? (
                        <>Manage Your <span className="text-gradient-orange">Services</span></>
                    ) : (
                        <>No Listings <span className="text-gradient-orange">Active</span></>
                    )}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                    {myServices.length > 0 
                        ? "Review, update details, or delete any of your currently listed repair services. Keep your pricing and areas updated for customers."
                        : "You haven't listed any repair services yet. Head over to the 'Add Service' page to publish your first offering!"
                    }
                </p>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    myServices.map(service => (
                        <ManageServiceCard key={service._id} service={service} />
                    ))
                }
            </div>
            
        </div>
    );
};

export default ManageService;