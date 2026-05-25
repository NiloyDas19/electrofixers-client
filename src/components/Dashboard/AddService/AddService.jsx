import { useContext } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import swal from 'sweetalert';
import { HiOutlineSparkles, HiOutlineCash, HiOutlineMapPin, HiOutlineDocumentText, HiOutlinePhotograph } from "react-icons/hi2";

const AddService = () => {
    DocumentTitle('Add Service');
    const { isDark, user } = useContext(AuthContext);

    const handleAddService = event => {
        event.preventDefault();
        const form = event.target;
        const providerEmail = user?.email;
        const providerName = user?.displayName;
        const providerImageUrl = user?.photoURL;
        const serviceName = form.service_name.value;
        const serviceArea = form.service_area.value;
        const price = form.service_price.value;
        const description = form.service_description.value;
        const imageUrl = form.image.value;

        const newService = { imageUrl, serviceName, price, serviceArea, description, providerEmail, providerImageUrl, providerName };

        console.log(newService);

        fetch('https://elctrofixers-client-side.vercel.app/services', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newService)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal({
                        title: "Success!",
                        text: "Service Added Successfully!",
                        icon: "success",
                        button: "Awesome!",
                    });
                    form.reset();
                }
            })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="backdrop-blur-md bg-white/80 dark:bg-[#130E26]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl space-y-10">
                
                {/* Section Header */}
                <div className="text-center space-y-3 max-w-xl mx-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        ➕ Provider Dashboard
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
                        Add New <span className="text-gradient-orange">Repair Service</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Fill out the information below to add a new electronic repair listing to the public catalogue. Your profile details will be linked automatically.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleAddService}>
                    
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Service Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Service Name
                                <HiOutlineSparkles className="w-4 h-4 text-orange-500" />
                            </label>
                            <input 
                                type="text" 
                                name="service_name" 
                                placeholder="E.g., iPhone Screen Replacement" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Price ($)
                                <HiOutlineCash className="w-4 h-4 text-orange-500" />
                            </label>
                            <input 
                                type="number" 
                                name="service_price" 
                                placeholder="E.g., 49" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                        </div>

                        {/* Service Area */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Service Area
                                <HiOutlineMapPin className="w-4 h-4 text-orange-500" />
                            </label>
                            <input 
                                type="text" 
                                name="service_area" 
                                placeholder="E.g., Silicon Valley, CA (or Doorstep Service)" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                        </div>

                        {/* Service Description */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Service Description
                                <HiOutlineDocumentText className="w-4 h-4 text-orange-500" />
                            </label>
                            <textarea 
                                name="service_description" 
                                rows="3"
                                placeholder="Describe the diagnostic details, components used, and service terms..." 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400 resize-none" 
                                required 
                            />
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Service Image URL
                                <HiOutlinePhotograph className="w-4 h-4 text-orange-500" />
                            </label>
                            <input 
                                type="text" 
                                name="image" 
                                placeholder="Paste high-res visual banner URL..." 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                        </div>

                    </div>

                    {/* Submit Add Service CTA */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
                        >
                            Publish Repair Service Listing
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default AddService;