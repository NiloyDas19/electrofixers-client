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
    const { loginWithEmailPassword, loginWithGoogle, setLoading, isDark } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginWithEmailPassword(email, password)
            .then(result => {
                swal({
                    icon: "success",
                    title: "Welcome Back!",
                    text: "Login Successful!",
                    button: "Proceed",
                });
                navigate(location?.state ? location.state : "/");
                e.target.reset();
            })
            .catch(error => {
                swal({
                    icon: "error",
                    title: "Authentication Failed",
                    text: error.message,
                });
                setLoading(false);
            })
    }

    const handleLoginWithGoogle = () => {
        loginWithGoogle()
            .then((result) => {
                swal({
                    icon: "success",
                    title: "Welcome Back!",
                    text: "Google Login Successful!",
                    button: "Proceed",
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
            });
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative z-10">
            <div className="w-full max-w-md backdrop-blur-md bg-white/85 dark:bg-[#130E26]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 hover:border-orange-500/10 transition-all duration-300">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-semibold uppercase tracking-wider">
                        🔐 Secure Portal
                    </span>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100">
                        Login to <span className="text-gradient-orange">Account</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                        Enter your credentials below to access your diagnostic bookings and listings.
                    </p>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleLogin}>
                    
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Email Address
                        </label>
                        <input 
                            type="email" 
                            placeholder="you@example.com" 
                            name="email" 
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
                            required 
                        />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2 relative">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            Password
                        </label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                placeholder="••••••••" 
                                name="password" 
                                className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 text-sm focus:outline-none transition-all placeholder-slate-400" 
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

                    {/* Submit Login Button */}
                    <div className="pt-2">
                        <button 
                            type="submit" 
                            className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all text-sm uppercase tracking-wider"
                        >
                            Sign In
                        </button>
                    </div>

                </form>

                {/* Divider */}
                <div className="flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                    <div className="h-[1px] flex-grow bg-slate-200 dark:bg-white/5"></div>
                    <span>Or Sign In With</span>
                    <div className="h-[1px] flex-grow bg-slate-200 dark:bg-white/5"></div>
                </div>

                {/* Social Login & Registration */}
                <div className="space-y-4 text-center">
                    <button 
                        onClick={handleLoginWithGoogle}
                        className="w-full flex items-center justify-center gap-3 px-5 py-3 border border-slate-200 dark:border-white/10 rounded-2xl bg-white dark:bg-white/5 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                        <FcGoogle className="w-5 h-5" />
                        <span>Google Identity Single Sign-On</span>
                    </button>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        Don't have an account?{" "}
                        <Link 
                            state={location?.state} 
                            to="/register" 
                            className="font-bold text-orange-500 hover:text-orange-600 transition-colors hover:underline"
                        >
                            Register here
                        </Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default Login;