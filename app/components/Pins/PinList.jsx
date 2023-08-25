//"use client";
import React from "react";
import PinItem from "@/app/components/Pins/PinItem";

const PinList = ({ listOfPins }) => {
  console.log("pionlist", listOfPins);
  return (
    <div
      className="columns-2 mt-7 px-2 
    md:px-5 md:columns-3 lg:columns-4 xl:columns-5
    space-y-6 mx-auto"
    >
      {listOfPins.map((item, index) => (
        <div key={index}>
          <PinItem pin={item} />
        </div>
      ))}
    </div>
  );
};

export default PinList;
