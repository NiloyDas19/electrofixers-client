import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../../assets/banner1.jpg";
import image2 from "../../../assets/banner2.jpg";
import image3 from "../../../assets/banner3.jpg";
import image4 from "../../../assets/banner4.jpg";

const Banner = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = [
        image1,
        image2,
        image3,
        image4
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
            <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
                <div className="relative z-[1] bg-opacity-75 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="px-10 py-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                                <span className="block">Your Electronic Devices Deserve</span>
                                <span className="block text-orange-500">Expert Repair Services</span>
                            </h2>
                            <p className="mt-4 text-lg leading-6 text-gray-700">Trust our skilled technicians to fix your gadgets with precision and care.</p>
                            <div className="mt-8 flex justify-center">
                                <div className="inline-flex rounded-md shadow">
                                    <Link to="/all-services" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-500 hover:bg-blue-600">
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute inset-0 overflow-hidden">
                <img className="h-full w-full object-cover" src={images[imageIndex]}/>
            </div>
        </div>
    );
}

export default Banner;
