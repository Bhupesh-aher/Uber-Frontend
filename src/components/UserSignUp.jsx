import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'

const UserSignUp = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  const {user, setUser} = React.useContext(UserDataContext)

  const handleSubmit = async (e) => {
      e.preventDefault();
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
          email: email,
          password: password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
      console.log(response);
      
      if(response.status === 201){

        const data = response.data;
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate("/home")

      }
      
      setEmail("")
      setPassword("")
      setFirstName("")
      setLastName("")

  }


  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-20 mb-3' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
            <form onSubmit={(e) => handleSubmit(e)}>

            <h3 className='text-lg font-medium mb-2'>What's your Name</h3>
            <div className='flex gap-4 mb-4' >
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg  placeholder:text-base' type="text" placeholder='First Name'/>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} required className='bg-[#eeeeee] w-1/2  rounded px-4 py-2 border text-lg  placeholder:text-base' type="text" placeholder='Last Name'/>

            </div>
  
                <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='user@gmail.com'/>
  
  
                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input value={password} onChange={(e) => setPassword(e.target.value)} required className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='Password'/>
  
                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg '>Create Account</button>
  
            </form>
  
                <p className='text-center'>Already User?  <Link to={"/login"} className='text-blue-600'>Login Here</Link></p>
        </div>
        <div>
          <p  className='text-[sm] leading-tight'>This iste is protected by reCAPTCHA and the <span className='underline'>google privacy policy</span> and <span className='underline'>Terms of service apply</span></p>
        </div>
    </div>
  )
}

export default UserSignUp