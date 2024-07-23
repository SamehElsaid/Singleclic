import { useEffect, useRef, useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { IoBagOutline } from "react-icons/io5"
import Cart from "../Cart/Cart"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

function MainHeader() {
    const [open, setOpen] = useState(false)
    const { pathname } = useLocation()
    const cart = useSelector(state => state.Cart.data)
    const { data } = useSelector((state) => state.product)
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState(false)
    const searchRef = useRef(null)
    const handleSubmit = (e) => {
        e.preventDefault()
        const filtered = data?.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase()))
        setSearchResult(filtered)
    }
    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(e.target)
            ) {
                setSearchResult(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutSide);
        return () => {
            document.removeEventListener("mousedown", handleClickOutSide);
        };
    }, [searchRef]);
    useEffect(() => {
        setSearchResult(false);
    }, [pathname])
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
                    <div ref={searchRef} className="relative">
                        <form onSubmit={handleSubmit} className="relative || overflow-hidden">
                            <input onChange={(e) => {
                                setSearch(e.target.value)
                                if (searchResult) {
                                    setSearchResult(false)
                                }
                            }} value={search} type="text" placeholder="Search" className="w-full || md:min-w-[400px] || p-2 || pe-[50px]  || outline-none || text-black || placeholder:text-gray-500" />
                            <button type="submit" className="absolute || top-0 || end-0 || px-3 || w-[50px] || h-full || bg-appColor || hover:bg-appColor/80 || duration-300 || flex || items-center || justify-center">
                                <IoIosSearch className="text-2xl" />
                            </button>
                        </form>
                        <div className="absolute z-20 || top-[100%] || rounded-b-md || left-0 || w-full || max-h-[300px] || overflow-y-auto || bg-white || shadow-xl">
                            {searchResult &&
                                <>
                                    {searchResult?.length === 0 && (
                                        <p className="w-full || p-2 || text-center || text-gray-500">No results found</p>
                                    )}
                                    {searchResult?.map((item) => (
                                        <Link to={`/product/${item.title.replaceAll(" ", '-').replaceAll("/", '-')}-${item.id}`} key={item.id} className="w-full || p-2 || flex || items-center || gap-2 || border-b || border-gray-200 || hover:bg-gray-100 || duration-300">
                                            <img src={item.image} alt={item.title} className="w-[50px] || h-[50px] || object-cover" />
                                            <p className="text-sm || font-bold || text-black">{item.title}</p>
                                        </Link>
                                    ))}
                                </>
                            }
                        </div>
                    </div>
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
