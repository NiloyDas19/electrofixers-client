import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders";

const Root = () => {
    const {isDark} = useContext(AuthContext);
    return (
        <div className= {isDark === 'dark' ? "bg-[#1A103D] text-white" : "bg-white text-black"}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;