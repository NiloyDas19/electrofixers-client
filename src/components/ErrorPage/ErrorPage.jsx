import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProviders';
import { useContext } from 'react';
const ErrorPage = () => {
    const {isDark} = useContext(AuthContext)
    return (
        <div className= {`isDark === 'dark' ? "bg-[#1A103D] text-white" : "bg-white text-black" text-center items-center flex flex-col justify-center min-h-screen space-y-10`}>
            <p className='font-bold text-3xl'>404 Not Found</p>
            <Link to="/"><button className='bg-orange-500 font-bold text-white btn'>Back To Home</button></Link>
        </div>
    );
};

export default ErrorPage;