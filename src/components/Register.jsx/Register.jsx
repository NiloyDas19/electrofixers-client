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

        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)) {
            swal({
                icon: "error",
                title: "Weak Password",
                text: "Password should be at least 6 characters. Must contain both Uppercase and Lowercase letters.",
            });
            return;
        }

        createUserWithEmailPassword(email, password)
            .then(result => {
                console.log("registration Successful", result.user);
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: photoUrl
                }).then(() => {
                    // Profile updated!
                }).catch((error) => {
                    console.log(error.message);
                });
                result.user.displayName = name;
                result.user.photoURL = photoUrl;
                swal({
                    icon: "success",
                    title: "Welcome aboard!",
                    text: "Your Account Registration was Successful!",
                    button: "Proceed",
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
            });
    }

    const handleRegisterWithGoogle = () => {
        createWithGoogle()
            .then((result) => {
                console.log(result.user);
                swal({
                    icon: "success",
                    title: "Welcome aboard!",
                    text: "Google Account Registration Successful!",
                    button: "Proceed",
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
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="w-full max-w-lg backdrop-blur-md bg-white/85 dark:bg-[#130E26]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 hover:border-orange-500/10 transition-all duration-300">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        📝 Joined Members
                    </span>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">
                        Create an <span className="text-gradient-orange">Account</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                        Register as a diagnostic provider or checkout customer to unlock platform tools.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleRegister}>
                    
                    {/* Name Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Full Name
                        </label>
                        <input 
                            type="text" 
                            placeholder="John Doe" 
                            name="name" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                            required 
                        />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            placeholder="johndoe@example.com" 
                            name="email" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                            required 
                        />
                    </div>

                    {/* Photo URL Field */}
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Profile Photo URL
                        </label>
                        <input 
                            type="text" 
                            placeholder="Paste photo link..." 
                            name="photoUrl" 
                            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                            required 
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-1 relative">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                name="password" 
                                className="w-full px-4 py-2.5 pr-12 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                                required 
                            />
                            <button 
                                type="button"
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Registration Button */}
                    <div className="pt-4">
                        <button 
                            type="submit" 
                            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
                        >
                            Create Account
                        </button>
                    </div>

                </form>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <div className="h-[1px] flex-grow bg-slate-200 dark:bg-white/5"></div>
                    <span>Or Sign Up With</span>
                    <div className="h-[1px] flex-grow bg-slate-200 dark:bg-white/5"></div>
                </div>

                {/* Social Signup & Login Link */}
                <div className="space-y-4 text-center">
                    <button 
                        onClick={handleRegisterWithGoogle}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <FcGoogle className="w-5 h-5" />
                        <span>Google Identity Single Sign-On</span>
                    </button>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Already have an account?{" "}
                        <Link 
                            to="/login" 
                            className="font-bold text-orange-500 hover:text-orange-600 transition-colors hover:underline"
                        >
                            Login here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Register;