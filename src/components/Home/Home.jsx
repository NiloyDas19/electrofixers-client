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
                        services.slice(0, 6).map(service => <PopularServicesCard key={service._id} service={service}></PopularServicesCard>)
                    }
                </div>
                <div className="text-center">
                    <Link to={`/all-services`}><button className="btn bg-orange-500 text-white font-bold">View All Posts</button></Link>
                </div>
            </div>

            {/* Frequently Asked Question */}
            <div className="w-[95%] mx-auto space-y-10">
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
                    <p>
                        Frequently Asked Questions (FAQ) section provides answers to common queries that users may have about the website's services, booking process, policies, and more. It serves as a helpful resource for users to quickly find information and address their concerns without the need for direct communication with customer support.</p>
                </div>
                <div>
                    <div className="collapse collapse-plus border-2">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">
                            What services does the website offer?
                        </div>
                        <div className="collapse-content">
                            <p>The website offers a range of electronic item repairing services, including television repair, smartphone repair, laptop repair, tablet repair, and more.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus border-2">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            How can users book a service?
                        </div>
                        <div className="collapse-content">
                            <p>Users can book a service by visiting the "Book Now" page and filling out the booking form with details such as service ID, service name, service image, provider email, provider name, price, current user email, current user name, service taking date, special instructions, and status.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus border-2">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            What additional features does the website provide?
                        </div>
                        <div className="collapse-content">
                            <p>In addition to booking services, the website also features popular services sections showcasing a variety of electronic item repair services. Users can browse through the service cards, view service details, and choose the service that suits their needs.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus border-2">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            How does the website handle user authentication?
                        </div>
                        <div className="collapse-content">
                            <p>The website uses context API and Firebase authentication to manage user authentication. Users can log in using their email and password or using third-party authentication providers like Google.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus border-2">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">
                            Is the website responsive?
                        </div>
                        <div className="collapse-content">
                            <p>Yes, the website is designed to be responsive, ensuring a seamless user experience across various devices and screen sizes. Whether users access the website from a desktop, tablet, or mobile device, they can easily navigate and interact with the content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;