import { useLoaderData } from 'react-router-dom';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../providers/AuthProviders";
import BookServiceCard from './BookServiceCard';

const BookedServices = () => {
    DocumentTitle('Booked Services');
    const services = useLoaderData();
    const {user} = useContext(AuthContext);
    const [bookedServices, setBookedServices] = useState([]);

    useEffect(() => {
        const newBookedServices = services.filter(service => service.userEmail === user.email);
        setBookedServices(newBookedServices);
    },[]);

    return (
        <div className='w-[95%] mx-auto space-y-10 mt-10'>
            <div>
                <h2 className='text-center text-4xl font-bold'>Here are all the service that you purchased</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                {
                    bookedServices.map(service => <BookServiceCard key={service._id} service={service}></BookServiceCard>)
                }
            </div>
        </div>
    );
};

export default BookedServices;