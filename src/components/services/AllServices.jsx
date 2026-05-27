import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ServiceCard from '../ui/ServiceCard';
import PageHeader from '../ui/PageHeader';

const SERVICES_PER_PAGE = 6;

const AllServices = () => {
    useDocumentTitle('Services');
    const allServices = useLoaderData();
    const [searchTerm, setSearchTerm]     = useState('');
    const [suggestions, setSuggestions]   = useState([]);
    const [currentPage, setCurrentPage]   = useState(1);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        setCurrentPage(1);
        if (!val.trim()) { setSuggestions([]); return; }
        const unique = [...new Set(
            allServices
                .filter((s) => s.serviceName.toLowerCase().includes(val.toLowerCase()))
                .map((s) => s.serviceName)
        )].slice(0, 5);
        setSuggestions(unique);
    };

    const pickSuggestion = (s) => { setSearchTerm(s); setSuggestions([]); };

    const filtered = allServices.filter((s) =>
        s.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages  = Math.ceil(filtered.length / SERVICES_PER_PAGE);
    const start       = (currentPage - 1) * SERVICES_PER_PAGE;
    const currentList = filtered.slice(start, start + SERVICES_PER_PAGE);

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">

            {/* Header */}
            <PageHeader
                eyebrow="Service catalog"
                heading="All repair services"
                description="Browse our comprehensive list of professional electronic repair services. Use the search to find exactly what you need."
            />

            {/* Search */}
            <div className="max-w-md mx-auto relative">
                <div className="flex items-center gap-2 border-b border-zinc-300 dark:border-zinc-700 focus-within:border-zinc-900 dark:focus-within:border-white transition-colors pb-1">
                    <FiSearch className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search services..."
                        className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none"
                    />
                </div>
                {suggestions.length > 0 && (
                    <ul className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded shadow-lg z-20 overflow-hidden">
                        {suggestions.map((s, i) => (
                            <li
                                key={i}
                                onClick={() => pickSuggestion(s)}
                                className="px-4 py-2.5 text-sm cursor-pointer text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
                            >
                                {s}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
                <div className="text-center py-24 space-y-2">
                    <p className="text-4xl">&#128269;</p>
                    <p className="font-semibold text-zinc-900 dark:text-white">No services found</p>
                    <p className="text-sm text-zinc-400">Try a different search term.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {currentList.map((s) => (
                            <ServiceCard key={s._id} service={s} />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-1 pt-4">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded text-xs font-semibold transition-all ${
                                        currentPage === i + 1
                                            ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                                            : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllServices;
