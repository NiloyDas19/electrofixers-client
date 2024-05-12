import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProviders";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import swal from 'sweetalert';
import DocumentTitle from "../../documentTitle/DocumentTitle";


const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { createUserWithEmailPassword, createWithGoogle, setLoading, isDark } = useContext(AuthContext);

    const navigate = useNavigate();
    DocumentTitle('Register');
    const location = useLocation();


    const handleRegister = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const email = e.target.email.value;
        const photoUrl = e.target.photoUrl.value;
        const password = e.target.password.value;
        console.log(name, email, photoUrl, password);

        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            swal({
                icon: "error",
                title: "Oops...",
                text: "Password should be at least 6 characters. Must have an Uppercase letter and a Lowercase letter",
            });
            return;
        }

        createUserWithEmailPassword(email, password)
            .then(result => {
                console.log("registration Successful", result.user);
                // notify();
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photoUrl
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(error.message);
                });
                result.user.displayName = name;
                result.user.photoURL = photoUrl;
                swal({
                    icon: "success",
                    title: "Registration Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location?.state : "/");
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
            });
    }

    const handleRegisterWithGoogle = () => {
        createWithGoogle()
            .then((result) => {
                console.log(result.user);
                swal({
                    icon: "success",
                    title: "Registration Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state ? location?.state : "/");
            })
            .catch((error) => {
                swal({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
                setLoading(false);
                console.log(error.message);
            })
    }



    return (
        <div className="hero min-h-screen mx-auto pt-20">
            <div className={`card w-full md:w-1/2 max-w-sm md:max-w-xl shadow-2xl  p-10 ${isDark === 'dark' ? "bg-[#28185d] shadow-orange-200" : "bg-base-100"}`}>
                <div className="text-center mt-5">
                    <h2 className="text-2xl md:text-4xl text-blue-500 font-bold">Register Here</h2>
                </div>
                <form className="w-full" onSubmit={handleRegister}>
                    <div className="form-control">
                        <label className="label">
                            <span className="">Name</span>
                        </label>
                        <input type="text" placeholder="name" name="name" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="">Email</span>
                        </label>
                        <input type="email" placeholder="email" name="email" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="">Photo URL</span>
                        </label>
                        <input type="text" placeholder="Photo URL" name="photoUrl" className={`${isDark === 'dark' ? "bg-[#351f7e] border-blue hover:border-black" : "bg-slate-50"} input input-bordered w-full`} required />
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
                        <button className="btn btn-primary">Register</button>
                    </div>
                </form>
                <div className="flex mt-5 justify-center items-center gap-1">
                    <div className="h-1 w-full bg-orange-500"></div>
                    <div className="text-xl font-bold">Social</div>
                    <div className="h-1 w-full bg-orange-500"></div>
                </div>
                <div className="text-center flex flex-col space-y-2 mt-5 items-center">
                    <FcGoogle className="h-16 w-16 cursor-pointer" onClick={handleRegisterWithGoogle}></FcGoogle>
                    <p className="">Already have an account ? <span className="font-bold text-blue-600"><Link to="/login">Login Here</Link></span></p>
                </div>

            </div>
        </div>
    );
};

export default Register;