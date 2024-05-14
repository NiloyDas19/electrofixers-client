import { useContext, useEffect, useState } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import { useLoaderData } from 'react-router-dom';

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
        <div>
            This is Service to Do.
            {
                myService.length
            }
        </div>
    );
};

export default ServiceToDo;