import { IoIosSearch } from "react-icons/io"
import { IoBagOutline } from "react-icons/io5"

function MainHeader() {
    return (
        <div className="text-white || bg-secColor">
            <div className="container || py-5 || flex || items-center || justify-between">
                <h1 className="text-2xl font-bold">
                    <span className="text-appColor">Single</span>
                    click
                </h1>
                <form className="relative || overflow-hidden">
                    <input type="text" placeholder="Search" className="w-full || md:min-w-[400px] || p-2 || pe-[50px]  || outline-none || text-black || placeholder:text-gray-500" />
                    <button className="absolute || top-0 || end-0 || px-3 || w-[50px] || h-full || bg-appColor || hover:bg-appColor/80 || duration-300 || flex || items-center || justify-center">
                        <IoIosSearch className="text-2xl" />
                    </button>
                </form>
                <button className="flex || items-center || gap-2">
                    <IoBagOutline className="text-2xl" />
                    <p className="text-sm">Shopping Cart - 0</p>
                </button>
            </div>
        </div>
    )
}

export default MainHeader
