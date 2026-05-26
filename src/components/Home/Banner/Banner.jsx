import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../../assets/banner1.jpg";
import image2 from "../../../assets/banner2.jpg";
import image3 from "../../../assets/banner3.jpg";
import image4 from "../../../assets/banner4.jpg";

const Banner = () => {
    const [imageIndex, setImageIndex] = useState(0);
    const images = [image1, image2, image3, image4];

    useEffect(() => {
        const interval = setInterval(() => {
            setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    const bannerDetails = [
        {
            title: "Expert Smartphone & Device Repairs",
            description: "Cracked screen? Battery issues? Our certified technicians restore your essential devices to brand-new performance with absolute precision and premium parts."
        },
        {
            title: "Ultra-Fast Laptop & PC Maintenance",
            description: "From virus removal to complete motherboard diagnostics and component upgrades, we keep your personal computers running at peak speeds."
        },
        {
            title: "Gaming Console & Controller Solutions",
            description: "Don't let stick drift or overheating halt your gaming. We specialize in servicing PlayStation, Xbox, and Nintendo Switch devices with quick turnaround times."
        },
        {
            title: "Trusted Smart Home Appliances Repair",
            description: "Get your household appliances, smart printers, and televisions repaired quickly by experienced local professionals who guarantee their work."
        }
    ];

    return (
        <section className="relative min-h-[580px] sm:min-h-[620px] lg:h-[650px] w-full overflow-hidden flex items-center justify-center py-10 lg:py-0">
            
            {/* Background Images with Zoom & Crossfade Effect */}
            <div className="absolute inset-0 z-0">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === imageIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img 
                            className="h-full w-full object-cover transform scale-105 animate-float-slow" 
                            src={img} 
                            alt={`Banner Slide ${idx + 1}`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0B081A]/95 via-[#0B081A]/60 to-[#0B081A]/10 dark:from-[#0B081A]/95 dark:via-[#0B081A]/80 dark:to-transparent" />
                    </div>
                ))}
            </div>

            {/* Content Card Overlay */}
            <div className="relative z-10 max-w-7xl w-[92%] sm:w-[90%] mx-auto flex justify-start">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-white rounded-2xl p-6 sm:p-10 md:p-16 max-w-2xl shadow-lg space-y-5 sm:space-y-6 transition-all duration-300">
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/20 border border-blue-600/40 text-blue-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase animate-pulse">
                        🛡️ Trusted Repair Center
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-md text-white">
                        {bannerDetails[imageIndex].title.split(" ").map((word, idx) => {
                            if (word === "Repairs" || word === "Maintenance" || word === "Solutions" || word === "Repair") {
                                return <span key={idx} className="text-blue-500 block md:inline">{word} </span>;
                            }
                            return word + " ";
                        })}
                    </h1>

                    <p className="text-xs sm:text-sm md:text-lg text-slate-200 leading-relaxed drop-shadow-sm font-medium">
                        {bannerDetails[imageIndex].description}
                    </p>

                    <div className="pt-2 sm:pt-4 flex flex-wrap gap-3 sm:gap-4">
                        <Link 
                            to="/all-services" 
                            className="px-6 py-3 sm:px-8 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-2 text-xs sm:text-sm"
                        >
                            Explore Services
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                        
                        <a 
                            href="#about-us" 
                            className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 backdrop-blur-sm hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-xs sm:text-sm"
                        >
                            Learn More
                        </a>
                    </div>

                    {/* Progress Dash Indicators */}
                    <div className="flex gap-2 pt-4 sm:pt-6">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setImageIndex(idx)}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${idx === imageIndex ? 'w-6 sm:w-8 bg-blue-600' : 'w-1.5 sm:w-2 bg-white/30 hover:bg-white/50'}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                </div>
            </div>

        </section>
    );
}

export default Banner;
