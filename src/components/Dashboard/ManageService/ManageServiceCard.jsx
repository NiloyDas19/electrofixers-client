import PropTypes from 'prop-types';
import { HiOutlineMapPin, HiOutlinePencilSquare, HiOutlineTrash } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const ManageServiceCard = ({ service }) => {
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;

    const handleDelete = (_id) => {
        swal({
            title: "Delete Service?",
            text: "Are you sure you want to remove this repair listing? This action cannot be undone.",
            icon: "warning",
            buttons: ["Cancel", "Yes, Delete"],
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://elctrofixers-client-side.vercel.app/service/${_id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                swal("Deleted!", "Your repair service listing has been removed.", {
                                    icon: "success",
                                }).then(() => {
                                    window.location.reload();
                                });
                            }
                            else {
                                swal("Error", "Something went wrong. Please try again!", "error");
                            }
                            console.log(data);
                        })
                }
            });
    }

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
                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Provider Info */}
                    <div className="flex items-center gap-2.5">
                        <img 
                            src={providerImageUrl} 
                            className="h-9 w-9 rounded-full border border-orange-500 object-cover shadow-sm animate-pulse-glow" 
                            alt={providerName} 
                        />
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                            {providerName}
                        </span>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                        <Link 
                            to={`/update-service/${_id}`}
                            className="flex items-center gap-1 px-4 py-2 bg-slate-900 hover:bg-orange-500 dark:bg-white/5 dark:hover:bg-orange-500 text-white text-xs font-bold uppercase rounded-xl transition-all duration-300"
                        >
                            <HiOutlinePencilSquare className="w-3.5 h-3.5" />
                            Update
                        </Link>
                        <button 
                            onClick={() => handleDelete(_id)}
                            className="flex items-center gap-1 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-xs font-bold uppercase rounded-xl transition-all duration-300 border border-red-500/20"
                        >
                            <HiOutlineTrash className="w-3.5 h-3.5" />
                            Delete
                        </button>
                    </div>
                </div>

            </div>

        </article>
    );
};

ManageServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ManageServiceCard;