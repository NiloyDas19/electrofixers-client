import { Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Navbar from './Navbar';
import Footer from './Footer';

const Root = () => {
    const { isDark } = useContext(AuthContext);
    const location = useLocation();
    const isDashboard = location.pathname.startsWith('/dashboard');

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
            isDark === 'dark' ? 'dark bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900'
        }`}>
            {!isDashboard && <Navbar />}
            <main className={!isDashboard ? "flex-grow" : ""}>
                <Outlet />
            </main>
            {!isDashboard && <Footer />}
        </div>
    );
};

export default Root;
