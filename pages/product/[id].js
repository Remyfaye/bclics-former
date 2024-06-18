"use client";
import { menuEmpty } from "@/constants";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CategoryDisplay from "@/components/categories/CategoryDisplay";
import Saved from "@/components/saved/Saved";
import Leftside from "@/components/header/leftside";
import { Cookies } from "react-cookie";

const page = () => {
  const cookie = new Cookies();

  const userId = cookie.get("userId");
  const [user, setUser] = useState(null);
  const [vendor, setVendor] = useState(null);

  const router = useRouter();
  const [product, setProduct] = useState({});
  const [id, setId] = useState(null);
  const [header, setHeader] = useState("");
  const [loading, setLoading] = useState(false);
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    // console.log(router.isReady);
    const fetchProduct = async () => {
      try {
        const product = menuEmpty.find((item) => item._id === id);
        if (router.isReady) {
          const response = await fetch(`/api/product/${id}`);
          const data = await response.json();

          setId(router.query.id);
          console.log(product);
          setProduct(data);
          setHeader(data?.category);

          if (!response.ok) {
            const errorData = await response.json();
            return;
          }
        } else {
          setLoading(true);
        }

        setUser(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }

        const data = await response.json();
        setUser(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        // setError("Error fetching user");
      }
    };

    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/users/${product?.vendor}`);

        if (!response.ok) {
          const errorData = await response.json();
          return;
        }

        const data = await response.json();
        setVendor(data);
        // console.log(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        // setError("Error fetching user");
      }
    };

    fetchUser();
    fetchVendor();
    fetchProduct();

    if (user?._id === product.vendor) {
      setOwner(true);
    }
  }, [product, router.isReady, router.query.id, id]);
  return (
    <div className="lg:flex gap-5">
      <div className="fixed top-[-4px] w-[16rem] h-screen mt-[4.2rem] mr-10">
        <Leftside />
      </div>
      <div className="lg:px-5 p-2 lg:max-w-[65rem] lg:mx-auto lg:mr-[14px] ">
        <p className="mt-3 ">fi</p>
        <div className="lg:flex justify-between mt-10">
          {/* left */}
          <div className=" flex mt-5 gap-3  bg-white capitalize lg:w-[57%] rounded-lg">
            <img
              className=" w-full   object-cover h-[20rem]  lg:h-[25rem] rounded-lg"
              src={product?.image}
              alt="img"
            />
          </div>

          {/* product details */}
          <div className="bg-white mt-5 p-3 rounded-lg lg:w-[40%]">
            <h2 className="border-b mb-5 pb-2 font-bold "> Product Details</h2>
            <div className="p-3">
              <div className=" mb-1 pb-2">
                <p className="font-semibold ">Name: {product?.name}</p>
                <p className=" my-3">Vendor: {vendor?.name}</p>

                {/* <p className="mt-2 text-[13px]">
                  vendor:{" "}
                  <a className="cursor-pointer text-gray-400 " href="">
                    {product?.vendor}
                  </a>
                </p> */}
              </div>
              <p className="font-[500">Price: &#8358;{product?.price}</p>

              <p className="my-2 text-gray-500">
                contact:{" "}
                <a className="cursor-pointer text-red-500 " href="">
                  {product?.contact}
                </a>
              </p>

              <p className="mb-3">
                <span
                  className=" font-extralight cursor-pointer text-blue-300 mb-5"
                  href=""
                >
                  location: {product.location}
                </span>
              </p>

              <button className="bg-primary rounded-[7px] text-white lg:px-4 px-3 py-2">
                Save This Item
              </button>

              {owner && (
                <button className="cursor-pointer border ml-3 text-center my-5 w-[40%] rounded-[7px] text-black lg:px-4 px-3 py-2">
                  <a href={`/upload/edit/${product._id}`}>edit</a>
                </button>
              )}
            </div>
            <p className="border-t pt-3">{product?.description}</p>
          </div>
        </div>

        {loading && (
          <>
            <div className="text-center my-10">loading...</div>
          </>
        )}

        {/* other category */}
        <div>
          {/* <h2 className="mt-10 text-xl">You may also like:</h2> */}
          {!loading && <CategoryDisplay header={header} productPage />}
        </div>

        {/* saved items */}
        <div>
          {/* <h2 className="mt-10 text-xl">You may also like:</h2> */}
          {!loading && <Saved header={header} productPage />}
        </div>
      </div>
    </div>
  );
};

export default page;
