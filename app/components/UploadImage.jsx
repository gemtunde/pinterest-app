import Image from "next/image";
import React, { useState } from "react";
import { HiArrowUpCircle } from "react-icons/hi2";

const UploadImage = ({ setFormData, formData }) => {
  const [selectedFile, setSelectedFile] = useState("");
  return (
    <div
      className="h-[450px] bg-[#e9e9e9]
     rounded-lg"
    >
      <label
        htmlFor="uploadImage"
        className="m-5 flex flex-col justify-center items-center cursor-pointer text-gray-500 
    rounded-lg border-dashed border-[2px] h-[90%]"
      >
        {!selectedFile ? (
          <div className="flex flex-col items-center">
            <HiArrowUpCircle className="text-[22px]" />
            <h2 className="font-semibold"> Click to upload</h2>
          </div>
        ) : null}
        {selectedFile ? (
          <Image
            width={500}
            height={500}
            alt="selected image"
            className="object-contain h-[90%] rounded-full"
            src={window.URL.createObjectURL(selectedFile)}
          />
        ) : null}
        <input
          type="file"
          id="dropezone-file"
          //className="hidden w-full"
          onChange={(e) => {
            setFormData({ ...formData, file: e.target.files[0].name });
            setSelectedFile(e.target.files[0]);
          }}
        />
      </label>
    </div>
  );
};

export default UploadImage;
