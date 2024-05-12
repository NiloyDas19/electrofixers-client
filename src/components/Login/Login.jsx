import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProviders";
import swal from 'sweetalert';
import DocumentTitle from './../../documentTitle/DocumentTitle';


const Login = () => {
    DocumentTitle('Login');
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithEmailPassword, loginWithGoogle , setLoading, isDark } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);


    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        loginWithEmailPassword(email, password)
            .then(result => {
                console.log(result.user);
                swal({
                    icon: "success",
                    title: "Login Successful!",
                    showConfirmButton: false,
                });
                navigate(location?.state ? location.state : "/");
                e.target.reset();
            })
            .catch(error => {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setLoading(false);
                console.log(error.message);
            })
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then((result) => {
                console.log(result.user);
                swal({
                    icon: "success",
                    title: "Login Successful!",
                    showConfirmButton: false,
                });
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setLoading(false);
                console.log(error.message);
            });
    }



    return (
        <div className="hero min-h-screen mx-auto" data-aos = "zoom-in-down">
            <div className={`card w-full md:w-1/2 max-w-sm md:max-w-xl shadow-2xl  p-10 ${isDark === 'dark' ? "bg-[#28185d]" : "bg-base-100"}`}>
                <div className="text-center mt-5">
                    <h2 className="text-2xl md:text-4xl text-blue-500 font-bold">Login Here</h2>
                </div>
                <form className="w-full" onSubmit={handleLogin}>
                    <div className="form-control">
                        <label className="label">
                            <span className="">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`}required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="">Password</span>
                            <span className="absolute bottom-4 right-3"
                                onClick={() => setShowPassword(!showPassword)}>
                                {
                                    showPassword ?
                                        <FaEye></FaEye>
                                        : <FaEyeSlash></FaEyeSlash>
                                }
                            </span>
                        </label>
                        <input type={showPassword ? "text" : "password"} placeholder="password" name="password" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                </form>
                <div className="text-center flex flex-col space-y-2 mt-5">
                    <div className="border-b-2 border-orange-500"></div>
                    <button className="btn btn-outline btn-secondary w-full" onClick={handleLoginWithGoogle}><FcGoogle></FcGoogle> Login With Google</button>
                    <p className="text-black">Do not have an account ? <span className="font-bold text-red-600"><Link state={location?.state} to="/register">Register here</Link></span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;