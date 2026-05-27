import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { HiOutlineMapPin } from 'react-icons/hi2';

/**
 * Shared minimal service card used on Home and AllServices pages.
 */
const ServiceCard = ({ service }) => {
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;

    return (
        <article className="card-minimal group flex flex-col h-full overflow-hidden">
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <img
                    src={imageUrl}
                    alt={serviceName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <HiOutlineMapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="truncate">{serviceArea}</span>
                    <span className="ml-auto font-semibold text-zinc-900 dark:text-white whitespace-nowrap">${price}</span>
                </div>

                <div className="flex-1 space-y-1.5">
                    <h3 className="font-bold text-zinc-900 dark:text-white text-base leading-snug line-clamp-1">
                        {serviceName}
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={providerImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(providerName || 'P')}&background=18181b&color=fff`}
                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(providerName || 'P')}&background=18181b&color=fff`; }}
                            alt={providerName}
                            className="w-7 h-7 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-[120px]">
                            {providerName}
                        </span>
                    </div>
                    <Link
                        to={`/services/${_id}`}
                        className="text-xs font-semibold text-zinc-900 dark:text-white underline-offset-2 hover:underline transition-all"
                    >
                        View details &rarr;
                    </Link>
                </div>
            </div>
        </article>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
};

export default ServiceCard;
