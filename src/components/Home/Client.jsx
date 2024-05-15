
import { PropTypes } from 'prop-types';
import { AuthContext } from '../../providers/AuthProviders';
import { useContext } from 'react';

const Client = ({client}) => {
    const {name, rating, review, image_url} = client;
    const {isDark} = useContext(AuthContext);
    return (
        <div className={`space-y-5 border-2 p-5 rounded-3xl shadow-2xl ${isDark == 'dark' && 'shadow-orange-200'}`}>
            <div>
                <p>{review}</p>
            </div>
            <div className='flex justify-between items-center'>
                <div className='flex justify-center items-center gap-2'>
                    <img src={image_url} className='w-14 h-14 rounded-full' alt="" />
                    <h2 className='font-bold'>{name}</h2>
                </div>
                <div>
                    <p>{rating}</p>
                </div>
            </div>
        </div>
    );
};

Client.propTypes = {
    client : PropTypes.object.isRequired,
}

export default Client;