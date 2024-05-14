import { useLoaderData } from 'react-router-dom';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import { useContext, useEffect, useState } from 'react';

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
        <div>
            This is ManageService.
            {
                myServices.length
            }
        </div>
    );
};

export default ManageService;