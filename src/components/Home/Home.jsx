import { Link, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Banner from './Banner';
import ServiceCard from '../ui/ServiceCard';
import ClientReviewCard from './ClientReviewCard';
import PageHeader from '../ui/PageHeader';

const FAQS = [
    {
        q: 'What services does ElectroFixers offer?',
        a: 'We provide comprehensive electronic repair solutions including smartphones, gaming consoles, PCs, laptops, televisions, and smart appliances.',
    },
    {
        q: 'How do I book a service?',
        a: 'Navigate to a service, click "View details", then "Book appointment". Fill in your preferred date and any special instructions.',
    },
    {
        q: 'What additional features are available?',
        a: 'Registered providers can manage listings, monitor bookings, and track repair statuses from their personal dashboard.',
    },
    {
        q: 'How does authentication work?',
        a: 'We use Firebase Authentication supporting email/password login and one-click Google Sign-In.',
    },
    {
        q: 'Is the site mobile-friendly?',
        a: 'Yes — the interface is fully responsive and works seamlessly on phones, tablets, and desktops.',
    },
];

const Home = () => {
    useDocumentTitle('Home');
    const services = useLoaderData();
    const [clients, setClients] = useState([]);
    const [openFaq, setOpenFaq] = useState(0);

    useEffect(() => {
        fetch('/review.json')
            .then((r) => r.json())
            .then(setClients)
            .catch(() => {});
    }, []);

    return (
        <div>
            {/* Hero */}
            <Banner />

            {/* Popular Services */}
            <hr className="border-zinc-200 dark:border-zinc-800 mx-auto max-w-6xl" />
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
                    <PageHeader
                        eyebrow="Popular services"
                        heading="What we fix"
                        description="Our most-booked electronic repair services, trusted by thousands of customers across the country."
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.slice(0, 6).map((service) => (
                            <ServiceCard key={service._id} service={service} />
                        ))}
                    </div>

                    <div className="text-center">
                        <Link to="/all-services" className="btn-outline">
                            View all services &rarr;
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            {clients.length > 0 && (
                <>
                    <hr className="border-zinc-200 dark:border-zinc-800 mx-auto max-w-6xl" />
                    <section className="py-20">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
                        <PageHeader
                            eyebrow="Testimonials"
                            heading="What our customers say"
                            description="Real feedback from customers who experienced our fast, high-quality repair services."
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {clients.map((client, i) => (
                                <ClientReviewCard key={i} client={client} />
                            ))}
                        </div>
                    </div>
                </section>
                </>
            )}

            {/* About */}
            <hr className="border-zinc-200 dark:border-zinc-800 mx-auto max-w-6xl" />
            <section id="about" className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-5">
                            <p className="eyebrow">About us</p>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                                Precision repair,<br />every time.
                            </h2>
                            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                ElectroFixers is your premier destination for high-quality electronics repair. Our certified specialists carry years of experience troubleshooting hardware and software issues across all major device brands.
                            </p>
                            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                We deliver transparent pricing, warranty protection, and fast turnarounds — because we know how essential your devices are to daily life.
                            </p>
                            <Link to="/all-services" className="btn-primary inline-flex">
                                Explore services
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            {[
                                { stat: '10k+',  label: 'Devices repaired' },
                                { stat: '99.8%', label: 'Client satisfaction' },
                                { stat: 'Same day', label: 'Turnaround available' },
                                { stat: '2024',   label: 'Established' },
                            ].map(({ stat, label }) => (
                                <div key={label} className="card-minimal p-6 space-y-1">
                                    <p className="text-2xl font-black text-zinc-900 dark:text-white">{stat}</p>
                                    <p className="text-xs text-zinc-400">{label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <hr className="border-zinc-200 dark:border-zinc-800 mx-auto max-w-6xl" />
            <section className="py-24 bg-white dark:bg-zinc-950">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                        {/* FAQ Header */}
                        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                            <p className="eyebrow">FAQ</p>
                            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                                Have questions?
                            </h2>
                            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-md">
                                Find answers to common questions about our repair services, warranties, and platform features.
                            </p>
                            <div className="pt-2">
                                <Link to="/all-services" className="btn-outline">
                                    Browse all services
                                </Link>
                            </div>
                        </div>

                        {/* Accordion */}
                        <div className="lg:col-span-7">
                            <div className="card-minimal divide-y divide-zinc-100 dark:divide-zinc-800">
                                {FAQS.map((faq, i) => (
                                    <div key={i} className="px-6">
                                        <button
                                            onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                                            className="w-full flex items-center justify-between py-6 text-left gap-4 group"
                                        >
                                            <span className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-accent transition-colors">{faq.q}</span>
                                            <span className={`w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 transition-transform duration-200 flex-shrink-0 ${
                                                openFaq === i ? 'rotate-180 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white' : ''
                                            }`}>
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={openFaq === i ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                                </svg>
                                            </span>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed pr-10">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;