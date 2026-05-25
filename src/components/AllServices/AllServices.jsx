import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import DocumentTitle from './../../documentTitle/DocumentTitle';
import ServiceCard from './ServiceCard';
import { FiSearch } from "react-icons/fi";

const AllServices = () => {
    DocumentTitle('Services');
    const allServices = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [suggestions, setSuggestions] = useState([]);

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        setCurrentPage(1); // Reset to first page when searching

        if (value.trim() === '') {
            // Clear suggestions if search term is empty
            setSuggestions([]);
        } else {
            // Filter suggestions based on the search term
            const filteredSuggestions = allServices
                .filter(service => service.serviceName.toLowerCase().includes(value.toLowerCase()))
                .map(service => service.serviceName);
            // Remove duplicates
            const uniqueSuggestions = [...new Set(filteredSuggestions)];
            setSuggestions(uniqueSuggestions.slice(0, 5)); // Limit to top 5
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        setSuggestions([]);
    };

    const filteredServices = allServices.filter(service =>
        service.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate pagination
    const servicesPerPage = 6;
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
            
            {/* Header Description */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                    🔍 Browse Catalog
                </span>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 dark:text-slate-100">
                    All Repair <span className="text-gradient-orange">Services</span>
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                    Explore our comprehensive catalogue of professional electronic diagnostic and repair offerings. Use the dynamic search filter below to locate specific device solutions.
                </p>
            </div>

            {/* Premium Search Container */}
            <div className="max-w-xl mx-auto relative z-20">
                <div className="relative rounded-2xl bg-white dark:bg-[#130E26]/80 border border-slate-200 dark:border-white/5 shadow-xl p-2 flex items-center transition-all focus-within:border-orange-500/50 focus-within:shadow-orange-500/5">
                    <div className="pl-3 text-slate-400">
                        <FiSearch className="w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by device repair name (e.g. iPhone, printer)..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-3 pr-4 py-2.5 text-sm bg-transparent border-none text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
                    />
                </div>

                {/* Suggestions Glass Dropdown */}
                {suggestions.length > 0 && (
                    <ul className="absolute left-0 right-0 mt-2 z-30 backdrop-blur-md bg-white/95 dark:bg-[#130E26]/95 border border-slate-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-100 dark:divide-white/5 animate-shimmer">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-5 py-3.5 text-sm cursor-pointer hover:bg-orange-500/5 hover:text-orange-500 dark:hover:bg-orange-500/5 text-slate-700 dark:text-slate-300 transition-colors"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Search Results Summary */}
            {filteredServices.length === 0 ? (
                <div className="text-center py-20 space-y-4">
                    <div className="text-6xl">🏜️</div>
                    <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">No Services Found</h3>
                    <p className="text-sm text-slate-400">We couldn't find any repairs matching "{searchTerm}". Please try a different query.</p>
                </div>
            ) : (
                <>
                    {/* Modern 3-Column Responsive Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {currentServices.map(service => (
                            <ServiceCard service={service} key={service._id} />
                        ))}
                    </div>

                    {/* Pagination Indicators */}
                    {filteredServices.length > servicesPerPage && (
                        <div className="flex justify-center items-center gap-2 pt-12">
                            {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => paginate(i + 1)}
                                    className={`w-10 h-10 rounded-xl border flex items-center justify-center font-bold text-sm transition-all ${
                                        currentPage === i + 1 
                                            ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20' 
                                            : 'bg-white dark:bg-[#130E26]/50 border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-orange-500 hover:text-orange-500'
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
