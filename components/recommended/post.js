import NumberFormat from "react-number-format";
import Link from "next/link";

export default function Post({ allProducts, title, image, price, id }) {
  return (
    <>
      <div
        className={
          allProducts
            ? "border p-3 rounded-xl bg-white"
            : " carousel-item  flex flex-col w-[120px] md:w-[200px] p-2"
        }
      >
        <img
          src={image}
          className={
            allProducts
              ? "mx-1 w-[100%] mb-4 lg:h-[145px] h-[100px] md:h-[150px] rounded-lg object-cover"
              : "mx-1 mt-5 lg:w-[90%] w-[100%] h-[100px] md:h-[150px] rounded-lg object-cover"
          }
          alt={title}
        />
        <Link href={`/product/${id}`} className="hover:underline">
          <span className="capitalize font-[500] justify-center text-center line-clamp-1">
            {title}
          </span>
          <h2 className="text-sm text-center mt-2 text-cyan-400">
            &#8358; {price}
          </h2>
        </Link>

        {allProducts && (
          <button className="bg-primary text-sm  lg:mt-4 rounded-[3px] lg:mb-1 flex justify-center mt-5 text-white mb-5 px-4 py-2 w-2xl mx-auto">
            Save This Item
          </button>
        )}
      </div>
    </>
  );
}
