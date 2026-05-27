import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HiOutlinePencilSquare, HiOutlineTrash, HiOutlineMapPin } from 'react-icons/hi2';
import swal from 'sweetalert';
import { API_BASE_URL } from '../../api/config';

const ManageServiceCard = ({ service }) => {
    const { _id, imageUrl, serviceName, description, providerName, providerImageUrl, price, serviceArea } = service;

    const handleDelete = () => {
        swal({
            title: 'Delete service?',
            text:  'This action cannot be undone.',
            icon:  'warning',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        }).then((confirmed) => {
            if (!confirmed) return;
            fetch(`${API_BASE_URL}/service/${_id}`, { method: 'DELETE' })
                .then((r) => r.json())
                .then((data) => {
                    if (data.deletedCount > 0) {
                        swal('Deleted', 'Service removed.', 'success').then(() => window.location.reload());
                    } else {
                        swal('Error', 'Something went wrong.', 'error');
                    }
                });
        });
    };

    return (
        <article className="card-minimal group flex flex-col h-full overflow-hidden">
            {/* Image */}
            <div className="aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800 relative">
                <img
                    src={imageUrl}
                    alt={serviceName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 text-xs font-semibold bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white px-2 py-0.5 rounded border border-zinc-100 dark:border-zinc-800">
                    ${price}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <HiOutlineMapPin className="w-3.5 h-3.5" />
                    <span className="truncate">{serviceArea}</span>
                </div>

                <div className="flex-1 space-y-1.5">
                    <h3 className="font-bold text-zinc-900 dark:text-white text-base line-clamp-1">{serviceName}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">{description}</p>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={providerImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(providerName || 'P')}&background=18181b&color=fff`}
                            onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(providerName || 'P')}&background=18181b&color=fff`; }}
                            alt={providerName}
                            className="w-6 h-6 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                        />
                        <span className="text-xs text-zinc-500 truncate max-w-[100px]">{providerName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to={`/dashboard/update-service/${_id}`} className="btn-ghost p-1.5">
                            <HiOutlinePencilSquare className="w-4 h-4" />
                        </Link>
                        <button onClick={handleDelete} className="btn-danger p-1.5">
                            <HiOutlineTrash className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
};

ManageServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
};

export default ManageServiceCard;
