import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { API_BASE_URL } from '../../api/config';
import swal from 'sweetalert';

const UpdateService = () => {
    useDocumentTitle('Update service');
    const { user }  = useContext(AuthContext);
    const service   = useLoaderData();
    const navigate  = useNavigate();
    const { _id, imageUrl, serviceName, description, price, serviceArea } = service;

    const handleSubmit = (e) => {
        e.preventDefault();
        const f = e.target;
        const payload = {
            imageUrl:         f.image.value,
            serviceName:      f.service_name.value,
            price:            f.service_price.value,
            serviceArea:      f.service_area.value,
            description:      f.service_description.value,
            providerEmail:    user?.email,
            providerImageUrl: user?.photoURL,
            providerName:     user?.displayName,
        };

        fetch(`${API_BASE_URL}/update-service/${_id}`, {
            method:  'PUT',
            headers: { 'content-type': 'application/json' },
            body:    JSON.stringify(payload),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.modifiedCount > 0 || data.matchedCount > 0) {
                    swal({ title: 'Updated!', text: 'Service updated successfully.', icon: 'success', button: 'Done' });
                    navigate('/dashboard/manage-service');
                }
            });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="space-y-1">
                <p className="eyebrow">Manage listing</p>
                <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Update service</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Edit the details below. Changes will reflect instantly on the public catalog.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Service name</label>
                        <input type="text" name="service_name" defaultValue={serviceName} required className="input-box" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Price ($)</label>
                        <input type="number" name="service_price" defaultValue={price} required className="input-box" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Service area</label>
                        <input type="text" name="service_area" defaultValue={serviceArea} required className="input-box" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Service image URL</label>
                        <input type="text" name="image" defaultValue={imageUrl} required className="input-box" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Service description</label>
                        <textarea
                            name="service_description"
                            rows={4}
                            defaultValue={description}
                            required
                            className="input-box resize-none"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full">Save changes</button>
            </form>
        </div>
    );
};

export default UpdateService;
