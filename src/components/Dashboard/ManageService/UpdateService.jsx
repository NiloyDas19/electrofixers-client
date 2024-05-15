import { useContext } from 'react';
import DocumentTitle from '../../../documentTitle/DocumentTitle';
import { AuthContext } from '../../../providers/AuthProviders';
import swal from 'sweetalert';
import { useLoaderData, useNavigate } from 'react-router-dom';

const UpdateService = () => {
    DocumentTitle('Update Service');
    const { isDark, user } = useContext(AuthContext);
    const service = useLoaderData();
    const {_id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;
    const navigate = useNavigate();


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

        const   updateService = { imageUrl, serviceName, price, serviceArea, description, providerEmail, providerImageUrl, providerName };

        console.log(updateService);

        fetch(`http://localhost:5000/update-service/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateService)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    swal({
                        title: "Good job!",
                        text: "Service Updated Successfully",
                        icon: "success",
                        button: "ok!",
                    });
                    navigate('/manage-service');
                }
                
            })
    }

    return (
        <div className={`space-y-10 w-[90%] mx-auto pt-20`}>
            <div className={`${isDark === 'dark' ? "bg-[#28185d] shadow-amber-200" : "bg-slate-50 shadow-gray-200"}   shadow-2xl space-y-10 rounded-2xl`}>
                <div className="text-center space-y-2 pt-10 px-2">
                    <h4 className="font-bold text-3xl text-purple-500">Update Service</h4>
                    <p>
                        Update Your Services here.
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
                                    <input type="text" name="service_name" defaultValue={serviceName} placeholder="Enter Service Name" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Price</span>
                                    </div>
                                    <input type="number" name="service_price" defaultValue={price} placeholder="Example : 20$" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>
                        <div className="md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Service Area</span>
                                    </div>
                                    <input type="text" name="service_area" defaultValue={serviceArea} placeholder="Enter your service area" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>
                        <div className=" md:flex gap-10">
                            <div className="w-full">
                                <label className="form-control w-full ">
                                    <div className="label">
                                        <span className="font-bold">Service Description</span>
                                    </div>
                                    <input type="text" name="service_description" defaultValue={description} placeholder="Enter Service Description" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-col gap-5">
                            <label className="w-full">
                                <div className="label">
                                    <span className="font-bold">Image</span>
                                </div>
                                <input type="text" name="image" defaultValue={imageUrl} placeholder="Enter Service Image URL" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                            </label>
                            <div className="mb-10">
                                <input type="submit" value="Update Service" className={`${isDark === 'dark' ? "bg-orange-500 border-blue hover:border-black" : "bg-orange-500"} btn input input-bordered w-full`} />
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateService;