import { Link, useLoaderData } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { HiOutlineMapPin, HiCheckCircle, HiOutlineShieldCheck } from 'react-icons/hi2';

const INCLUSIONS = [
    'Complete diagnostic troubleshooting',
    'Premium brand-authentic parts',
    'Hardware performance tests',
    '90-day service warranty',
];

const ServiceDetails = () => {
    useDocumentTitle('Service Details');
    const service = useLoaderData();
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
            {/* Breadcrumb */}
            <nav className="text-xs text-zinc-400 mb-8 space-x-2">
                <Link to="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <Link to="/all-services" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Services</Link>
                <span>/</span>
                <span className="text-zinc-600 dark:text-zinc-300">{serviceName}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">

                {/* Left — main content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Image */}
                    <div className="aspect-video rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-800 relative">
                        <img src={imageUrl} alt={serviceName} className="w-full h-full object-cover" />
                        <span className="absolute bottom-4 left-4 flex items-center gap-1 text-xs font-medium text-white bg-black/60 px-2.5 py-1 rounded">
                            <HiOutlineMapPin className="w-3.5 h-3.5" />
                            {serviceArea}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="space-y-1">
                        <p className="eyebrow">Service details</p>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                            {serviceName}
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="border-t border-zinc-100 dark:border-zinc-900 pt-6 space-y-4">
                        <h2 className="font-bold text-zinc-900 dark:text-white">About this service</h2>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{description}</p>

                        <div className="pt-2 space-y-2">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">What&apos;s included</h3>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {INCLUSIONS.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                        <HiCheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Right — sticky sidebar */}
                <div className="lg:col-span-1 space-y-5 lg:sticky lg:top-20">

                    {/* Booking widget */}
                    <div className="card-minimal p-6 space-y-5">
                        <div className="flex items-baseline justify-between">
                            <span className="text-xs text-zinc-400 font-medium">Service fee</span>
                            <span className="text-3xl font-black text-zinc-900 dark:text-white">${price}</span>
                        </div>

                        <ul className="space-y-2">
                            {[
                                'No hidden diagnostic fees',
                                'Verified OEM components',
                                'Fast same-day turnaround',
                            ].map((t) => (
                                <li key={t} className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                                    <HiOutlineShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
                                    {t}
                                </li>
                            ))}
                        </ul>

                        <Link to={`/book-now/${_id}`} className="btn-primary w-full justify-center">
                            Book appointment
                        </Link>
                    </div>

                    {/* Provider card */}
                    <div className="card-minimal p-5 space-y-3">
                        <p className="eyebrow">Your repair expert</p>
                        <div className="flex items-center gap-3">
                            <img
                                src={providerImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(providerName || 'P')}&background=18181b&color=fff`}
                                onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(providerName || 'P')}&background=18181b&color=fff`; }}
                                alt={providerName}
                                className="w-12 h-12 rounded-full object-cover border border-zinc-200 dark:border-zinc-700"
                            />
                            <div>
                                <p className="font-semibold text-zinc-900 dark:text-white text-sm">{providerName}</p>
                                <p className="text-xs text-zinc-400 flex items-center gap-1">
                                    <HiOutlineMapPin className="w-3 h-3" /> {serviceArea}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
