import { useLoaderData } from 'react-router-dom';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from "../../../providers/AuthProviders";

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
        <div>
            This is Booked Services.
            {bookedServices.length}
        </div>
    );
};

export default BookedServices;