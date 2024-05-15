import PropTypes from 'prop-types';
import { SlCalender } from "react-icons/sl";



const BookServiceCard = ({ service }) => {
    const { serviceImage, serviceName, providerEmail, providerName, userEmail, userName, serviceDate, instructions, price, status } = service;
    return (
        <div className="flex flex-col space-y-5 border-2 rounded-3xl border-orange-100">
            <div className="rounded-t-3xl">
                <img src={serviceImage} className="rounded-t-3xl w-full" alt="" />
            </div>
            <div className="flex-grow px-6 text-center">
                <h2 className="text-3xl font-bold">{serviceName}</h2>
                <p className="text-xl font-semibold">{instructions}</p>
            </div>
            <div className="px-6 flex justify-between items-center">
                <div className='flex items-center gap-2'>
                    <SlCalender />
                    <p className="text-xl font-bold">{serviceDate}</p>
                </div>
                <p className="text-xl font-bold">${price}</p>
            </div>
            <div className="flex justify-between px-6 flex-col md:flex-row">
                <p>User Name</p>
                <h2 className="font-semibold text-xl">{userName}</h2>
            </div>
            <div className="flex justify-between px-6 flex-col md:flex-row">
                <p>User Email</p>
                <h2 className="font-semibold text-xl">{userEmail}</h2>
            </div>
            <div className="flex justify-between px-6 flex-col md:flex-row">
                <p>Provider Name</p>
                <h2 className="font-semibold text-xl">{providerName}</h2>
            </div>
            <div className="flex justify-between px-6 flex-col md:flex-row">
                <p>Provider Email</p>
                <h2 className="font-semibold text-xl">{providerEmail}</h2>
            </div>
            <div className='flex items-center justify-center pb-6'>
                <button className="btn bg-orange-500 text-white font-bold">{status}</button>
            </div>
        </div>
    );
};

BookServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default BookServiceCard;