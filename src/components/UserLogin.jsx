import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userData, setUserData] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserData({
            email:email,
            password: password
        })
        setEmail("")
        setPassword("")  
    }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
            <form onSubmit={(e) => handleSubmit(e)}>

                <h3 className='text-lg font-medium mb-2'>What's your Email</h3>
                <input value={email} onChange={(e) => setEmail(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com'/>


                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input  value={password} onChange={(e) => setPassword(e.target.value)} required className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='Password'/>

                <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg '>Login</button>

            </form>

                <p className='text-center'>New Here? <Link to={"/signup"} className='text-blue-600'>Create New Account</Link></p>
        </div>
        <div>
            <Link to={"/captain-login"} className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-7 rounded px-4 py-2  w-full text-lg '>Sign in as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin