import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="text-center">
                <span className="loading loading-spinner loading-sm mx-auto"></span>
                <span className="loading loading-spinner loading-md mx-auto"></span>
                <span className="loading loading-spinner loading-lg mx-auto"></span>
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

PrivateRoutes.propTypes = {
    children: PropTypes.node,
}


export default PrivateRoutes;