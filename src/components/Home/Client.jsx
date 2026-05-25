import { PropTypes } from 'prop-types';
import { AuthContext } from '../../providers/AuthProviders';
import { useContext } from 'react';
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Client = ({ client }) => {
    const { name, rating, review, image_url } = client;
    const { isDark } = useContext(AuthContext);
    
    // Create an array of star icons based on rating
    const stars = Array.from({ length: 5 }, (_, idx) => (
        <FaStar 
            key={idx} 
            className={`w-4 h-4 ${idx < rating ? "text-amber-400" : "text-slate-200 dark:text-slate-700"}`} 
        />
    ));

    return (
        <div className={`p-8 rounded-3xl border transition-all duration-300 relative ${isDark === 'dark' ? "bg-[#130E26]/70 border-white/5 shadow-2xl hover:border-orange-500/20" : "bg-white border-slate-100 shadow-xl hover:shadow-2xl hover:border-orange-500/10"}`}>
            
            {/* Decorative Quote Icon */}
            <div className="absolute top-6 right-8 text-orange-500/10 pointer-events-none">
                <FaQuoteLeft className="w-10 h-10" />
            </div>

            <div className="space-y-6">
                
                {/* Rating Stars */}
                <div className="flex gap-1">
                    {stars}
                </div>

                {/* Review Text */}
                <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed italic">
                    "{review}"
                </p>

                {/* Divider Line */}
                <div className="border-t border-slate-100 dark:border-white/5 w-12"></div>

                {/* Client Profile */}
                <div className="flex items-center gap-3">
                    <img 
                        src={image_url} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/50 shadow-inner" 
                        alt={name} 
                    />
                    <div className="flex flex-col">
                        <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{name}</span>
                        <span className="text-xs text-slate-400 font-medium">Verified Customer</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

Client.propTypes = {
    client: PropTypes.object.isRequired,
}

export default Client;