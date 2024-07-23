import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { IoBagOutline } from "react-icons/io5"
import Cart from "../Cart/Cart"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

function MainHeader() {
    const [open, setOpen] = useState(false)
    const cart = useSelector(state => state.Cart.data)
    return (
        <>
            <Cart setOpen={setOpen} open={open} />
            <div className="text-white || bg-secColor">
                <div className="container || py-5 || flex || flex-col || md:flex-row || gap-3 || items-center || justify-between">
                    <Link to="/" onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }} className="text-2xl font-bold">
                        <span className="text-appColor">Single</span>
                        click
                    </Link>
                    <form className="relative || overflow-hidden">
                        <input type="text" placeholder="Search" className="w-full || md:min-w-[400px] || p-2 || pe-[50px]  || outline-none || text-black || placeholder:text-gray-500" />
                        <button className="absolute || top-0 || end-0 || px-3 || w-[50px] || h-full || bg-appColor || hover:bg-appColor/80 || duration-300 || flex || items-center || justify-center">
                            <IoIosSearch className="text-2xl" />
                        </button>
                    </form>
                    <button onClick={() => setOpen(true)} className="flex || items-center || gap-2">
                        <IoBagOutline className="text-2xl" />
                        <p className="text-sm">Shopping Cart - {cart.reduce((acc, item) => acc + item.quantity, 0)}</p>
                    </button>
                </div>
            </div>
        </>
    )
}

export default MainHeader
