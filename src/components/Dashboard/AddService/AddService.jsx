import { useContext } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import swal from 'sweetalert';

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
        const serviceArea = form.elements.service_area.value;
        const price = form.service_price.value;
        const description = form.service_description.value;
        const imageUrl = form.image.value;

        const newService = { imageUrl, serviceName, price, serviceArea, description, providerEmail, providerImageUrl, providerName};

        console.log(newService);

        // fetch('https://dream-destination-server-side.vercel.app/addTouristsSpot', {
        //     method: "POST",
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(newTouristsSpot)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.insertedId) {
        //             swal({
        //                 title: "Good job!",
        //                 text: "Tourists Spot Added Successfully",
        //                 icon: "success",
        //                 button: "ok!",
        //             });
        //             form.reset();
        //         }
        //     })
    }

    return (
        <div className={`space-y-10 w-[90%] mx-auto pt-20`}>
            <div className={`${isDark === 'dark' ? "bg-[#28185d] shadow-amber-200" : "bg-slate-50 shadow-gray-200"}   shadow-2xl space-y-10 rounded-2xl`}>
                <div className="text-center space-y-2 pt-10 px-2">
                    <h4 className="font-bold text-3xl text-purple-500">Add Service</h4>
                    <p>
                        Add Your Services here.
                    </p>
                </div>

                <form className="space-y-2 flex justify-center" onSubmit={handleAddService}>
                    <div className="w-[90%]">
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="font-bold">Service Name
                                        </span>
                                    </div>
                                    <input type="text" name="service_name" placeholder="Enter Service Name" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Price</span>
                                    </div>
                                    <input type="number" name="service_price" placeholder="Example : 20$" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>
                        <div className="md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="font-bold">Service Area</span>
                                    </div>
                                    <select name="service_area" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required>
                                        <option selected>Select the Service Area</option>
                                        <option value="Television Repair">Television Repair</option>
                                        <option value="Smartphone Repair">Smartphone Repair</option>
                                        <option value="Laptop Repair">Laptop Repair</option>
                                        <option value="Tablet Repair">Tablet Repair</option>
                                        <option value="Camera Repair">Camera Repair</option>
                                        <option value="Gaming Console Repair">Gaming Console Repair</option>
                                        <option value="Printer Repair">Printer Repair</option>
                                        <option value="Home Appliance Repair">Home Appliance Repair</option>
                                        <option value="Audio System Repair">Audio System Repair</option>
                                        <option value="Computer Repair">Computer Repair</option>
                                        <option value="Fan Repair">Fan Repair</option>
                                        <option value="Light Fixture Repair">Light Fixture Repair</option>
                                        <option value="Microwave Repair">Microwave Repair</option>
                                        <option value="Refrigerator Repair">Refrigerator Repair</option>
                                        <option value="Air Conditioner Repair">Air Conditioner Repair</option>
                                        <option value="Washing Machine Repair">Washing Machine Repair</option>
                                        <option value="Dishwasher Repair">Dishwasher Repair</option>
                                        <option value="Vacuum Cleaner Repair">Vacuum Cleaner Repair</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Service Description</span>
                                    </div>
                                    <input type="text" name="service_description" placeholder="Enter Service Description" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <label className="w-full">
                                <div className="label">
                                    <span className="font-bold">Image</span>
                                </div>
                                <input type="text" name="image" placeholder="Enter Service Image URL" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                            </label>
                            <div className="mb-10">
                                <input type="submit" value="Add Service" className={`${isDark === 'dark' ? "bg-orange-500 border-blue hover:border-black" : "bg-orange-500"} btn input input-bordered w-full`} />
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddService;