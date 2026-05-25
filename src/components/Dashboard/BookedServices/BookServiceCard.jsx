import PropTypes from 'prop-types';
import { HiOutlineCalendar, HiOutlineUser, HiOutlineMail, HiOutlineWrenchScrewdriver, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

const BookServiceCard = ({ service }) => {
    const { serviceImage, serviceName, providerEmail, providerName, userEmail, userName, serviceDate, instructions, price, status } = service;
    
    // Status color mapping
    const getStatusStyle = (currStatus) => {
        const checkStatus = currStatus?.toLowerCase();
        if (checkStatus === 'completed') {
            return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
        }
        if (checkStatus === 'in progress' || checkStatus === 'service to do') {
            return 'bg-sky-500/10 text-sky-500 border border-sky-500/20';
        }
        return 'bg-orange-500/10 text-orange-500 border border-orange-500/20'; // default: pending
    };

    return (
        <article className="glass-card-interactive group flex flex-col h-full bg-white dark:bg-[#130E26]/80 rounded-3xl border border-slate-100 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
            
            {/* Image Container with Zoom Effect */}
            <div className="relative aspect-video overflow-hidden">
                <img 
                    src={serviceImage} 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
                    alt={serviceName} 
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-lg font-extrabold px-4 py-1.5 rounded-2xl shadow-lg backdrop-blur-md">
                    ${price}
                </div>
            </div>

            {/* Content Details */}
            <div className="flex-grow p-6 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
                        {serviceName}
                    </h3>
                    
                    {/* Calendar / Date */}
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/5 px-3 py-2 rounded-xl border border-slate-100 dark:border-white/5">
                        <HiOutlineCalendar className="w-5 h-5 text-orange-500" />
                        <span className="font-bold">{serviceDate}</span>
                    </div>

                    {/* Special Instructions */}
                    <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
                        <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                            <HiOutlineChatBubbleLeftEllipsis className="w-4 h-4 text-orange-500" />
                            Special Instructions:
                        </span>
                        <p className="bg-orange-500/5 border border-orange-500/10 px-3 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 italic">
                            "{instructions || 'None provided'}"
                        </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="border-t border-slate-100 dark:border-white/5 pt-4 space-y-2 text-xs">
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><HiOutlineUser /> Customer</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{userName}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><HiOutlineMail /> Email</span>
                            <span className="font-medium text-slate-600 dark:text-slate-400 truncate max-w-[150px]">{userEmail}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-white/5 pt-2 mt-2">
                            <span className="flex items-center gap-1"><HiOutlineWrenchScrewdriver /> Provider</span>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{providerName}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><HiOutlineMail /> Email</span>
                            <span className="font-medium text-slate-600 dark:text-slate-400 truncate max-w-[150px]">{providerEmail}</span>
                        </div>
                    </div>
                </div>

                {/* Status Badge */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-center">
                    <span className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${getStatusStyle(status)}`}>
                        {status}
                    </span>
                </div>

            </div>

        </article>
    );
};

BookServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default BookServiceCard;