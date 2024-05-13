import { useLoaderData } from 'react-router-dom';
import DocumentTitle from './../../documentTitle/DocumentTitle';
import ServiceCard from './ServiceCard';

const AllServices = () => {
    DocumentTitle('Services')
    const allServices = useLoaderData();

    return (
        <div>
            This is All services Page.
            {
                allServices.map(service => <ServiceCard service = {service} key={service._id}></ServiceCard>)
            }
        </div>
    );
};

export default AllServices;