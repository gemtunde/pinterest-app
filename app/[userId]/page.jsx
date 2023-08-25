"use client";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../Shared/firebaseConfig";
import UserInfo from "../components/UserInfo";
import PinList from "@/app/components/Pins/PinList";

const Profile = ({ params }) => {
  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);

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
      //console.log("user document!", docSnap.data());
      setUserInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  //pin list
  useEffect(() => {
    //console.log("userinfo is now", userInfo);
    if (userInfo) {
      getUserPins();
    }
  }, [userInfo]);
  //get user pins
  const getUserPins = async () => {
    const q = query(
      collection(db, "pinterest-post"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, "=>", doc.data());
      setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
      // console.log(listOfPins);
    });
  };

  return (
    <div>
      {userInfo ? <UserInfo userInfo={userInfo} /> : null}
      <PinList listOfPins={listOfPins} />
    </div>
  );
};

export default Profile;
