import { IoBagOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { SET_CART } from "../../Redux/CartSlice/CartSlice";
import { Rating } from '@smastrom/react-rating'
import { Link } from "react-router-dom";

function ProductCard({ title, price, description, image, rating, id }) {
    const dispatch = useDispatch()
    return (
        <div className="relative ||  h-full">
            <div onClick={() => {
                const cartData = JSON.parse(localStorage.getItem("cart")) ?? []
                const findMyProduct = cartData.find(item => item.id === id)
                toast.success("Product added to cart")
                let newCart = []
                if (findMyProduct) {
                    newCart = cartData.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)
                } else {
                    newCart = [...cartData, { id, quantity: 1 }]
                }
                localStorage.setItem("cart", JSON.stringify(newCart))
                dispatch(SET_CART(newCart))

            }} className="absolute top-[10px] z-10 || start-[10px] || shadow-xl || hover:bg-[#7fbc1e]/70 || duration-300 || bg-[#7fbc1e] || p-1 || px-2 || circle-W-30">
                <IoBagOutline className="text-white text-xl" />
            </div>
            <div className="absolute top-[10px]  z-10 || right-[0] shadow-xl || bg-mainColor || p-1 || px-2 || rounded-s-full">
                <Rating style={{ maxWidth: 100 }} readOnly={true} value={rating.rate} />

            </div>
            <Link to={`/product/${title.replaceAll(" ", '-').replaceAll("/", '-')}-${id}`} className="border h-full  || border-gray-200 || rounded-md || overflow-hidden || flex || flex-col || hover:shadow-lg || hover:cursor-pointer || transition-all || hover:translate-y-[-5px] || duration-300">

                <img src={image} alt={title} className="w-full || h-[250px] || object-cover " />
                <div className="px-3 flex-1 || flex || flex-col ">
                    <h2 className="text-lg || font-semibold || mt-2 || flex-1 overLapP">{title}</h2>
                    <p className="text-sm || text-gray-500 || mt-1 || overLapP">{description}</p>
                    <p className="text-lg || font-semibold || mt-2 || text-end">{price}$</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
