import NumberFormat from "react-number-format";
import Link from "next/link";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";

export default function Post({
  allProducts,
  title,
  image,
  price,
  id,
  location,
}) {
  return (
    <>
      <div
        className={
          allProducts
            ? "border-black/20 mt-3 rounded-xl border-[1px] "
            : " carousel-item  flex flex-col w-[120px] md:w-[200px] p-2"
        }
      >
        <img
          src={image}
          className={
            allProducts
              ? " w-[100%] rounded-t-xl mb-4 lg:h-[145px] h-[250px]  object-cover"
              : "mx-1 mt-5 lg:w-[90%] w-[100%] h-[100px] md:h-[150px] rounded-lg object-cover"
          }
          alt={title}
        />

        <div className="px-3">
          <a href={`/product/${id}`} className="hover:underline ">
            <h2 className="text-md mb-2 mt-2 text-cyan-400">&#8358; {price}</h2>
            <span className="capitalize font-[500] justify-center  line-clamp-3">
              {title}
            </span>
          </a>

          <h3 className="capitalize text-gray-600 my-3 flex gap-1">
            <PlaceIcon />
            {/* <Image src="/bookmark.png" width={18} height={15} /> */}
            {location}
          </h3>
        </div>

        {/* {allProducts && (
          <button className="bg-primary text-sm  lg:mt-4 rounded-[3px] lg:mb-1 flex justify-center mt-5 text-white mb-5 px-4 py-2 w-2xl mx-auto">
            Save This Item
          </button>
        )} */}
      </div>
    </>
  );
}
