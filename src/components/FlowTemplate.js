import React from 'react'

const FlowTemplate = ({image}) => {
  return (
   
    <div>
        <img
        src={image}
        alt="Received Image"
        className="w-[40%] max-w-xs md:max-w-sm lg:max-w-md rounded-lg object-cover "
        style={{ width: "fit-content" }}
      />
      <div className=' flex-coljustify-between items-center text-gray-500 text-lg font-bold'>
        <p>Fill this form</p>
        <p>Powered by Trai Services</p>
      </div>
      <div className="w-full border-b border-gray-500 my-4"></div>
      <button className='flex  flex-coljustify-between items-center text-gray-500 text-lg font-bold'>
        View Flow
      </button>
    </div>
  )
}

export default FlowTemplate