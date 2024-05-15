import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import DocumentTitle from './../../documentTitle/DocumentTitle';
import ServiceCard from './ServiceCard';


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
            setSuggestions(filteredSuggestions);
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
        <div className='w-[95%] mx-auto space-y-10 mt-10'>
            <div className='space-y-2 text-center'>
                <h2 className='font-bold text-3xl'>This is All Service page</h2>
                <p>User can find all services here</p>
            </div>
            <div className='flex flex-col'>
                <div className='flex'>
                    <input
                        type="text"
                        placeholder={`Search by service name`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="px-4 py-2 border-2 border-gray-300 rounded-l-md focus:outline-none focus:border-orange-500 text-black"
                    />
                </div>
                <div className='relative mt-2'>
                    {suggestions.length > 0 && (
                        <ul className="absolute z-9  mx-auto bg-white rounded-b-md border border-t-0 border-gray-300 shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-black"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {filteredServices.length === 0 && (
                <p className="text-center text-gray-500">No services found with the provided name.</p>
            )}
            <div className='grid grid-cols-1 space-y-5 min-h-screen'>
                {currentServices.map(service => (
                    <ServiceCard service={service} key={service._id} />
                ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center">
                {Array.from({ length: Math.ceil(filteredServices.length / servicesPerPage) }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 mx-1 rounded-md border border-gray-300 hover:bg-gray-200 ${currentPage === i + 1 ? 'bg-gray-200 text-black' : ''}`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AllServices;
