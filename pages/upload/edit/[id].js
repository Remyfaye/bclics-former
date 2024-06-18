"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import "firebase/compat/storage";
import { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import toast from "react-hot-toast";
import { adminItems } from "@/constants";
import Link from "next/link";
import UploadImage from "../../../components/layout/UploadImage";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";

const Edit = () => {
  const router = useRouter();
  const cookie = new Cookies();
  const userId = cookie.get("userId");

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [isChosingImage, setIsChosingImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState("profile");
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (router.isReady) {
          const response = await fetch(`/api/product/${router.query.id}`);
          const data = await response.json();
          setId(router.query.id);
          setProduct(data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchProduct();
  }, [router.isReady, router.query.id]);

  const saveChanges = async () => {
    setIsUploading(true);
    const updatedData = {};

    if (name) updatedData.name = name;
    if (price) updatedData.price = price;
    if (location) updatedData.location = location;
    if (description) updatedData.description = description;

    try {
      const response = await fetch("/api/product/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, data: updatedData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      router.push(`/product/${id}`);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("An error occurred, please try again");
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 mx-auto flex justify-center items-center pt-32">
        loading...
      </div>
    );
  }

  return (
    <section className="mb-5 gap-10 justify-center">
      <div className="lg:flex pt-20 mb-5 gap-10 justify-center">
        <UploadImage
          image={product?.image}
          isUploading={isUploading}
          setImage={setImage}
          setDisabled={setIsChosingImage}
        />
        <div className="py-3 shadow-md mx-5 px-3 rounded-xl lg:w-[30rem]">
          <label className="mt-5 flex flex-col gap-3">
            Name
            <input
              disabled={isChosingImage}
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="p-4 text-gray-400"
              placeholder={product.name}
            />
          </label>
          <label className="mt-5 flex flex-col gap-3">
            Price
            <input
              disabled={isChosingImage}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              className="p-4 text-gray-400"
              placeholder={product.price}
            />
          </label>
          <label className="mt-5 flex flex-col gap-3">
            Location
            <input
              disabled={isChosingImage}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="p-4 text-gray-400"
              placeholder={product.location}
            />
          </label>
          <label className="mt-5 flex flex-col gap-3">
            Description
            <input
              disabled={isChosingImage}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className="p-4 text-gray-400"
              placeholder={product.description}
            />
          </label>
          <button
            disabled={isChosingImage}
            onClick={saveChanges}
            className="bg-primary mt-10 py-5 px-10 w-full text-white text-xl rounded-xl"
          >
            save changes
          </button>
        </div>
      </div>
    </section>
  );
};

export default Edit;
