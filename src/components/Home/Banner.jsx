import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';
import image1 from "../../assets/banner1.jpg";
import image2 from "../../assets/banner2.jpg";
import image3 from "../../assets/banner3.jpg";
import image4 from "../../assets/banner4.jpg";

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
        "Expert Smartphone Repairs",
        "Ultra-Fast PC Maintenance",
        "Gaming Console Solutions",
        "Smart Home Appliance Fixes",
    ];

    return (
        <section className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950 pt-16 pb-16 lg:pt-32 lg:pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    
                    {/* Left content */}
                    <div className="space-y-8 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider">
                                Top-rated repair center
                            </span>
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
                                We bring your <br className="hidden sm:block" />
                                <span className="text-zinc-400 dark:text-zinc-600">broken devices</span><br className="hidden sm:block" />
                                back to life.
                            </h1>
                            <div className="h-6">
                                <p key={imageIndex} className="text-base sm:text-lg font-medium text-zinc-500 dark:text-zinc-400 animate-fade-in max-w-md mx-auto lg:mx-0">
                                    {bannerDetails[imageIndex]}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link to="/all-services" className="btn-primary px-6 py-3 text-base">
                                Book a repair <HiArrowRight className="w-4 h-4 ml-1" />
                            </Link>
                            <a href="#about" className="btn-ghost px-6 py-3 text-base">
                                Learn more
                            </a>
                        </div>
                        
                        {/* Dots */}
                        <div className="flex justify-center lg:justify-start gap-2 pt-4">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setImageIndex(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                        idx === imageIndex ? 'w-8 bg-zinc-900 dark:bg-white' : 'w-2 bg-zinc-200 dark:bg-zinc-800'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="hidden lg:block relative aspect-[4/3] w-full max-w-md mx-auto lg:mx-0 lg:ml-auto group">
                        <div className="relative w-full h-full transition-transform duration-700 group-hover:-translate-y-2">
                            {images.map((img, idx) => {
                                let styleClass = 'z-0 opacity-0 scale-75';
                                if (idx === imageIndex) {
                                    styleClass = 'z-30 rotate-0 scale-100 opacity-100 translate-y-0 shadow-2xl';
                                } else if (idx === (imageIndex + 1) % images.length) {
                                    styleClass = 'z-20 rotate-6 scale-95 opacity-80 translate-x-4 translate-y-2 shadow-lg';
                                } else if (idx === (imageIndex + 2) % images.length) {
                                    styleClass = 'z-10 -rotate-3 scale-90 opacity-50 -translate-x-4 translate-y-4 shadow-md';
                                }

                                return (
                                    <div 
                                        key={idx}
                                        className={`absolute inset-0 w-full h-full rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 transition-all duration-700 ease-out ${styleClass}`}
                                    >
                                        <img 
                                            src={img} 
                                            alt={`Slide ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Banner;
