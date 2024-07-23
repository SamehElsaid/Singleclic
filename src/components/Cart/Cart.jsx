import React, { Fragment, useEffect, useState } from 'react'
import Drawer from '../Drawer/Drawer'
import { IoMdClose } from 'react-icons/io';
import { MdDeleteOutline } from 'react-icons/md';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductData } from '../../Redux/ProductSlice/ProductSlice';
import { Rating } from '@smastrom/react-rating';
import { BsCart3 } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { SET_CART } from '../../Redux/CartSlice/CartSlice';

function Cart({ setOpen, open }) {
    const cartState = useSelector((state) => state.Cart.data)
    const { data } = useSelector((state) => state.product)
    const [cart, setCart] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductData())
    }, [dispatch])
    useEffect(() => {
        if (data) {
            const DataCart = []
            cartState.forEach((item) => {
                const findData = data.find((product) => product.id === item.id)
                if (findData) {
                    DataCart.push({ ...findData, quantity: item.quantity })
                }
            })
            setCart(DataCart)
        }

    }, [data, cartState])
    return (
        <Drawer onClose={() => setOpen(false)} open={open}>
            <div className="pb-2 || relative h-[100%] flex flex-col || max-w-[600px] || overflow-auto">
                <div className="flex   px-4 z-10 || shadow-xl || sticky || top-0 ||  py-4 || mb-2 || items-center || justify-between || gap-3 || bg-[#344290]">
                    <h2 className="text-2xl -mb-1  || text-white || font-bold || text-center || ElMessiri">
                        Cart
                    </h2>
                    <button
                        onClick={() => setOpen(false)}
                        className="w-[30px]  || flex || items-center || justify-center || h-[30px] || bg-mainColor || duration-300 || hover:bg-mainColor/80 || rounded-full"
                    >
                        <IoMdClose className="text-white text-xl" />
                    </button>
                </div>
                <div className="px-4 || pt-5 flex-1 ">
                    <div className='h-full flex flex-col relative'>
                        {cart.length === 0 ?
                            <div className=" h-full w-[250px] md:min-w-[300px]  px-2 || flex || items-center || justify-center">
                                <div className="">
                                    <div className="text-center">
                                        <BsCart3 className="text-7xl || text-gray-400 || mx-auto" />
                                        <h4 className="text-gray-400 || text-xl || mt-2">
                                            No items in the cart
                                        </h4>
                                        <h4 className="text-[#344290]  || my-2">
                                            Order Now
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            :
                            <>
                                <div className="  px-2 || overflow-y-auto relative">
                                    {cart.map((category, i) => (
                                        <Fragment key={i}>
                                            <div className="flex  gap-2 || border-b || border-slate-200 || pb-3 || mb-3">
                                                <div className="w-[137px] h-[137px]  rounded-md || overflow-hidden  ">

                                                    <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="text-[16px] min-h-[48px] font-bold || text-mainColor || overLapP">
                                                        {category.title}
                                                    </h2>
                                                    <div className=" my-1 || px-3  flex || items-center || justify-between  ">
                                                        <p className="justify-end w-full || text-mainColor -mt-1  || text-[10px] || font-semibold || price || flex || items-center || gap-1">
                                                            <span className="font-bold">
                                                                $
                                                            </span>
                                                            <span className="text-[14px] || text-black">
                                                                {category.price.toFixed(2)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="text-xl text-end">
                                                        <Rating style={{ maxWidth: 100 }} readOnly={true} value={category.rating.rate} />

                                                        <div className="text-[16px] font-bold flex || items-center">
                                                            <button
                                                                onClick={() => {
                                                                    const cartData = JSON.parse(localStorage.getItem("cart")) ?? []
                                                                    toast.success("Product added to cart")
                                                                    let newCart = []
                                                                    newCart = cartData.map(item => item.id === category.id ? { ...item, quantity: item.quantity + 1 } : item)
                                                                    localStorage.setItem("cart", JSON.stringify(newCart))
                                                                    dispatch(SET_CART(newCart))
                                                                }}
                                                                className="flex || items-center || justify-center || p-2  || hover:text-mainColor || duration-300 || transition-colors"
                                                            >
                                                                <FaPlus className="text-sm" />
                                                            </button>
                                                            <div className="px-3 || py-1 flex || items-center || justify-between  ">
                                                                <p className=" text-mainColor || text-[12px] || font-semibold || price || flex || items-center || gap-1 ">
                                                                    <span>x</span>
                                                                    <span className=" text-base || text-black ">
                                                                        {category.quantity}
                                                                    </span>
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    const cartData = JSON.parse(localStorage.getItem("cart")) ?? []
                                                                    toast.success("Product added to cart")
                                                                    let newCart = []
                                                                    category.quantity === 1 ?
                                                                        newCart = cartData.filter(item => item.id !== category.id) :
                                                                        newCart = cartData.map(item => item.id === category.id ? { ...item, quantity: item.quantity - 1 } : item)
                                                                    localStorage.setItem("cart", JSON.stringify(newCart))
                                                                    dispatch(SET_CART(newCart))
                                                                }}
                                                                className="flex || items-center || justify-center || p-2  || hover:text-mainColor || duration-300 || transition-colors"
                                                            >
                                                                {category.quantity === 1 ? (
                                                                    <MdDeleteOutline />
                                                                ) : (
                                                                    <FaMinus className="text-sm" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                                <div className="mt-auto sticky bottom-[-10px] px-4 py-2 w-full left-0  bg-white">
                                    <div className="h-[30px] mt-1  border-b   border-slate-200">
                                        <div className="flex px-4  items-center justify-between">
                                            <span className="whitespace-nowrap">
                                                Subtotal
                                            </span>

                                            <p className="justify-end w-full || text-mainColor -mt-1  || text-[13px] || font-semibold || price || flex || items-center || gap-1">
                                                <span className="font-bold">
                                                    $
                                                </span>
                                                <span className="text-[16px] || text-black">
                                                    {cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setCart([])
                                            dispatch(SET_CART([]))
                                            localStorage.removeItem("cart")
                                            toast.success("Order placed successfully")
                                            setOpen(false)
                                        }}
                                        className="bg-[#344290] hover:bg-[#344290]/80 duration-300 mt-[10px] relative rounded-md  h-[50px] w-full px-4"
                                    >

                                        <div className="flex items-center justify-center">
                                            <span className="text-white">
                                                Complete
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default Cart
