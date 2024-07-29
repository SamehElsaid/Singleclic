import { useParams } from "react-router-dom";
import useFetchData from "../hooks/fetchData";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { toast } from "react-toastify";
import { SET_CART } from "../Redux/CartSlice/CartSlice";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Product() {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    `products/${id.split("-").pop()}`
  );
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  if (error)
    return (
      <div className="flex || justify-center || items-center || min-h-[70vh] || py-10">
        <h2 className="text-xl || font-semibold || text-red-500">
          Something went wrong
        </h2>
      </div>
    );
  return (
    <div className="container || py-20 || flex || gap-3 || relative || items-center flex-col || md:flex-row">
      {loading ? (
        <div className="w-full min-h-[500px] || flex || justify-center || items-center">
          <div className="w-[50px] h-[50px] || border-4 border-mainColor || rounded-full || animate-spin || border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="w-full  flex items-center justify-center border border-gray-200 p-2 || rounded-md">
            <LazyLoadImage
              alt={data.title}
              className="object-cover w-full max-h-[400px]"
              placeholder={
                <div className="w-full h-[250px] animate-pulse bg-gray-200"></div>
              }
              effect="blur"
              wrapperProps={{
                style: { transitionDelay: "0.3s" },
              }}
              src={data.image}
            />
          </div>
          <div className=" h-[300px] || w-full">
            <h2 className="text-2xl || font-semibold">{data.title}</h2>
            <div className="flex || gap-1">
              <Rating
                style={{ maxWidth: 100 }}
                readOnly={true}
                value={data.rating.rate}
              />
              ({data.rating.count})
            </div>
            <p className="text-sm || text-gray-500 my-2">{data.description}</p>
            <div className="">
              Hurry! Only
              <span className="font-bold animate-pulse || px-1 || text-red-500">
                {data.id}
              </span>
              units left in stock!
            </div>
            <p className="text-lg || font-semibold my-2 || text-end">
              {data.price}$
            </p>
            <div className="flex || gap-2">
              <div className="flex">
                <button
                  onClick={() => setCount(count - 1)}
                  disabled={count === 1}
                  className="border border-gray-200 w-[40px] || h-[40px] || text-2xl || rounded-e-none"
                >
                  -
                </button>
                <p className=" || px-4 || py-2 || h-[40px] || border-y || border-gray-200">
                  {count}
                </p>
                <button
                  onClick={() => setCount(count + 1)}
                  className="border border-gray-200 w-[40px] || h-[40px] || text-2xl || rounded-e-none"
                >
                  +
                </button>
              </div>
              <div className="flex || justify-end">
                <button
                  onClick={() => {
                    const cartData =
                      JSON.parse(localStorage.getItem("cart")) ?? [];
                    const findMyProduct = cartData.find(
                      (item) => item.id === data.id
                    );
                    toast.success("Product added to cart");
                    let newCart = [];
                    if (findMyProduct) {
                      newCart = cartData.map((item) =>
                        item.id === data.id
                          ? { ...item, quantity: item.quantity + count }
                          : item
                      );
                    } else {
                      newCart = [...cartData, { id: data.id, quantity: count }];
                    }
                    localStorage.setItem("cart", JSON.stringify(newCart));
                    dispatch(SET_CART(newCart));
                    setCount(1);
                  }}
                  className="bg-mainColor || text-white || px-4 || py-2 || rounded-md"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Product;
