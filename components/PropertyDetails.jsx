import React from "react";
import Image from "next/image";

const PropertyDetails = ({ comm, res, bhk, other, sqft }) => {
  return (
    <div className="w-full bg-gray-100 h-auto px-12 py-2 pb-4 rounded">
      <h1 className="font-semibold">Property Requirements</h1>
      {/* //////1st///// */}
      <div className=" flex items-center gap-4 my-2">
        <div className="flex items-center text-sm text-blue-500">
          <i className="fa-solid fa-circle-check pr-1 text-xs"></i>
          <p className="">{other}</p>
        </div>
        <div className="p-1 px-2 text-sm flex items-center rounded-full bg-white shadow">
          <Image src="/images/bhk_logo.svg" width={15} height={15} alt="" />
          <div className="ml-1">{bhk}</div>
        </div>
        <div className="p-1 px-2 text-sm flex items-center rounded-full bg-white shadow">
          <Image src="/images/sqft_logo.svg" width={15} height={15} alt="" />
          <div className="ml-1">{sqft}</div>
        </div>
      </div>
      {/* 2nd */}
      <div className="flex items-center gap-4">
        <Image src="/images/home_logo.svg" width={20} height={20} alt="" />
        {res.map((e, i) => {
          return (
            <h1 className="text-sm border-r-2 pr-2 border-blue-300" key={i}>
              {e}
            </h1>
          );
        })}
      </div>
      {/* 3rd */}
      <div className="flex items-center gap-4 mt-4">
        <Image src="/images/office_logo.svg" width={20} height={20} alt="" />
        {comm.map((e, i) => {
          return (
            <h1 className="text-sm border-r-2 pr-2 border-blue-300" key={i}>
              {e}
            </h1>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyDetails;
