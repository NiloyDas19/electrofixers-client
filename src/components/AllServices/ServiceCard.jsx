import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {
    const {_id} = service;
    return (
        <div>
            <Link to={`/services/${_id}`}><button>View Details</button></Link>
        </div>
    );
};

ServiceCard.propTypes = {
    service : PropTypes.object.isRequired,
}

export default ServiceCard;