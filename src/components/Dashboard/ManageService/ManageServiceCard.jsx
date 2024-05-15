import PropTypes from 'prop-types';
import { TiLocationOutline } from 'react-icons/ti';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


const ManageServiceCard = ({ service }) => {
    const { _id, imageUrl, serviceName, description, providerImageUrl, providerName, price, serviceArea } = service;

    const handleDelete = (_id) => {
        console.log(_id);
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    fetch(`https://elctrofixers-client-side.vercel.app/service/${_id}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                window.location.reload();
                                swal("Poof! Your imaginary file has been deleted!", {
                                    icon: "success",
                                });
                            }
                            else {
                                swal("Something wrong try again!");
                            }
                            console.log(data);
                        })
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
    }

    return (
        <div className="flex flex-col space-y-5 border-2 rounded-3xl border-orange-100">
            <div className="rounded-t-3xl">
                <img src={imageUrl} className="rounded-t-3xl" alt="" />
            </div>
            <div className="flex-grow px-6 text-center">
                <h2 className="text-3xl font-bold">{serviceName}</h2>
                <p>{description}</p>
            </div>
            <div className="px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <TiLocationOutline className="w-8 h-8" />
                    <p className="text-xl font-bold">{serviceArea}</p>
                </div>
                <p className="text-xl font-bold">${price}</p>
            </div>
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between px-6 pb-6 space-y-5">
                <div className="flex items-center gap-2">
                    <img src={providerImageUrl} className="h-12 w-12 rounded-full border-2 border-blue-500" alt="" />
                    <h2 className="font-semibold">{providerName}</h2>
                </div>
                <div className='flex gap-2'>
                    <Link to={`/update-service/${_id}`}><button className="btn bg-orange-500 text-white font-bold">Update</button></Link>
                    <button className="btn bg-red-500 text-white font-bold" onClick={() => handleDelete(_id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

ManageServiceCard.propTypes = {
    service: PropTypes.object.isRequired,
}

export default ManageServiceCard;