import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import logo from "../../assets/logo.png"
import { Tooltip } from 'react-tooltip';


const Navbar = () => {
    const { user, logOut, isDark, setIsDark, loading } = useContext(AuthContext);

    useEffect(() => {
        localStorage.setItem('theme', isDark);
    }, [isDark]);

    if (loading) {
        return (
            <div className="text-center">
                <span className="loading loading-spinner loading-sm mx-auto"></span>
                <span className="loading loading-spinner loading-md mx-auto"></span>
                <span className="loading loading-spinner loading-lg mx-auto"></span>
            </div>
        );
    }

    const handleLogOut = () => {
        console.log(user);
        logOut()
            .then(() => {
                console.log("Log Out Successful");
            })
            .catch((error) => {
                console.log(error.message);
            })
    }

    const navLinks = <>
        <li>
            <label className="flex cursor-pointer gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                <input type="checkbox" value="synthwave" className="toggle theme-controller w-12" onChange={() => { (isDark === 'dark') ? setIsDark('light') : setIsDark('dark') }} checked={isDark === 'dark'} />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>
        </li>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/all-services">Services</Link></li>
        {  user && <li>
                <details>
                    <summary>Dashboard</summary>
                    <ul className={`${isDark === 'dark' ? "bg-[#150d32]" : "bg-white"}`}>
                        <li><Link to="/add-service">Add Service</Link></li>
                        <li><Link to="/manage-service">Manage Service</Link></li>
                        <li><Link to="/booked-services">Booked Services</Link></li>
                        <li><Link to="/service-to-do">Service To Do</Link></li>
                    </ul>
                </details>
            </li>
        }
        {
            user ?
                <>
                    <li className="space-y-2">
                        <div className="avatar" data-tooltip-id="my-tooltip">
                            <div className="w-8 md:w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.photoURL ? user.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                            </div>
                        </div>
                    </li>
                    <li onClick={handleLogOut}><Link to="/" className="btn btn-outline bg-orange-500 px-6 font-bold" >Logout</Link></li>
                </>
                :
                <li><Link to="/login" className="btn btn-outline bg-orange-500 px-6 font-bold">Login</Link></li>
        }
    </>
    return (
        <div className={`flex justify-between p-2 ${isDark === 'dark' ? "bg-[#150d32]" : "bg-white"} top-0 z-10 font-bold sticky`}>
            <div className="justify-start flex items-center ">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow  ${isDark === 'dark' ? "bg-[#150d32]" : "bg-white"} rounded-box w-52 space-y-2`}>
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <Link to="/" className="flex justify-center items-center cursor-pointer">
                    <img src={logo} alt="" className="w-16 h-12" />
                    <a className="text-3xl font-semibold">ELECTRO<span className="text-orange-500">FIXERS</span></a>
                </Link>
            </div>
            <div className="justify-end hidden lg:flex">
                <ul className={`menu menu-horizontal px-1 flex justify-center z-10 items-center`}>
                    {
                        navLinks
                    }
                </ul>
            </div>
            <Tooltip
                id="my-tooltip"
                content={user?.displayName}
            />
        </div>
    );
};

export default Navbar;