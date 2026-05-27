import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { API_BASE_URL } from '../../api/config';
import swal from 'sweetalert';

const FIELDS = [
    { label: 'Service name',        name: 'service_name',        type: 'text',   placeholder: 'e.g. iPhone Screen Replacement',           span: 1 },
    { label: 'Price ($)',           name: 'service_price',       type: 'number', placeholder: 'e.g. 49',                                  span: 1 },
    { label: 'Service area',        name: 'service_area',        type: 'text',   placeholder: 'e.g. Silicon Valley, CA',                  span: 2 },
    { label: 'Service image URL',   name: 'image',               type: 'text',   placeholder: 'Paste image URL...',                       span: 2 },
];

const AddService = () => {
    useDocumentTitle('Add service');
    const { user } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const f = e.target;
        const payload = {
            imageUrl:        f.image.value,
            serviceName:     f.service_name.value,
            price:           f.service_price.value,
            serviceArea:     f.service_area.value,
            description:     f.service_description.value,
            providerEmail:   user?.email,
            providerImageUrl: user?.photoURL,
            providerName:    user?.displayName,
        };

        fetch(`${API_BASE_URL}/services`, {
            method:  'POST',
            headers: { 'content-type': 'application/json' },
            body:    JSON.stringify(payload),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.insertedId) {
                    swal({ title: 'Published!', text: 'Service added successfully.', icon: 'success', button: 'Done' });
                    f.reset();
                }
            });
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="space-y-1">
                <p className="eyebrow">Provider dashboard</p>
                <h1 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">Add new service</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Fill in the details below to publish a new repair listing to the catalog.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {FIELDS.map(({ label, name, type, placeholder, span }) => (
                        <div key={name} className={`space-y-1 ${span === 2 ? 'sm:col-span-2' : ''}`}>
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</label>
                            <input
                                type={type}
                                name={name}
                                placeholder={placeholder}
                                required
                                className="input-box"
                            />
                        </div>
                    ))}
                    <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Service description</label>
                        <textarea
                            name="service_description"
                            rows={4}
                            placeholder="Describe the repair, components used, and service terms..."
                            required
                            className="input-box resize-none"
                        />
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Publish service
                </button>
            </form>
        </div>
    );
};

export default AddService;
