import Image from "next/image";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserInfo = ({ userInfo }: any) => {
  // console.log("user info is ", userInfo);
  const router = useRouter();
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
      <div className="flex items-center gap-2">
        <button className="bg-gray-400 p-2 px-4 font-semibold rounded-full cursor-pointer hover:bg-gray-600">
          Share
        </button>
        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="bg-gray-400 p-2 px-4 font-semibold rounded-full cursor-pointer hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
