"use client";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../Shared/firebaseConfig";
import UserInfo from "../components/UserInfo";

const Profile = ({ params }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    //  console.log(params.userId.replace("%40", "@"));
    if (params) {
      getUserInfo(params.userId.replace("%40", "@"));
    }
  }, [params]);

  //connect firebase db
  const db = getFirestore(app);

  //get user info
  const getUserInfo = async (email) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("user document!", docSnap.data());
      setUserInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  return <div>{userInfo ? <UserInfo userInfo={userInfo} /> : null}</div>;
};

export default Profile;
