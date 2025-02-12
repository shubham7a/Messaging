import React from "react";

const FlowInteractive = ({ text, header, footer }) => {
  return (
    <div>
      <div>{header}</div>
      <div>{text}</div>
      <div>{footer}</div>
      <div className="w-full border-b border-gray-500 my-4"></div>
      <button className='flex  flex-coljustify-between items-center mx-auto text-gray-500 text-lg font-bold'>
        Insurance
      </button>
    </div>
  );
};

export default FlowInteractive;
