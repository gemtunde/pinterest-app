"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { FaSearch, FaRocketchat, FaBell } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import app from "../Shared/firebaseConfig";
import { useRouter } from "next/navigation";

const Header = () => {
  //get session
  const { data: session } = useSession();
  const db = getFirestore(app);
  const citiesRef = collection(db, "cities");
  const userRef = collection(db, "user");

  useEffect(() => {
    saveUserData();
    // console.log("save");
  }, [session]);

  //firebase db

  //router
  const router = useRouter();

  const saveUserData = async () => {
    if (session?.user) {
      try {
        await addDoc(collection(db, "users"), {
          userName: session?.user?.name as string,
          email: session?.user?.email as string,
          userImage: session?.user?.image as string,
        });

        //user
        await setDoc(doc(userRef, session?.user?.email as string), {
          userName: session?.user?.name as string,
          email: session?.user?.email as string,
          userImage: session?.user?.image as string,
        });

        //user

        //cities
        await setDoc(doc(citiesRef, "SF"), {
          name: "San Francisco",
          state: "CA",
          country: "USA",
          capital: false,
          population: 860000,
          regions: ["west_coast", "norcal"],
        });

        //cities
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  // console.log(session);
  //login
  const onCreateClick = () => {
    if (session) {
      router.push("/pin-builder");
    } else {
      signIn();
    }
  };
  return (
    <div className="flex gap-3 md:gap-2 items-center p-6">
      <Image
        src="/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="hover:bg-gray-300 rounded-full p-2 cursor-pointer"
        onClick={() => router.push("/")}
      />
      <button
        onClick={() => router.push("/")}
        className="hidden md:block bg-black text-white py-2 px-4 rounded-lg"
      >
        Home
      </button>
      <button
        className="font-semibold py-2 px-4 rounded-lg"
        onClick={() => onCreateClick()}
      >
        Create
      </button>
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
            onClick={() => router.push(`/${session?.user?.email}`)}
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
