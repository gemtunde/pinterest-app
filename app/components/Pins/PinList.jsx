//"use client";
import React from "react";
import PinItem from "@/app/components/Pins/PinItem";

const PinList = ({ listOfPins }) => {
  console.log("pionlist", listOfPins);
  return (
    <div>
      {listOfPins.map((item, index) => (
        <div key={index}>
          <PinItem pin={item} />
        </div>
      ))}
    </div>
  );
};

export default PinList;
