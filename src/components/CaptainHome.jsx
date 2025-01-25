import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from './CaptainDetails'
import RidePopup from './RidePopup'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import ConfirmRidePopup from './ConfirmRidePopup'


const CaptainHome = () => {


    const [ridePopUpPanel, setRidePopUpPanel] = useState(true)
    const [confirmRidePopUpPanel,setConfirmRidePopUpPanel] = useState(false);
    const ridePopUpPanelRef = useRef(null)
    const confirmridePopUpPanelRef = useRef(null)

    useGSAP(function() {
        if(ridePopUpPanel){
          gsap.to(ridePopUpPanelRef.current,{
            transform: 'translateY(0)'
          })
        }
        else{
          gsap.to(ridePopUpPanelRef.current,{
            transform: 'translateY(100%)'
          })
        }
      }, [ridePopUpPanel])


      useGSAP(function() {
        if(confirmRidePopUpPanel){
          gsap.to(confirmridePopUpPanelRef.current,{
            transform: 'translateY(0)'
          })
        }
        else{
          gsap.to(confirmridePopUpPanelRef.current,{
            transform: 'translateY(100%)'
          })
        }
      }, [confirmRidePopUpPanel])

  return (
    
      <div className='h-screen'>
        <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
          <img className='w-16' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />
            <Link to={"/captain-home"} className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                  <i className="text-lg font-medium ri-logout-box-r-line"></i>
            </Link>
        </div>
        <div className='h-3/5'>
            <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='h-2/5 p-6'>
            <CaptainDetails/>
        </div>

        <div ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <RidePopup setRidePopUpPanel={setRidePopUpPanel}  setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>

        <div ref={confirmridePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <ConfirmRidePopup setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}  setRidePopUpPanel={setRidePopUpPanel}/>
        </div>

    </div>
    
  )
}

export default CaptainHome