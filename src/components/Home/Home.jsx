import Banner from "./Banner/Banner";
import DocumentTitle from './../../documentTitle/DocumentTitle';
import { Link, useLoaderData } from "react-router-dom";
import PopularServicesCard from "./PopularServicesCard";

const Home = () => {
    DocumentTitle('Home');
    const services = useLoaderData();
    
    return (
        <div className="space-y-10">
            <Banner></Banner>

            {/* Popular services */}
            <div className="w-[95%] mx-auto space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold">Popular Services</h1>
                    <p>The "Popular Services" section highlights the most sought-after and frequently requested services offered on the platform. It serves as a curated list of top services that are popular among users, providing them with quick access to the most desired options. This section showcases a variety of services across different categories, ranging from household repairs and maintenance to professional consultations and wellness treatments. By featuring popular services prominently, users can easily discover and explore the most in-demand offerings, making their decision-making process more convenient and efficient.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {
                        services.slice(0, 6).map(service => <PopularServicesCard key={service._id} service = {service}></PopularServicesCard>)
                    }
                </div>
                <div className="text-center">
                    <Link to={`/all-services`}><button className="btn bg-orange-500 text-white font-bold">View All Posts</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Home;