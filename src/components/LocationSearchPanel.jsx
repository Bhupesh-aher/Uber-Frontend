import React from 'react'

const LocationSearchPanel = (props) => {

    const locations = [
        "24A, Near Kapoor's Cafe, Shreyians Coding School, Bhopal",
        "20B, Near Malhotra's Cafe, Shreyians Coding School, Delhi",
        "16C, Near Sharma's Cafe, Shreyians Coding School, Mumbai",
        "20D, Near Malhotra's Cafe, Shreyians Coding School, Noida"
    ]

  return (
    <div>

        {/* this is just a sample data  */}
        {
            locations.map((location, index) => (
                <div onClick={() =>{
                        props.setVehiclePanel(true)
                        props.setPanelOpen(false)
                    }} key={index} className='flex gap-4 border-2 p-3 border-gray-200 active:border-black rounded-xl items-center my-2 justify-start'>
                    <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                    <h4 className='font-medium'>{location}</h4>
                </div>
            ))
        }

        
        
    </div>
  )
}

export default LocationSearchPanel