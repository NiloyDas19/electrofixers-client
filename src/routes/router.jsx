import { createBrowserRouter } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

import Root             from '../components/layout/Root';
import ErrorPage        from '../pages/ErrorPage';
import Home             from '../components/Home/Home';
import AllServices      from '../components/services/AllServices';
import ServiceDetails   from '../components/service-details/ServiceDetails';
import Login            from '../components/auth/Login';
import Register         from '../components/auth/Register';
import BookNow          from '../components/book-now/BookNow';
import DashboardLayout  from '../components/Dashboard/DashboardLayout';
import DashboardHome    from '../components/Dashboard/DashboardHome';
import AddService       from '../components/Dashboard/AddService';
import ManageService    from '../components/Dashboard/ManageService';
import UpdateService    from '../components/Dashboard/UpdateService';
import BookedServices   from '../components/Dashboard/BookedServices';
import ServiceToDo      from '../components/Dashboard/ServiceToDo';
import PrivateRoute     from './PrivateRoute';

const router = createBrowserRouter([
    {
        path:         '/',
        element:      <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                index:  true,
                element: <Home />,
                loader: () => fetch(`${API_BASE_URL}/services`),
            },
            {
                path:    'login',
                element: <Login />,
            },
            {
                path:    'register',
                element: <Register />,
            },
            {
                path:    'all-services',
                element: <AllServices />,
                loader:  () => fetch(`${API_BASE_URL}/services`),
            },
            {
                path:    'services/:id',
                element: <PrivateRouteWrap><ServiceDetails /></PrivateRouteWrap>,
                loader:  ({ params }) => fetch(`${API_BASE_URL}/services/${params.id}`),
            },
            {
                path:    'book-now/:id',
                element: <PrivateRouteWrap><BookNow /></PrivateRouteWrap>,
                loader:  ({ params }) => fetch(`${API_BASE_URL}/services/${params.id}`),
            },
            {
                path:    'dashboard',
                element: <PrivateRouteWrap><DashboardLayout /></PrivateRouteWrap>,
                children: [
                    {
                        index:   true,
                        element: <DashboardHome />,
                    },
                    {
                        path:    'add-service',
                        element: <AddService />,
                    },
                    {
                        path:    'manage-service',
                        element: <ManageService />,
                        loader:  () => fetch(`${API_BASE_URL}/services`),
                    },
                    {
                        path:    'booked-services',
                        element: <BookedServices />,
                        loader:  () => fetch(`${API_BASE_URL}/book-service`),
                    },
                    {
                        path:    'service-to-do',
                        element: <ServiceToDo />,
                        loader:  () => fetch(`${API_BASE_URL}/book-service`),
                    },
                    {
                        path:    'update-service/:id',
                        element: <UpdateService />,
                        loader:  ({ params }) => fetch(`${API_BASE_URL}/services/${params.id}`),
                    },
                ],
            },
        ],
    },
]);

// Thin wrapper to avoid importing PrivateRoute everywhere in this file
function PrivateRouteWrap({ children }) {
    return <PrivateRoute>{children}</PrivateRoute>;
}

export default router;
