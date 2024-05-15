import { Link, useLoaderData } from "react-router-dom";
import DocumentTitle from './../../documentTitle/DocumentTitle';

const ServiceDetails = () => {
    DocumentTitle('View Details');
    const service = useLoaderData();
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;
    return (
        <div className="w-[95%] mx-auto space-y-10">
            <div className="space-y-5 mt-5 rounded-2xl p-2 border-2">
                <div>
                    <h3 className="text-2xl font-bold text-center">Service Provider Information</h3>
                </div>
                <div className="flex items-center justify-center gap-2">
                    <div className="rounded-full">
                        <img src={providerImageUrl} className="rounded-full w-24 h-24 border-2 border-blue-500" alt="" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold">{providerName}</h2>
                        <p>{serviceArea}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col space-y-5 border-2 rounded-3xl border-orange-100">
                <div className="rounded-t-3xl">
                    <img src={imageUrl} className="rounded-t-3xl w-full" alt="" />
                </div>
                <div className="flex-grow flex justify-between px-6">
                    <h2 className="text-3xl font-bold">{serviceName}</h2>
                    <p className="text-3xl font-bold">${price}</p>
                </div>
                <div className="px-6">
                    <p>{description}</p>
                </div>
                <div className="flex justify-between px-6 pb-6">
                    <div className="flex items-center gap-2">
                        <img src={providerImageUrl} className="h-12 w-12 rounded-full border-2 border-blue-500" alt="" />
                        <h2 className="font-semibold">{providerName}</h2>
                    </div>
                    <div>
                        <Link to={`/book-now/${_id}`}><button className="btn bg-orange-500 text-white font-bold">Book Now</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default ServiceDetails;