import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const ClientReviewCard = ({ client }) => {
    const { name, rating, review, image_url } = client;

    return (
        <div className="card-minimal p-6 space-y-4">
            {/* Stars */}
            <div className="flex gap-0.5">
                {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                        key={i}
                        className={`w-3.5 h-3.5 ${
                            i < rating ? 'text-amber-400' : 'text-zinc-200 dark:text-zinc-700'
                        }`}
                    />
                ))}
            </div>

            {/* Review text */}
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                &ldquo;{review}&rdquo;
            </p>

            {/* Author */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                <img
                    src={image_url}
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'U')}&background=18181b&color=fff`; }}
                    alt={name}
                    className="w-8 h-8 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                />
                <div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">{name}</p>
                    <p className="text-xs text-zinc-400">Verified customer</p>
                </div>
            </div>
        </div>
    );
};

ClientReviewCard.propTypes = {
    client: PropTypes.object.isRequired,
};

export default ClientReviewCard;
