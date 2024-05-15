import PropTypes from 'prop-types';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { SlCalender } from 'react-icons/sl';

const ServiceToDOCard = ({ service }) => {
    const { _id, serviceImage, serviceName, providerEmail, providerName, serviceDate, instructions, price, status } = service;
    const handleStatus = (event) => {
        console.log(event.target.value);
        const newStatus = event.target.value;
        const updateService = {newStatus};
        fetch(`http://localhost:5000/update-booked-service/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateService)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div className="flex flex-col space-y-5 border-2 rounded-3xl border-orange-100">
            <div className="rounded-t-3xl">
                <img src={serviceImage} className="rounded-t-3xl" alt="" />
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
            <div className="flex flex-col md:flex-row justify-between px-6 items-center">
                <div className="flex items-center gap-2 justify-center">
                    <IoPersonCircleSharp className='h-8 w-8'/>
                    <h2 className="font-semibold text-xl">{providerName}</h2>
                </div>
                <div className="flex items-center gap-2 justify-center">
                    <MdOutlineEmail className='h-6 w-6'/>
                    <h2 className="font-semibold text-xl">{providerEmail}</h2>
                </div>
            </div>
            <div className="flex items-center justify-center pb-6">
                <div>
                    <select className="btn bg-orange-500 text-white font-bold" onChange={handleStatus}>
                        <option value={status} selected>{status}</option>
                        <option value="pending">pending</option>
                        <option value="working">working</option>
                        <option value="completed">completed</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

ServiceToDOCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ServiceToDOCard;