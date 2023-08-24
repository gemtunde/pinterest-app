"use client";

import React, { useState } from "react";
import UploadImage from "@/app/components/UploadImage";
import UserTag from "@/app/components/UserTag";
import { useSession } from "next-auth/react";

const Form = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    file: "",
  });

  const onSave = (e) => {
    // e.preventDefault();
    console.log(formData);
  };
  return (
    <div className="bg-white p-16 rounded-2xl">
      <div className="flex justify-end mb-6">
        <button
          onClick={() => onSave()}
          className="bg-red-600 p-2 text-white font-semibold px-3 rounded-lg"
        >
          save
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* upload image */}
        <UploadImage setFormData={setFormData} formData={formData} />
        <div className="col-span-2">
          <div className="w-[100%]">
            <input
              type="text"
              placeholder="Add Your Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="text-[35px] outline-none font-bold w-full border-b-[2px]
                    border-gray-400 placeholder-gray-400"
            />
            <h2 className="text-[12px] w-full text-gray-400">
              The first 40 characters is what usually appears in the feed
            </h2>
            {/* usertags */}
            <UserTag />
            <textarea
              type="text"
              placeholder="Tell everyone what your pin is about"
              className="w-full outline-none mt-8 pb-4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>
            <input
              type="text"
              placeholder="Add destination link"
              className="text-[35px] outline-none font-bold w-full border-b-[2px]
                    border-gray-400 placeholder-gray-400 mt-[90px]"
              value={formData.link}
              onChange={(e) =>
                setFormData({ ...formData, link: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
