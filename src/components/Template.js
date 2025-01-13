import React from "react";

const Template = ({ image }) => {
  return (
    <div className="flex justify-center items-center p-4 bg-gray-100 rounded-lg shadow-lg">
      <img
        src={image}
        alt="Received Image"
        className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg object-cover"
      />
      <h1>Shubham Jaiswal</h1>
    </div>
  );
};

export default Template;
