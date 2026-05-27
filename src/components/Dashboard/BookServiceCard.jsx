import PropTypes from 'prop-types';
import {
    HiOutlineCalendarDays,
    HiOutlineUser,
    HiOutlineEnvelope,
    HiOutlineWrench,
} from 'react-icons/hi2';

const statusClass = (s) => {
    const v = s?.toLowerCase();
    if (v === 'completed')                      return 'status-completed';
    if (v === 'working' || v === 'in progress') return 'status-working';
    return 'status-pending';
};

const Row = ({ icon: Icon, label, value }) => (
    <div className="flex items-center justify-between text-xs py-1.5 border-b border-zinc-50 dark:border-zinc-900 last:border-0">
        <span className="flex items-center gap-1.5 text-zinc-400">
            <Icon className="w-3.5 h-3.5" /> {label}
        </span>
        <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[160px] text-right">{value}</span>
    </div>
);

const BookServiceCard = ({ service }) => {
    const { serviceImage, serviceName, providerEmail, providerName, userEmail, userName, serviceDate, instructions, price, status } = service;

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

                {/* Date */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    <span>{serviceDate}</span>
                </div>

                {/* Instructions */}
                {instructions && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 italic bg-zinc-50 dark:bg-zinc-900 px-3 py-2 rounded border border-zinc-100 dark:border-zinc-800">
                        &ldquo;{instructions}&rdquo;
                    </p>
                )}

                {/* Meta rows */}
                <div className="flex-1">
                    <Row icon={HiOutlineUser}     label="Customer" value={userName} />
                    <Row icon={HiOutlineEnvelope} label="Email"    value={userEmail} />
                    <Row icon={HiOutlineWrench}   label="Provider" value={providerName} />
                    <Row icon={HiOutlineEnvelope} label="Email"    value={providerEmail} />
                </div>

                {/* Status */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-900 flex justify-center">
                    <span className={statusClass(status)}>{status}</span>
                </div>
            </div>
        </article>
    );
};

BookServiceCard.propTypes = { service: PropTypes.object.isRequired };

export default BookServiceCard;
