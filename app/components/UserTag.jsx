import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";

const UserTag = () => {
  const { data: session } = useSession();
  return (
    <div className="mt-8">
      {session ? (
        <div className="flex items-center">
          <Image
            src={session.user.image}
            alt="logo"
            width={50}
            height={50}
            className="hover:bg-gray-300 rounded-full p-2 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <div>
            <h2 className="font-medium text-[14px]">{session.user.name}</h2>
            <h2 className="text-[12px]">{session.user.email}</h2>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserTag;
