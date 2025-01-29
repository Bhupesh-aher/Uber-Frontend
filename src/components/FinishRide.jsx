import axios from 'axios';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const FinishRide = (props) => {

    const navigate = useNavigate();
    console.log(props);
    
    
    async function endRide() {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
            
                rideId: props.rideData._id 
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        if(response.status === 200){
            navigate("/captain-home")
        }
    } 

  return (
    <div>
    <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {props.setFinishRidePanel(false)}}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
    <h3 className='text-2xl font-semibold mb-5'>Finish this Ride</h3>

    <div className='flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3 '>
            <img className='h-12 w-12 rounded-full object-cover' src="https://img.freepik.com/free-photo/beautiful-charming-girl-wears-pink-hoodie-visor-cap-back_176532-7775.jpg" alt="" />
            <h2 className='text-xl font-medium'>{props.rideData?.user?.fullname?.firstname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
    </div>

    <div className='flex gap-2 justify-between flex-col items-center'>

        <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
                <div>
                    <h3 className='text-lg font-medium'>562/11-A</h3>
                    <p className='text-sm -mt-1 text-gray-600'>{props.rideData?.pickup}</p>
                </div>
            </div>

            <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i>
                    <div>
                        <h3 className='text-lg font-medium'>562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'>{props.rideData?.destination}</p>
                    </div>
                </div>

            <div className='flex items-center gap-5 p-3 '>
                <i className="ri-currency-line"></i>
                    <div>
                        <h3 className='text-lg font-medium'>{props.rideData?.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                    </div>
            </div>
        </div>
        
        <div className='mt-10 w-full'>
            <button onClick={endRide}  className='w-full mt-5 flex justify-center text-lg bg-green-600 text-white font-semibold p-3 rounded-lg'>Finish Ride</button>    

        </div>
    </div>

</div>
  )
}

export default FinishRide