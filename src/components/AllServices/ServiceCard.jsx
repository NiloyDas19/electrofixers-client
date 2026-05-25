import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { HiOutlineMapPin } from "react-icons/hi2";

const ServiceCard = ({ service }) => {
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;
    
    return (
        <article className="glass-card-interactive group flex flex-col h-full bg-white dark:bg-[#130E26]/80 rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            
            {/* Image Container with Zoom Effect & Tag */}
            <div className="relative aspect-video overflow-hidden">
                <img 
                    src={imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
                    alt={serviceName} 
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-lg font-extrabold px-4 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
                    ${price}
                </div>
            </div>

            {/* Content Details */}
            <div className="flex-grow p-6 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                    
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-orange-500 dark:text-orange-400 font-semibold uppercase tracking-wider">
                        <HiOutlineMapPin className="w-4 h-4" />
                        <span>{serviceArea}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
                        {serviceName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Footer Section */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-4">
                    {/* Provider Info */}
                    <div className="flex items-center gap-2.5">
                        <img 
                            src={providerImageUrl} 
                            className="h-10 w-10 rounded-full border-2 border-orange-500 object-cover shadow-sm" 
                            alt={providerName} 
                        />
                        <div className="flex flex-col">
                            <span className="text-xs text-slate-400 font-medium">Expert Provider</span>
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate max-w-[120px] md:max-w-[150px]">
                                {providerName}
                            </span>
                        </div>
                    </div>
                    {/* Details Link CTA */}
                    <Link 
                        to={`/services/${_id}`}
                        className="px-5 py-2.5 bg-slate-900 hover:bg-orange-500 dark:bg-white/5 dark:hover:bg-orange-500 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all duration-300 shadow-sm group-hover:shadow-orange-500/20 active:scale-95"
                    >
                        View Details
                    </Link>
                </div>

            </div>

        </article>
    );
};

ServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ServiceCard;