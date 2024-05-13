import { useContext, useRef } from 'react';
import DocumentTitle from '../../documentTitle/DocumentTitle';
import { AuthContext } from '../../providers/AuthProviders';
import swal from 'sweetalert';
import { useLoaderData } from 'react-router-dom';

const BookNow = () => {
    DocumentTitle('Book Now');
    const { isDark, user } = useContext(AuthContext);
    const service = useLoaderData();
    const serviceDateRef = useRef(null); // Ref for the date input field

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

        fetch('http://localhost:5000/book-service', {
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
                        title: "Good job!",
                        text: "Service Purchase Successfully",
                        icon: "success",
                        button: "ok!",
                    });
                    form.reset();
                }
            })
    }

    return (
        <div className={`space-y-10 w-[90%] mx-auto pt-20`}>
            <div className={`${isDark === 'dark' ? "bg-[#28185d] shadow-amber-200" : "bg-slate-50 shadow-gray-200"}   shadow-2xl space-y-10 rounded-2xl`}>
                <div className="text-center space-y-2 pt-10 px-2">
                    <h4 className="font-bold text-3xl text-purple-500">Booked Your Service</h4>
                    <p>
                        Booked your service here
                    </p>
                </div>

                <form className="space-y-2 flex justify-center" onSubmit={handleBookingService}>
                    <div className="w-[90%]">
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="font-bold">Service ID
                                        </span>
                                    </div>
                                    <input type="text" name="service_id" defaultValue={service._id} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Service Name</span>
                                    </div>
                                    <input type="text" name="service_name" defaultValue={service.serviceName} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="font-bold">Service Image
                                        </span>
                                    </div>
                                    <input type="text" name="service_image" defaultValue={service.imageUrl} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Provider Email</span>
                                    </div>
                                    <input type="text" name="provider_email" defaultValue={service.providerEmail} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="font-bold">Provider Name
                                        </span>
                                    </div>
                                    <input type="text" name="provider_name" defaultValue={service.providerName} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Current User Email</span>
                                    </div>
                                    <input type="text" name="current_user_email" defaultValue={user.email} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="font-bold">Current User Name
                                        </span>
                                    </div>
                                    <input type="text" name="current_user_name" defaultValue={user.displayName} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Service Taking Date</span>
                                    </div>
                                    <input type="date" name="service_tacking_date" ref={serviceDateRef} required className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} />
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Special Instruction</span>
                                    </div>
                                    <input type="text" name="special_instruction" required placeholder="anything like address , area, customized service plan." className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Price</span>
                                    </div>
                                    <input type="number" name="price" defaultValue={service.price} readOnly className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col mt-5">
                            <div className="mb-10">
                                <input type="submit" value="Purchase Service" className={`${isDark === 'dark' ? "bg-orange-500 border-blue hover:border-black" : "bg-orange-500"} btn input input-bordered w-full`} />
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookNow;