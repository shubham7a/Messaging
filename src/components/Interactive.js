import React from "react";

const Interactive = ({ button1, button2, text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 m-2">
      <div className="text-black text-lg font-semibold mb-4">{text}</div>
      <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-4 transition-all duration-300 ease-in-out">
        {button1}
      </button>
      <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 ease-in-out">
        {button2}
      </button>
    </div>
  );
};

export default Interactive;
