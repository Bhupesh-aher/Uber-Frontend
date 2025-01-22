import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainSignUp = () => {



    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [vehicleColor, setVehicleColor] = useState("");
    const [vehiclePlate, setVehiclePlate] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehicleType, setVehicleType] = useState("")

    const navigate = useNavigate();


    const {captain, setCaptain} = React.useContext(CaptainDataContext)
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const captainData = {
          fullname: {
            firstname: firstName,
            lastname: lastName,
          },
            email: email,
            password: password,
            vehicle: {
              color: vehicleColor,
              plate: vehiclePlate,
              capacity: vehicleCapacity,
              vehicleType: vehicleType
            }
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
        if(response.status === 201){
          const data = response.data
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
          navigate("/captain-home")
        }

        
        setEmail("")
        setPassword("")
        setFirstName("")
        setLastName("")
        setVehicleColor("")
        setVehiclePlate("")
        setVehicleCapacity("")
        setVehicleType("")
  
    }


  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
    <div>
        <img className='w-20 mb-3' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
        <form onSubmit={(e) => handleSubmit(e)}>

        <h3 className='text-lg font-medium mb-2'>What's our Captian's Name</h3>
        <div className='flex gap-4 mb-4' >
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg  placeholder:text-base' type="text" placeholder='First Name'/>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg  placeholder:text-base' type="text" placeholder='Last Name'/>

        </div>

            <h3 className='text-lg font-medium mb-2'>What's our Captian's  Email</h3>
            <input value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='user@gmail.com'/>


            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input value={password} onChange={(e) => setPassword(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='Password'/>

            <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
            <div className='flex gap-4 mb-7'>
              <input value={vehicleColor} onChange={(e) => setVehicleColor(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="text" placeholder='Vehicle Color'/>
              <input value={vehiclePlate} onChange={(e) => setVehiclePlate(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="text" placeholder='Vehicle Plate'/>

              </div>

            <div className='flex gap-4 mb-7'>

              <input value={vehicleCapacity} onChange={(e) => setVehicleCapacity(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="number" placeholder='Vehicle Capacity'/>
              <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'>
                  <option value="" >Select Vehcile Type</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="motorcycle">Motorcycle</option>
              </select> 
              

            </div>



            <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg '>Create Captain Account</button>

        </form>

            <p className='text-center'>Already Captain?  <Link to={"/captain-login"} className='text-blue-600'>Login Here</Link></p>
    </div>
    <div>
      <p  className='text-[sm] leading-tight'>This iste is protected by reCAPTCHA and the <span className='underline'>google privacy policy</span> and <span className='underline'>Terms of service apply</span></p>
    </div>
</div>
  )
}

export default CaptainSignUp