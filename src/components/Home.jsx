import React, { useRef } from 'react'
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'

const Home = () => {

  const [pickUp, setPickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOepn, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  

  const submitHnadler = (e) => {
    e.preventDefault();

  }

  useGSAP(function () {
    if(panelOepn){
      gsap.to(panelRef.current, {
        height: '70%',
        // opacity:1
      })
      gsap.to(panelCloseRef.current, {
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        // opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0
      })
    }
  }, [panelOepn])

  return (
    <div className='h-screen relative'>
      <img className='w-16 absolute left-5 top-5' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />

      <div className='h-screen w-screen'>
        {/* temp image  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute right-6 top-6 text-2xl opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>
          <form onSubmit={(e) => {
            submitHnadler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input onClick={() => setPanelOpen(true)} value={pickUp} onChange={(e) => setPickUp(e.target.value)} className='bg-[#eee] px-16 py-2 text-lg rounded-lg w-full  mt-5' type="text" placeholder='Add a pick-up loaction'/>
            <input onClick={() => setPanelOpen(true)} value={destination} onChange={(e) => setDestination(e.target.value)} className='bg-[#eee] px-16 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination'/>
          </form>
        </div>

        <div ref={panelRef} className=' bg-red-500 h-0'>

        </div>

      </div>

    </div>
  )
}

export default Home