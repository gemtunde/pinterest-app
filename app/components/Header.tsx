"use client";

import Image from "next/image";
import React from "react";
import { FaSearch, FaRocketchat, FaBell } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex gap-3 md:gap-2 items-center p-6">
      <Image
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="hover:bg-gray-300 rounded-full p-2 cursor-pointer"
      />
      <button className="bg-black text-white py-2 px-4 rounded-lg">Home</button>
      <button className="font-semibold py-2 px-4 rounded-lg">Create</button>
      <div className=" w-full bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full">
        <FaSearch className="text-[25px] md:hidden text-gray-500" />
        <input
          type="text"
          placeholder="search"
          className="bg-transparent outline-none"
        />
      </div>
      <FaBell className="text-[25px] md:text-[40px] text-gray-500" />
      <FaRocketchat className="text-[25px] md:text-[40px] text-gray-500" />
      {session?.user ? (
        <>
          <Image
            src={session?.user?.image as string}
            alt="user-image"
            width={50}
            height={50}
            className="hover:bg-gray-300 rounded-full p-2 cursor-pointer"
          />
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg"
            onClick={() => signOut()}
          >
            Log out
          </button>
        </>
      ) : (
        <button
          className="bg-black text-white py-2 px-4 rounded-lg"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
