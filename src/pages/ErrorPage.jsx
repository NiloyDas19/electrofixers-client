import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { HiOutlineWrenchScrewdriver } from 'react-icons/hi2';

const ErrorPage = () => {
    const { isDark } = useContext(AuthContext);

    return (
        <div className={`min-h-screen flex flex-col items-center justify-center px-4 transition-colors ${
            isDark === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
        }`}>
            <div className="max-w-sm w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                        <HiOutlineWrenchScrewdriver className="w-8 h-8 text-zinc-400" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-6xl font-black tracking-tight text-zinc-900 dark:text-white">404</h1>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Page not found</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        This page doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
                    </p>
                </div>

                <Link to="/" className="btn-primary">
                    &larr; Back to home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
