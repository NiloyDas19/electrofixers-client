import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import swal from 'sweetalert';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Login = () => {
    useDocumentTitle('Log in');
    const [showPassword, setShowPassword] = useState(false);
    const { loginWithEmailPassword, loginWithGoogle, setLoading } = useContext(AuthContext);
    const navigate  = useNavigate();
    const location  = useLocation();
    const redirectTo = location?.state || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        loginWithEmailPassword(email.value, password.value)
            .then(() => {
                swal({ icon: 'success', title: 'Welcome back!', text: 'Login successful.', button: 'Continue' });
                navigate(redirectTo);
                e.target.reset();
            })
            .catch((err) => {
                swal({ icon: 'error', title: 'Login failed', text: err.message });
                setLoading(false);
            });
    };

    const handleGoogle = () => {
        loginWithGoogle()
            .then(() => navigate(redirectTo))
            .catch((err) => {
                swal({ icon: 'error', title: 'Error', text: err.message });
                setLoading(false);
            });
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
            <div className="w-full max-w-sm space-y-8">

                {/* Header */}
                <div className="space-y-1">
                    <p className="eyebrow">Welcome back</p>
                    <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Log in</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" state={location?.state} className="font-semibold text-zinc-900 dark:text-white underline underline-offset-2">
                            Register
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Email address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            required
                            className="input-minimal"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
                                required
                                className="input-minimal pr-8"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 p-1"
                                aria-label="Toggle password visibility"
                            >
                                {showPassword ? <FaEye className="w-4 h-4" /> : <FaEyeSlash className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="btn-primary w-full">
                        Log in
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-900" />
                    <span className="text-xs text-zinc-400">or</span>
                    <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-900" />
                </div>

                {/* Google SSO */}
                <button
                    onClick={handleGoogle}
                    className="btn-outline w-full"
                >
                    <FcGoogle className="w-4 h-4" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Login;
