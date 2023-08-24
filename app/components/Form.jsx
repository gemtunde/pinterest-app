"use client";

import React, { useState } from "react";
import UploadImage from "@/app/components/UploadImage";
import UserTag from "@/app/components/UserTag";
import { useSession } from "next-auth/react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../Shared/firebaseConfig";
import { getFirestore, addDoc, doc, setDoc } from "firebase/firestore";

const Form = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    file: "",
    userName: "",
    userImage: "",
    email: "",
  });

  const onSave = (e) => {
    // e.preventDefault();
    console.log(formData);
    uploadFile();
  };

  //storage files
  const storage = getStorage(app);

  //initialize firstore
  const db = getFirestore(app);

  //use timestamp for unique id
  const postId = Date.now().toString();

  const uploadFile = () => {
    const storageRef = ref(storage, `pinterest/${formData.file}`);
    uploadBytes(storageRef, formData.file)
      .then((snapshot) => {
        console.log("files uploaded");
      })
      .then((res) => {
        getDownloadURL(storageRef).then(async (url) => {
          // console.log("url download", url);
          const postData = {
            ...formData,
            file: url,
            userName: session?.user?.name,
            email: session?.user?.email,
            userImage: session?.user?.image,
          };
          console.log("postdata", postData);
          await setDoc(doc(db, "pinterest-post", postId), postData).then(
            (resp) => {
              console.log("data saved");
            }
          );
        });
      });
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
