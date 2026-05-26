import { useContext, useRef } from 'react';
import DocumentTitle from '../../documentTitle/DocumentTitle';
import { AuthContext } from '../../providers/AuthProviders';
import swal from 'sweetalert';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { HiOutlineLockClosed, HiOutlineCalendar, HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";

const BookNow = () => {
    DocumentTitle('Book Now');
    const { isDark, user } = useContext(AuthContext);
    const service = useLoaderData();
    const serviceDateRef = useRef(null); // Ref for the date input field
    const navigate = useNavigate();

    const handleBookingService = event => {
        event.preventDefault();
        const form = event.target;
        const serviceId = form.service_id.value;
        const serviceName = form.service_name.value;
        const serviceImage = form.service_image.value;
        const providerEmail = form.provider_email.value;
        const providerName = form.provider_name.value;
        const price = form.price.value;
        const userEmail = form.current_user_email.value;
        const userName = form.current_user_name.value;
        const serviceDate = serviceDateRef.current.value;
        const instructions = form.special_instruction.value;
        const status = "pending";

        const newBookedService = { serviceId, serviceName, serviceImage, providerEmail, providerName, price, userEmail, userName, serviceDate, instructions, status };

        console.log(newBookedService);

        fetch('https://elctrofixers-client-side.vercel.app/book-service', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBookedService)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    swal({
                        title: "Success!",
                        text: "Service Booked Successfully!",
                        icon: "success",
                        button: "Awesome!",
                    });
                    form.reset();
                    navigate('/all-services')
                }
            })
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 md:p-12 shadow-sm space-y-10">
                
                {/* Section Header */}
                <div className="text-center space-y-3 max-w-xl mx-auto">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-xs font-semibold uppercase tracking-wider">
                        📅 Appointment Booking
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100">
                        Book Your <span className="text-blue-600">Repair Service</span>
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Review the service details below, choose your preferred diagnostic scheduling date, and add any specific instructions for our repair technician.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={handleBookingService}>
                    
                    {/* Form Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Service ID (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Service ID
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="service_id" 
                                defaultValue={service._id} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Service Name (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Service Name
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="service_name" 
                                defaultValue={service.serviceName} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Service Image URL (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Service Image URL
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="service_image" 
                                defaultValue={service.imageUrl} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Provider Email (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Provider Email
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="provider_email" 
                                defaultValue={service.providerEmail} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Provider Name (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Provider Name
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="provider_name" 
                                defaultValue={service.providerName} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Customer Email (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Customer Email
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="current_user_email" 
                                defaultValue={user.email} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Customer Name (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Customer Name
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="text" 
                                name="current_user_name" 
                                defaultValue={user.displayName} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Price (Read Only) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                                Price ($)
                                <HiOutlineLockClosed className="w-3.5 h-3.5 text-slate-400" />
                            </label>
                            <input 
                                type="number" 
                                name="price" 
                                defaultValue={service.price} 
                                readOnly 
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm focus:outline-none opacity-80" 
                                required 
                            />
                        </div>

                        {/* Service Taking Date (Editable) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Appointment Date
                                <HiOutlineCalendar className="w-4 h-4 text-blue-600" />
                            </label>
                            <input 
                                type="date" 
                                name="service_tacking_date" 
                                ref={serviceDateRef} 
                                required 
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm focus:outline-none transition-all" 
                            />
                        </div>

                        {/* Special Instructions (Editable) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                                Special Instructions
                                <HiOutlineChatBubbleBottomCenterText className="w-4 h-4 text-blue-600" />
                            </label>
                            <input 
                                type="text" 
                                name="special_instruction" 
                                required 
                                placeholder="E.g., device address, customized time slot..." 
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                            />
                        </div>

                    </div>

                    {/* Submit Purchase CTA */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
                        >
                            Purchase Service Booking
                        </button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default BookNow;