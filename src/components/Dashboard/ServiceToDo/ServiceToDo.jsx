import { useContext, useEffect, useState } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import { useLoaderData } from 'react-router-dom';
import ServiceToDOCard from './ServiceToDoCard';

const ServiceToDo = () => {
    DocumentTitle('Service To Do');
    const {user} = useContext(AuthContext);
    const bookedServices  = useLoaderData();
    const [myService, setMyService] = useState([]);

    useEffect(() => {
        const newBookedServices = bookedServices.filter(service => service.providerEmail === user.email);
        setMyService(newBookedServices);
    },[]);
    
    return (
        <div className='space-y-10 w-[95%] mx-auto mt-10 min-h-screen'>
            <div>
                {
                    myService.length > 0 ?
                    <h2 className='text-center text-4xl font-bold'>Service To Do Page</h2>
                    :
                    <h2 className='text-center text-4xl font-bold'>You haven't any service to do</h2>
                }
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    myService.map(service => <ServiceToDOCard key={service._id} service={service}></ServiceToDOCard> )
                }
            </div>
        </div>
    );  
};

export default ServiceToDo;