"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import "firebase/compat/storage";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { adminItems } from "@/constants";
import Link from "next/link";
import UploadImage from "../../components/layout/UploadImage";
// import Menu from "@/components/Menu";
import { Cookies } from "react-cookie";

const Profile = () => {
  const session = useSession();
  const router = useRouter();

  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [user, setUser] = useState({});
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [userName, setUserName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [chosenState, setChosenState] = useState("menu");

  // const userName = session.data?.user.name;
  // const email = session.data?.user.email;

  // useEffect(() => {
  //   const userImg = session.data?.user.image;
  //   setImage(userImg);
  //   // fetch("api/profile").then((response) => {
  //   //   response.json().then((data) => {
  //   //     console.log(data);
  //   //     setPhone(data.phone);
  //   //     setIsAdmin(data.admin);
  //   //     setImage(data.image);
  //   //   });
  //   // });

  //   fetch("api/users").then((response) => {
  //     response.json().then((data) => {
  //       const user = data.filter((u) => u._id === userId);
  //       console.log(user);

  //       setUserName(user?.[0].name);
  //       setNumber(user?.[0].phone);
  //       setIsAdmin(user?.[0].admin);
  //       setEmail(user?.[0].email);
  //       setFetchedAddress(user?.[0].address);
  //     });
  //   });
  // }, [session]);

  // const saveImageToDb = async (e) => {
  //   console.log(e);
  //   setIsUploading(true);

  //   const uploadPromise = new Promise(async (resolve, reject) => {
  //     const response = await fetch("/api/profile", {
  //       method: "PUT",
  //       body: JSON.stringify({ email, name, phone, address, image: image }),
  //       headers: { "Content-Type": "application/json" },
  //       // headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     if (response.ok) {
  //       resolve();
  //     } else {
  //       reject();
  //     }
  //   });

  //   await toast.promise(uploadPromise, {
  //     loading: "saving",
  //     success: "saved",
  //     error: "an error occured, please try again",
  //   });

  //   setIsUploading(false);
  //   setShowUploadBtn(false);
  // };

  // if (status === "loading") {
  //   return <div className="flex justify-center mt-[40vh]">Please wait...</div>;
  // }

  return (
    <>
      <section className="mb-5   gap-10 justify-center">
        {chosenState === "menu" && (
          <>
            {/* user Info */}
            <MenuItems />
          </>
        )}
      </section>

      {/* mobile */}

      {/* )} */}
    </>
  );
};

export default Profile;
