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
import UpdateService from './components/Dashboard/ManageService/UpdateService';

import DashboardLayout from './components/Dashboard/DashboardLayout';
import DashboardHome from './components/Dashboard/DashboardHome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('https://elctrofixers-client-side.vercel.app/services')

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
        loader: () => fetch('https://elctrofixers-client-side.vercel.app/services')
      },
      {
        path: "/dashboard",
        element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
        children: [
          {
            index: true,
            element: <DashboardHome></DashboardHome>
          },
          {
            path: "add-service",
            element: <AddService></AddService>
          },
          {
            path: "manage-service",
            element: <ManageService></ManageService>,
            loader: () => fetch('https://elctrofixers-client-side.vercel.app/services')
          },
          {
            path: "booked-services",
            element: <BookedServices></BookedServices>,
            loader: () => fetch("https://elctrofixers-client-side.vercel.app/book-service")
          },
          {
            path: "service-to-do",
            element: <ServiceToDo></ServiceToDo>,
            loader: () => fetch("https://elctrofixers-client-side.vercel.app/book-service")
          },
          {
            path: "update-service/:id",
            element: <UpdateService></UpdateService>,
            loader: ({ params }) => fetch(`https://elctrofixers-client-side.vercel.app/services/${params.id}`)
          }
        ]
      },
      {
        path: "/services/:id",
        element: <PrivateRoutes> <ServiceDetails></ServiceDetails> </PrivateRoutes>,
        loader: ({ params }) => fetch(`https://elctrofixers-client-side.vercel.app/services/${params.id}`)
      },
      {
        path: "/book-now/:id",
        element: <PrivateRoutes><BookNow></BookNow></PrivateRoutes>,
        loader: ({ params }) => fetch(`https://elctrofixers-client-side.vercel.app/services/${params.id}`)
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
