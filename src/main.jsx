import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './components/Root/Root';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register.jsx/Register';
import AuthProviders from './providers/AuthProviders';
import AllServices from './components/AllServices/AllServices';
import AddService from './components/Dashboard/AddService/AddService';
import PrivateRoutes from './components/Routes/PrivateRoute';
import ManageService from './components/Dashboard/ManageService/ManageService';
import BookedServices from './components/Dashboard/BookedServices/BookedServices';
import ServiceToDo from './components/Dashboard/ServiceToDo/ServiceToDo';
import ServiceDetails from './components/ServiceDetails/ServiceDetails';
import BookNow from './components/BookNow/BookNow';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path: "/all-services",
        element: <AllServices></AllServices>,
        loader : () => fetch('http://localhost:5000/services')
      },
      {
        path: "/add-service",
        element: <PrivateRoutes><AddService></AddService></PrivateRoutes>
      },
      {
        path: "/manage-service",
        element: <PrivateRoutes><ManageService></ManageService></PrivateRoutes>,
        loader: () => fetch('http://localhost:5000/services')
      },
      {
        path: "/booked-services",
        element: <PrivateRoutes><BookedServices></BookedServices> </PrivateRoutes>,
        loader: () => fetch("http://localhost:5000/book-service")
      },
      {
        path: "/service-to-do",
        element: <PrivateRoutes> <ServiceToDo></ServiceToDo> </PrivateRoutes>,
        loader: () => fetch("http://localhost:5000/book-service")
      },
      {
        path: "/services/:id",
        element: <PrivateRoutes> <ServiceDetails></ServiceDetails> </PrivateRoutes>,
        loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
      },
      {
        path: "/book-now/:id",
        element: <PrivateRoutes><BookNow></BookNow></PrivateRoutes>,
        loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
)
