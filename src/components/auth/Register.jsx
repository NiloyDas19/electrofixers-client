import { useContext, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import swal from 'sweetalert';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const Register = () => {
    useDocumentTitle('Register');
    const [showPassword, setShowPassword] = useState(false);
    const { createUserWithEmailPassword, createWithGoogle, setLoading } = useContext(AuthContext);
    const navigate  = useNavigate();
    const location  = useLocation();
    const redirectTo = location?.state || '/';

    const handleRegister = (e) => {
        e.preventDefault();
        const { name, email, photoUrl, password } = e.target.elements;

        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password.value)) {
            swal({ icon: 'error', title: 'Weak password', text: 'Password must be at least 6 chars with uppercase and lowercase letters.' });
            return;
        }

        createUserWithEmailPassword(email.value, password.value)
            .then((result) => {
                updateProfile(auth.currentUser, {
                    displayName: name.value,
                    photoURL: photoUrl.value,
                }).catch(() => {});
                result.user.displayName = name.value;
                result.user.photoURL    = photoUrl.value;
                swal({ icon: 'success', title: 'Account created!', text: 'Registration successful.', button: 'Continue' });
                navigate(redirectTo);
                e.target.reset();
            })
            .catch((err) => {
                swal({ icon: 'error', title: 'Error', text: err.message });
                setLoading(false);
            });
    };

    const handleGoogle = () => {
        createWithGoogle()
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
                    <p className="eyebrow">Create account</p>
                    <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">Register</h1>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-zinc-900 dark:text-white underline underline-offset-2">
                            Log in
                        </Link>
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleRegister} className="space-y-5">
                    {[
                        { label: 'Full name',         name: 'name',     type: 'text',  placeholder: 'Jane Doe' },
                        { label: 'Email address',     name: 'email',    type: 'email', placeholder: 'you@example.com' },
                        { label: 'Profile photo URL', name: 'photoUrl', type: 'text',  placeholder: 'https://...' },
                    ].map(({ label, name, type, placeholder }) => (
                        <div key={name} className="space-y-1">
                            <label className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</label>
                            <input type={type} name={name} placeholder={placeholder} required className="input-minimal" />
                        </div>
                    ))}

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
                        Create account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-900" />
                    <span className="text-xs text-zinc-400">or</span>
                    <div className="flex-1 h-px bg-zinc-100 dark:bg-zinc-900" />
                </div>

                <button onClick={handleGoogle} className="btn-outline w-full">
                    <FcGoogle className="w-4 h-4" />
                    Continue with Google
                </button>
            </div>
        </div>
    );
};

export default Register;
