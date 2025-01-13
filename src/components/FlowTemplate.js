import React from 'react'

const FlowTemplate = ({image}) => {
  return (
   
    <div>
        <img
        src={image}
        alt="Received Image"
        className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg object-cover"
      />
      <div>
        <p>Trai services company</p>
        <p>Powered by Trai</p>
      </div>
      <div></div>
      <button>
        View Flow
      </button>
    </div>
  )
}

export default FlowTemplate