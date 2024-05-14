import { useLoaderData } from 'react-router-dom';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import { useContext, useEffect, useState } from 'react';
import ManageServiceCard from './ManageServiceCard';

const ManageService = () => {
    DocumentTitle('Managed Service')
    const services = useLoaderData();
    const {user} = useContext(AuthContext);
    const [myServices, setMyServices] = useState([]);

    useEffect(() => {
        const newServices = services.filter(service => service.providerEmail === user.email);
        setMyServices(newServices);
    },[]);


    return (
        <div className='w-[95%] mx-auto space-y-10 mt-10'>
            <h2 className='text-5xl font-bold text-center'>Manage Your Services here</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    myServices.map(service => <ManageServiceCard key={service._id} service = {service}></ManageServiceCard>)
                }
            </div>
        </div>
    );
};

export default ManageService;