import React, { useEffect, useState } from "react";
import { fetchProductsbyCategory } from "@/lib/fetchData";
import { Skeleton } from "@mui/material";
import { NGnaira } from "@/lib/help";
import { menuEmpty } from "@/constants";
import Post from "../recommended/post";
import RecomHeader from "../recommended/header";

export default function CategoryDisplay({ header, productPage }) {
  const [posts, setPosts] = useState();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // const products = await fetchProductsbyCategory("gaming");
      //   console.log(products);
    };
    fetchProducts();
    const products = menuEmpty.filter((item) => item.category === header);
    setProducts(products);
    // console.log(products);
  }, [products]);

  return (
    <div className="pt-5 mt-5 rounded-xl">
      {!productPage && <RecomHeader title={header} color="bg-primary" />}

      <div className="bg-white ">
        {productPage && (
          <h2 className="p-2 border-b mb-5 pb-2">You may also like</h2>
        )}
        <div
          className={
            productPage
              ? "carousel lg:pr-3 lg:grid grid-cols-5 carousel-center w-full shadow-lg"
              : "carousel lg:pr-3 lg:grid grid-cols-6 carousel-center w-full shadow-lg"
          }
        >
          {products?.map((post) => (
            <Post
              key={post.id}
              title={post.name}
              image={post.image}
              price={post.price}
              id={post._id}
              category={post.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
