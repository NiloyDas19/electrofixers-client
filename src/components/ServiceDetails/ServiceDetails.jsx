import { Link, useLoaderData } from "react-router-dom";

const ServiceDetails = () => {
    const service = useLoaderData();
    return (
        <div>
            Service Details page.
            {service._id}
            <Link to={`/book-now/${service._id}`}><button>Book Now</button></Link>
        </div>
    );
};


export default ServiceDetails;