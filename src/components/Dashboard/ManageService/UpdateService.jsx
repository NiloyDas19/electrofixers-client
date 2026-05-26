import { useContext } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import swal from 'sweetalert';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineCurrencyDollar, HiOutlineMapPin, HiOutlineDocumentText, HiOutlinePhoto } from "react-icons/hi2";

const UpdateService = () => {
    DocumentTitle('Update Service');
    const { isDark, user } = useContext(AuthContext);
    const service = useLoaderData();
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;
    const navigate = useNavigate();

    const handleUpdateService = event => {
        event.preventDefault();
        const form = event.target;
        const providerEmail = user?.email;
        const providerName = user?.displayName;
        const providerImageUrl = user?.photoURL;
        const serviceNameInput = form.service_name.value;
        const serviceAreaInput = form.service_area.value;
        const priceInput = form.service_price.value;
        const descriptionInput = form.service_description.value;
        const imageUrlInput = form.image.value;

        const updateServiceData = { imageUrl: imageUrlInput, serviceName: serviceNameInput, price: priceInput, serviceArea: serviceAreaInput, description: descriptionInput, providerEmail, providerImageUrl, providerName };

        console.log(updateServiceData);

        fetch(`https://elctrofixers-client-side.vercel.app/update-service/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateServiceData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    swal({
                        title: "Success!",
                        text: "Service Updated Successfully!",
                        icon: "success",
                        button: "Awesome!",
                    });
                    navigate('/dashboard/manage-service');
                }
            })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="backdrop-blur-md bg-white/80 dark:bg-[#130E26]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-10">
                
                {/* Section Header */}
                <div className="text-center space-y-3 max-w-xl mx-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        ⚙️ Manage Listing
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
                        Update <span className="text-gradient-orange">Service details</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Make modifications to your repair service details below. Any updates will reflect instantly on the public catalog index.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleUpdateService}>
                    
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
                                defaultValue={serviceName}
                                placeholder="E.g., iPhone Screen Replacement" 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                        </div>

                        {/* Price */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Price ($)
                                <HiOutlineCurrencyDollar className="w-4 h-4 text-orange-500" />
                            </label>
                            <input 
                                type="number" 
                                name="service_price" 
                                defaultValue={price}
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
                                defaultValue={serviceArea}
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
                                defaultValue={description}
                                placeholder="Describe the diagnostic details, components used, and service terms..." 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400 resize-none" 
                                required 
                            />
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Service Image URL
                                <HiOutlinePhoto className="w-4 h-4 text-orange-500" />
                            </label>
                            <input 
                                type="text" 
                                name="image" 
                                defaultValue={imageUrl}
                                placeholder="Paste high-res visual banner URL..." 
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                        </div>

                    </div>

                    {/* Submit Update CTA */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
                        >
                            Save Repairs Details Changes
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default UpdateService;