import PropTypes from 'prop-types';

const BookServiceCard = ({service}) => {
    const {serviceImage, serviceName, providerEmail, providerName, serviceDate, instructions, price, status } = service;
    return (
        <div className="flex flex-col space-y-5 border-2 rounded-3xl border-orange-100">
            <div className="rounded-t-3xl">
                <img src={serviceImage} className="rounded-t-3xl" alt="" />
            </div>
            <div className="flex-grow px-6 text-center">
                <h2 className="text-3xl font-bold">{serviceName}</h2>
                <h2 className="text-3xl font-bold">{serviceDate}</h2>
            </div>
            <div className="px-6 flex justify-between">
                <p className="text-3xl">{instructions}</p>
                <p className="text-3xl">{price}</p>
            </div>
            <div className="flex justify-between px-6 pb-6">
                <div className="flex items-center gap-2">
                    <h2 className="font-semibold">{providerName}</h2>
                    <h2 className="font-semibold">{providerEmail}</h2>
                </div>
                <div>
                    <button className="btn bg-orange-500 text-white font-bold">{status}</button>
                </div>
            </div>
        </div>
    );
};

BookServiceCard.propTypes = {
    service : PropTypes.object.isRequired,
}

export default BookServiceCard;