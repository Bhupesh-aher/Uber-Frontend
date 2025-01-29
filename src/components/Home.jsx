import React, { useContext, useEffect, useRef } from 'react'
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from './LocationSearchPanel';
import VehiclePanel from './VehiclePanel';
import ConfirmedRide from './ConfirmedRide';
import LookingForDriver from './LookingForDriver';
import WaitingForDriver from './WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const [pickUp, setPickUp] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOepn, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const vehiclePanelRef = useRef(null)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const confirmRidePanelRef = useRef(null)
  const [vehicleFound, setVehicleFound] = useState(false);
  const vehicleFoundRef = useRef(null)
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const waitingForDriverRef = useRef(null)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ride, setRide] = useState(null)
  const navigate = useNavigate()

  const {socket} = useContext(SocketContext)
  const {user} = useContext(UserDataContext)
  

  useEffect(() => {
    socket.emit("join", {userType: "user", userId: user._id})
  }, [user])

  socket.on('ride-confirmed', ride => {
    console.log(ride);
    
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  }) 

  socket.on('ride-started', ride => {
    console.log(ride);
    
    setWaitingForDriver(false)
    navigate("/riding")

  })
  
  
  const handlePickupChange = async (e) => {
    setPickUp(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch {
        // handle error
    }
}

const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch {
        // handle error
    }
}

  const submitHnadler = (e) => {
    e.preventDefault();

  }

  useGSAP(function () {
    if(panelOepn){
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
        // opacity:1
      })
      gsap.to(panelCloseRef.current, {
        opacity:1
      })
    }
    else{
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0
        // opacity:0
      })
      gsap.to(panelCloseRef.current, {
        opacity:0
      })
    }
  }, [panelOepn])


  useGSAP(function() {
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehiclePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])

  useGSAP(function() {
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(vehicleFoundRef.current,{
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])


  useGSAP(function() {
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(confirmRidePanelRef.current,{
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])

  
  
  useGSAP(function() {
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(0)'
      })
    }
    else{
      gsap.to(waitingForDriverRef.current,{
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])

  
  async function findTrip () {
    setVehiclePanel(true);
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickUp, destination },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      // console.log(response.data);
      setFare(response.data)
      
  }

  async function createRide() {
    const pickup = pickUp;
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
       pickup,
       destination ,
       vehicleType
    }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    // console.log(response.data);
    
    
  }



  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />

      <div className='h-screen w-screen'>
        {/* temp image  */}
        <img className='h-full w-full object-cover' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>

      <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute right-6 top-6 text-2xl opacity-0'>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a Trip</h4>

          <form onSubmit={(e) => {
            submitHnadler(e)
          }}>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input onClick={() => {
              setPanelOpen(true) 
              setActiveField('pickUp')
            }}
               value={pickUp} onChange={handlePickupChange} className='bg-[#eee] px-16 py-2 text-lg rounded-lg w-full  mt-5' type="text" placeholder='Add a pick-up loaction'/>

            <input onClick={() => {
              setPanelOpen(true)
              setActiveField('destination')
            }} 
            value={destination} onChange={handleDestinationChange} className='bg-[#eee] px-16 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter your destination'/>

          </form>

          <button onClick={findTrip} className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
              Find Trip
          </button>

        </div>

        <div ref={panelRef} className='bg-white h-0'>
              <LocationSearchPanel  
                  suggestions={activeField === 'pickUp' ? pickupSuggestions : destinationSuggestions}
                  setPanelOpen={setPanelOpen}  
                  setVehiclePanel={setVehiclePanel}
                  setPickUp={setPickUp}
                  setDestination={setDestination}
                  activeField={activeField}
              />
        </div>

      </div>

      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel setVehicleType={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmedRide createRide={createRide} pickUp={pickUp} destination={destination} fare={fare} vehicleType={vehicleType} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver createRide={createRide} pickUp={pickUp} destination={destination} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound}/>
      </div>

      <div ref={waitingForDriverRef}  className='fixed w-full z-10 bottom-0  bg-white px-3 py-6 pt-12'>
          <WaitingForDriver 
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
          />
      </div>

    </div>
  )
}

export default Home