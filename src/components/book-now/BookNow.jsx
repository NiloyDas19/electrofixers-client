import { useContext, useRef } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { useLoaderData, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { HiOutlineLockClosed } from 'react-icons/hi2';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { API_BASE_URL } from '../../api/config';

const ReadOnlyField = ({ label, value, name }) => (
    <div className="space-y-1">
        <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <HiOutlineLockClosed className="w-3 h-3" /> {label}
        </label>
        <input
            type="text"
            name={name}
            defaultValue={value}
            readOnly
            className="input-readonly"
        />
    </div>
);

const BookNow = () => {
    useDocumentTitle('Book now');
    const { user } = useContext(AuthContext);
    const service  = useLoaderData();
    const dateRef  = useRef(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const f = e.target;
        const payload = {
            serviceId:    f.service_id.value,
            serviceName:  f.service_name.value,
            serviceImage: f.service_image.value,
            providerEmail: f.provider_email.value,
            providerName:  f.provider_name.value,
            price:         f.price.value,
            userEmail:     f.current_user_email.value,
            userName:      f.current_user_name.value,
            serviceDate:   dateRef.current.value,
            instructions:  f.special_instruction.value,
            status:        'pending',
        };

        fetch(`${API_BASE_URL}/book-service`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(payload),
        })
            .then((r) => r.json())
            .then((data) => {
                if (data.insertedId) {
                    swal({ title: 'Booked!', text: 'Your appointment has been confirmed.', icon: 'success', button: 'Done' });
                    f.reset();
                    navigate('/all-services');
                }
            });
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            <div className="space-y-2 mb-10">
                <p className="eyebrow">Appointment booking</p>
                <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Book a repair</h1>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Review the details below, choose your preferred date, and add any instructions for the technician.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="card-minimal p-6 space-y-5">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Service details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <ReadOnlyField label="Service ID"    name="service_id"         value={service._id} />
                        <ReadOnlyField label="Service name"  name="service_name"        value={service.serviceName} />
                        <ReadOnlyField label="Image URL"     name="service_image"       value={service.imageUrl} />
                        <ReadOnlyField label="Provider"      name="provider_name"       value={service.providerName} />
                        <ReadOnlyField label="Provider email" name="provider_email"     value={service.providerEmail} />
                        <ReadOnlyField label="Price ($)"     name="price"              value={service.price} />
                        <ReadOnlyField label="Your name"     name="current_user_name"  value={user.displayName} />
                        <ReadOnlyField label="Your email"    name="current_user_email" value={user.email} />
                    </div>
                </div>

                <div className="card-minimal p-6 space-y-5">
                    <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Your appointment</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Appointment date</label>
                            <input
                                type="date"
                                name="service_tacking_date"
                                ref={dateRef}
                                required
                                className="input-box"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Special instructions</label>
                            <input
                                type="text"
                                name="special_instruction"
                                required
                                placeholder="e.g. preferred time, device model..."
                                className="input-box"
                            />
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-primary w-full">
                    Confirm booking
                </button>
            </form>
        </div>
    );
};

export default BookNow;
