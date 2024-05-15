import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const PopularServicesCard = ({service}) => {
    const {_id, imageUrl, serviceName, description, providerImageUrl, providerName, price } = service;
    return (
        <div className="flex flex-col space-y-5 border-2 rounded-3xl border-orange-100">
            <div className="rounded-t-3xl">
                <img src={imageUrl} className="rounded-t-3xl" alt="" />
            </div>
            <div className="flex-grow flex justify-between px-6">
                <h2 className="text-3xl font-bold">{serviceName}</h2>
                <p className="text-3xl font-semibold">${price}</p>
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
                    <Link to={`/services/${_id}`}><button className="btn bg-orange-500 text-white font-bold">View Details</button></Link>
                </div>
            </div>
        </div>
    );
};

PopularServicesCard.propTypes = {
    service : PropTypes.object.isRequired,
}

export default PopularServicesCard;