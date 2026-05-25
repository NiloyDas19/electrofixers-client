import PropTypes from 'prop-types';
import { HiOutlineCalendar, HiOutlineUser, HiOutlineMail, HiOutlineWrenchScrewdriver, HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import swal from 'sweetalert';

const ServiceToDOCard = ({ service }) => {
    const { _id, serviceImage, serviceName, providerEmail, providerName, userName, userEmail, serviceDate, instructions, price, status } = service;
    
    const handleStatus = (event) => {
        const newStatus = event.target.value;
        const updateService = { newStatus };
        
        fetch(`https://elctrofixers-client-side.vercel.app/update-booked-service/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateService)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    swal("Status Updated!", `Repair status successfully changed to: ${newStatus.toUpperCase()}`, "success");
                } else {
                    swal("Success", `Status stays: ${newStatus.toUpperCase()}`, "info");
                }
                console.log(data);
            })
    }

    // Status select styles based on active selection
    const getSelectBg = (currStatus) => {
        const check = currStatus?.toLowerCase();
        if (check === 'completed') return 'bg-emerald-500 text-white';
        if (check === 'working' || check === 'in progress') return 'bg-sky-500 text-white';
        return 'bg-orange-500 text-white'; // default: pending
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

                {/* Status Dropdown Controller */}
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Update Diagnostic Status</span>
                    <select 
                        defaultValue={status}
                        onChange={handleStatus}
                        className={`w-full py-3 px-4 rounded-2xl text-xs font-black uppercase tracking-widest text-center border-none focus:outline-none transition-all shadow-md cursor-pointer ${getSelectBg(status)}`}
                    >
                        <option value="pending">pending</option>
                        <option value="working">working</option>
                        <option value="completed">completed</option>
                    </select>
                </div>

            </div>

        </article>
    );
};

ServiceToDOCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ServiceToDOCard;