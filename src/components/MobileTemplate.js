import React from "react";
import { LuSquareArrowOutUpRight } from "react-icons/lu";
import { IoMdCall } from "react-icons/io";
const MobileTemplate = ({ image }) => {
  return (
    <div className="space-y-4">
      <img
        src={image}
        alt="Received Image"
        className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-lg object-cover"
      />
      <div>
        <p className="text-xl text-black">
          The iPhone 16 (and 16 Plus) gets <br /> an A18 chip, which promises{" "}
          <br />
          superior performance compared to <br />
          Android flagships in the market.
        </p>
      </div>
      <div className="reltive">
        <p className="text-xl text-gray-500">IPhone-16</p>
      </div>
      <div className="w-full border-b border-gray-300 my-4"></div>
      <div className="space-y-4">
        <button className="text-xl text-blue-500 flex items-center justify-center mx-auto gap-2 font-semibold">
          <LuSquareArrowOutUpRight className="font-bold" />
          <span>Vist website</span>
        </button>
        <button className="text-xl text-blue-500 flex items-centerjustify-center mx-auto gap-2 font-semibold ">
          <IoMdCall className="font-bold" />
          Call phone number
        </button>
      </div>
    </div>
  );
};

export default MobileTemplate;
