import Image from "next/image";
import React from "react";

const UserInfo = ({ userInfo }: any) => {
  console.log("user info is ", userInfo);
  return (
    <div className="flex flex-col items-center gap-2">
      <Image
        src={userInfo.userImage}
        alt="user-image"
        width={80}
        height={80}
        className="rounded-full"
      />
      <h2 className="text-3xl font-semibold">{userInfo.userName}</h2>
      <h2 className="text-gray-400">{userInfo.email}</h2>
      <button className="bg-gray-400 p-2 px-4 font-semibold rounded-full">
        Share
      </button>
    </div>
  );
};

export default UserInfo;
