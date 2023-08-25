"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import app from "./Shared/firebaseConfig";
import PinList from "@/app/components/Pins/PinList";

export default function Home() {
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    getUserPins();
  }, []);
  //connect firebase db
  const db = getFirestore(app);
  //get user pins
  const getUserPins = async () => {
    const q = query(collection(db, "pinterest-post"));
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
      <PinList listOfPins={listOfPins} />
    </div>
  );
}
