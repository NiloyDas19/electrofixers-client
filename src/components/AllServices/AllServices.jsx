import { useLoaderData } from 'react-router-dom';
import DocumentTitle from './../../documentTitle/DocumentTitle';
import ServiceCard from './ServiceCard';

const AllServices = () => {
    DocumentTitle('Services')
    const allServices = useLoaderData();

    return (
        <div className='w-[95%] mx-auto space-y-10 mt-10'>
            <div className='spae-y-2 text-center'>
                <h2 className='font-bold text-3xl'>This is All Service page</h2>
                <p>User Can find all services here</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                {
                    allServices.map(service => <ServiceCard service = {service} key={service._id}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default AllServices;