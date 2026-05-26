import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { HiOutlineMapPin } from "react-icons/hi2";

const ServiceCard = ({ service }) => {
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;
    
    return (
        <article className="glass-card-interactive group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
            
            {/* Image Container with Zoom Effect & Tag */}
            <div className="relative aspect-video overflow-hidden border-b border-slate-200 dark:border-slate-800">
                <img 
                    src={imageUrl} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                    alt={serviceName} 
                />
                <div className="absolute top-4 right-4 bg-slate-900 dark:bg-slate-800 text-white text-lg font-bold px-4 py-1.5 rounded-lg shadow-sm">
                    ${price}
                </div>
            </div>

            {/* Content Details */}
            <div className="flex-grow p-6 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2">
                    
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                        <HiOutlineMapPin className="w-4 h-4" />
                        <span>{serviceArea}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                        {serviceName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>

                {/* Footer Section */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4">
                    {/* Provider Info */}
                    <div className="flex items-center gap-2.5">
                        <img 
                            src={providerImageUrl} 
                            className="h-10 w-10 rounded-full border border-slate-200 dark:border-slate-700 object-cover bg-white dark:bg-slate-800" 
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
                        className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm active:scale-95"
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