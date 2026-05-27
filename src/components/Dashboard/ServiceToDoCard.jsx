import PropTypes from 'prop-types';
import {
    HiOutlineCalendarDays,
    HiOutlineUser,
    HiOutlineEnvelope,
    HiOutlineWrench,
} from 'react-icons/hi2';
import swal from 'sweetalert';
import { API_BASE_URL } from '../../api/config';

const Row = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-50 dark:border-zinc-900 last:border-0">
        <span className="flex items-center gap-1.5 text-zinc-400">
            <Icon className="w-3.5 h-3.5" /> {label}
        </span>
        <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[160px] text-right">{value}</span>
    </div>
);

const ServiceToDoCard = ({ service }) => {
    const { _id, serviceImage, serviceName, providerEmail, providerName, userName, userEmail, serviceDate, instructions, price, status } = service;

    const handleStatus = (e) => {
        const newStatus = e.target.value;
        fetch(`${API_BASE_URL}/update-booked-service/${_id}`, {
            method:  'PUT',
            headers: { 'content-type': 'application/json' },
            body:    JSON.stringify({ newStatus }),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    swal('Updated', `Status set to: ${newStatus}`, 'success');
                }
            });
    };

    return (
        <article className="card-minimal flex flex-col h-full overflow-hidden">
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                <img src={serviceImage} alt={serviceName} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 text-xs font-semibold bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-2 py-0.5 rounded border border-zinc-100 dark:border-zinc-800">
                    ${price}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-4">
                <h3 className="font-bold text-zinc-900 dark:text-white text-base line-clamp-1">{serviceName}</h3>

                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    <span>{serviceDate}</span>
                </div>

                {instructions && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-900 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-800">
                        &ldquo;{instructions}&rdquo;
                    </p>
                )}

                <div className="flex-1">
                    <Row icon={HiOutlineUser}     label="Customer" value={userName} />
                    <Row icon={HiOutlineEnvelope} label="Email"    value={userEmail} />
                    <Row icon={HiOutlineWrench}   label="Provider" value={providerName} />
                    <Row icon={HiOutlineEnvelope} label="Email"    value={providerEmail} />
                </div>

                {/* Status selector */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-900 space-y-1.5">
                    <p className="text-xs text-zinc-400 text-center">Update status</p>
                    <select
                        defaultValue={status}
                        onChange={handleStatus}
                        className="w-full text-xs font-semibold border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 rounded px-3 py-2 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
                    >
                        <option value="pending">Pending</option>
                        <option value="working">Working</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
        </article>
    );
};

ServiceToDoCard.propTypes = { service: PropTypes.object.isRequired };

export default ServiceToDoCard;
