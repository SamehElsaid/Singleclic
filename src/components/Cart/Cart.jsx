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
            <div className="pb-2 || relative h-[100dvh] flex flex-col || max-w-[600px] || overflow-auto">
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
                            </div> :
                            <>
                                <div className="flex-1  scrollStyle overflow-hidden px-2 || overflow-y-auto">
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
                                <div className="sticky bottom-0 bg-white">
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

                        {/* {loadingCart ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex  gap-2 || border-b || border-slate-200 || pb-3 || mb-3"
                                >
                                    <div className="w-[100%] h-[137px]  rounded-md || overflow-hidden skeleton "></div>
                                </div>
                            ))
                        ) : cartItems.items.length === 0 ? (
                            <div className="h-[calc(100dvh-105px-40px)]  px-2 || flex || items-center || justify-center">
                                <div className="">
                                    <div className="text-center">
                                        <BsCart3 className="text-7xl || text-gray-400 || mx-auto" />
                                        <h4 className="text-gray-400 || text-xl || mt-2">
                                            {locale === "ar"
                                                ? "لا يوجد من من السلة"
                                                : "No items in the cart"}
                                        </h4>
                                        <h4 className="text-[#344290]  || my-2">
                                            {locale === "ar" ? "طلب الان" : "Order Now"}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {step === 1 && (
                                    <div
                                        style={{ zIndex: 5555555555 }}
                                        className="fixed inset-0 || p-4 bg-drawer z-20  || flex || || items-center || justify-center "
                                    >
                                        <div
                                            className="absolute inset-0 "
                                            onClick={() => setStep(0)}
                                        ></div>
                                        <div className="w-[100%]  bg-white || rounded-md || p-5 || max-h-[100%] || overflow-y-auto || scrollStyle relative">
                                            <button
                                                onClick={() => setStep(0)}
                                                className="w-[30px] absolute top-2 end-2 || flex || items-center || justify-center || h-[30px] || bg-mainColor || duration-300 || hover:bg-mainColor/80 || rounded-full"
                                            >
                                                <IoMdClose className="text-white text-xl" />
                                            </button>
                                            <FormDataUser setStep={setStep} cart={cartItems.id} />
                                        </div>
                                    </div>
                                )}
                                {step === 2 && (
                                    <div
                                        style={{ zIndex: 5555555555 }}
                                        className="fixed inset-0 || p-4 bg-drawer z-20  || flex || || items-center || justify-center "
                                    >
                                        <div
                                            className="absolute inset-0 "
                                            onClick={() => setStep(0)}
                                        ></div>



                                        <form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                if (otp.length !== 5) {
                                                    return toast.error(
                                                        locale === "ar"
                                                            ? "ادخل رمز التأكيد"
                                                            : "Enter verification code"
                                                    );
                                                }
                                                if (user.data) {
                                                    if (!user.data.is_verified_phone) {
                                                        setLoadingBtn(true)
                                                        axiosPatch("auth/verify-phone/", locale, {
                                                            token: otp
                                                        }).then(res => {
                                                            if (res.status) {
                                                                toast.success(locale === "ar" ? "تم تفعيل الحساب" : "Account has been activated")
                                                                dispatch(SET_ACTIVE_USER({ ...user.data, is_verified_phone: true }));
                                                                setStep(0);
                                                                setOtp("");
                                                            }
                                                        }).finally(() => {
                                                            setLoadingBtn(false)
                                                        })
                                                    }
                                                } else {
                                                    axiosPatch("auth/verify-phone/", locale, {
                                                        token: otp
                                                    }, false, true).then(res => {
                                                        if (res.status) {
                                                            toast.success(locale === "ar" ? "تم تفعيل الحساب" : "Account has been activated")
                                                            dispatch(SET_cartSlice({ items: [] }))
                                                            setStep(0);
                                                            setOtp("");
                                                        }
                                                    }).finally(() => {
                                                        setLoadingBtn(false)
                                                    })

                                                }

                                            }}
                                            className="w-[100%]  bg-white || rounded-md || p-5 || max-h-[100%] || overflow-y-auto || scrollStyle relative"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setStep(0)}
                                                className="w-[30px] absolute top-2 end-2 || flex || items-center || justify-center || h-[30px] || bg-mainColor || duration-300 || hover:bg-mainColor/80 || rounded-full"
                                            >
                                                <IoMdClose className="text-white text-xl" />
                                            </button>
                                            <div className="flex  || items-center || justify-center || flex-col">
                                                <h2 className="text-[16px] || font-bold || text-[#344290] || mb-3">
                                                    {locale === "ar"
                                                        ? "ادخل رمز التأكيد"
                                                        : "Enter verification code"}
                                                </h2>
                                                <div style={{ direction: "ltr" }} className="">

                                                    <OtpInput
                                                        value={otp}
                                                        onChange={setOtp}
                                                        numInputs={5}
                                                        renderSeparator={<span>-</span>}
                                                        renderInput={(props) => (
                                                            <input
                                                                {...props}
                                                                className="inputFix !border-[#344290] !mx-2 !w-[100%] || !h-[50px]"
                                                            />
                                                        )}
                                                    />
                                                </div>
                                                <div className="flex || justify-between || items-center || mt-2 || mb-3"></div>

                                                <button
                                                    type="submit"
                                                    className="bg-[#344290] || relative || overflow-hidden || hover:bg-[#344290]/80 || duration-300 || text-white || block || w-full || py-2 || rounded-xl "
                                                >
                                                    <span
                                                        className={`${loadingOtp || loadingBtn
                                                            ? "visible opacity-100"
                                                            : "invisible opacity-0"
                                                            }  duration-75 cursor-not-allowed || transition-all absolute || items-center || justify-center || flex inset-0 bg-gray-300`}
                                                    >
                                                        <span className=" w-[20px] || h-[20px] || border-2 || border-[#344290] || rounded-full border-t-transparent || animate-spin"></span>
                                                    </span>

                                                    {locale === "ar" ? "إكمال" : "Compelte"}
                                                </button>
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-center gap-1">
                                                        {resendOtp === 0 &&
                                                            (locale === "ar"
                                                                ? "اذا لم تستلم"
                                                                : "If you did not receive")}
                                                        <button
                                                            disabled={loadingBtn}
                                                            type="button"
                                                            onClick={() => {
                                                                if (user.data) {
                                                                    if (user.data.is_verified_phone) {
                                                                        setLoadingBtn(true)
                                                                        axiosPost("auth/verify-phone/", locale, {}).then(res => {
                                                                            if (res.status) {
                                                                                toast.success(locale === "ar" ? "تم ارسال رمز التأكيد" : "Otp has been send")
                                                                                setResendOtp(60);

                                                                            }
                                                                        }).finally(() => {

                                                                            setLoadingBtn(false)
                                                                        })
                                                                    } else {

                                                                    }
                                                                } else {
                                                                    setStep(1);
                                                                }

                                                            }}
                                                            className={`${resendOtp === 0
                                                                ? "text-[#344290] || font-bold || hover:text-[#344290]/80 || duration-300"
                                                                : ""
                                                                }`}
                                                        >
                                                            {resendOtp !== 0
                                                                ? locale === "ar"
                                                                    ? `لا تستطيع الارسال مجددا الا بعد ${resendOtp} ثواني`
                                                                    : ` You cannot resend again until after ${resendOtp} seconds`
                                                                : locale === "ar"
                                                                    ? "اعادة ارسال"
                                                                    : "Resend"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                <div className="h-[calc(100dvh-152px-40px)] scrollStyle overflow-hidden px-2 || overflow-y-auto">
                                    {cartItems.items.map((category, i) => (
                                        <Fragment key={i}>
                                            <div className="flex  gap-2 || border-b || border-slate-200 || pb-3 || mb-3">
                                                <div className="w-[137px] h-[137px]  rounded-md || overflow-hidden  ">
                                                    {loadingImg ? (
                                                        <div className="w-[137px] h-[137px]  rounded-md  skeleton"></div>
                                                    ) : (
                                                        <ImageLoad
                                                            src={category.product_info.image}
                                                            alt={category[`name_${locale}`]}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h2 className="text-[16px] min-h-[48px] font-bold || text-mainColor || overLapP">
                                                        {category.product_info[`name_${locale}`]}
                                                    </h2>
                                                    <div className=" my-1 || px-3  flex || items-center || justify-between  ">
                                                        <p className="justify-end w-full || text-mainColor -mt-1  || text-[10px] || font-semibold || price || flex || items-center || gap-1">
                                                            <span className="font-bold">
                                                                {locale === "ar" ? "ر.س" : "SR"}
                                                            </span>
                                                            <span className="text-[14px] || text-black">
                                                                {category.product_info.price.toFixed(2)}
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <div className="text-xl text-end">
                                                        <Rater
                                                            total={7}
                                                            interactive={false}
                                                            rating={category.product_info.stars}
                                                        >
                                                            {[...Array(7)].map((_, i) => (
                                                                <Fragment key={i}>
                                                                    {category.product_info.stars > i ? (
                                                                        <span key={i}>
                                                                            <TiStarFullOutline className="text-mainColor" />
                                                                        </span>
                                                                    ) : (
                                                                        <span key={i}>
                                                                            <TiStarOutline />
                                                                        </span>
                                                                    )}
                                                                </Fragment>
                                                            ))}
                                                        </Rater>
                                                        {loading === category.id ? (
                                                            <div className="text-[16px] bgSkekton || w-fit || rounded-md  font-bold flex || items-center">
                                                                <button className="flex opacity-0 invisible || items-center || justify-center || p-2  || hover:text-mainColor || duration-300 || transition-colors">
                                                                    <FaPlus className="text-sm" />
                                                                </button>
                                                                <div className="px-3 opacity-0 invisible || py-1 flex || items-center || justify-between  ">
                                                                    <p className=" text-mainColor || text-[12px] || font-semibold || price || flex || items-center || gap-1 ">
                                                                        <span>x</span>
                                                                        <span className=" text-base || text-black ">
                                                                            {category.quantity}
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                                <button className="flex opacity-0 invisible || items-center || justify-center || p-2  || hover:text-mainColor || duration-300 || transition-colors">
                                                                    {category.quantity === 1 ? (
                                                                        <MdDeleteOutline />
                                                                    ) : (
                                                                        <FaMinus className="text-sm" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <div className="text-[16px] font-bold flex || items-center">
                                                                <button
                                                                    onClick={() => {
                                                                        updateCart(category, 1, cartItems.id);
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
                                                                    onClick={() =>
                                                                        updateCart(category, -1, cartItems.id)
                                                                    }
                                                                    className="flex || items-center || justify-center || p-2  || hover:text-mainColor || duration-300 || transition-colors"
                                                                >
                                                                    {category.quantity === 1 ? (
                                                                        <MdDeleteOutline />
                                                                    ) : (
                                                                        <FaMinus className="text-sm" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Fragment>
                                    ))}
                                </div>
                                <div className="">
                                    <div className="h-[30px] mt-1  border-b   border-slate-200">
                                        <div className="flex px-4  items-center justify-between">
                                            <span className="whitespace-nowrap">
                                                {locale === "ar" ? "المجموع الكلي" : "Subtotal"}
                                            </span>

                                            <p className="justify-end w-full || text-mainColor -mt-1  || text-[13px] || font-semibold || price || flex || items-center || gap-1">
                                                <span className="font-bold">
                                                    {locale === "ar" ? "ر.س" : "SR"}
                                                </span>
                                                <span className="text-[16px] || text-black">
                                                    {cartItems.items[0].total_price}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (user.data) {
                                                if (!user.data.is_verified_phone) {
                                                    setLoadingBtn(true)
                                                    axiosPost("auth/verify-phone/", locale, {}).then(res => {
                                                        if (res.status) {
                                                            toast.success(locale === "ar" ? "تم ارسال رمز التأكيد" : "Otp has been send")
                                                            setStep(2);
                                                        }
                                                    }).finally(() => {

                                                        setLoadingBtn(false)
                                                    })
                                                } else {
                                                    setLoadingBtn(true)
                                                    axiosPost("order/", locale, {}).then(res => {
                                                        if (res.status) {
                                                            window.location.assign(res.results.url)
                                                        }
                                                    }).finally(() => {
                                                        setLoadingBtn(false)
                                                    })
                                                }
                                            } else {
                                                setStep(1);
                                            }
                                        }}
                                        className="bg-[#344290] hover:bg-[#344290]/80 duration-300 mt-[10px] relative rounded-md  h-[50px] w-full px-4"
                                    >
                                        <span
                                            className={`${loadingBtn ? "visible opacity-100" : "invisible opacity-0"
                                                }  duration-75 cursor-not-allowed || transition-all absolute || items-center || justify-center || flex inset-0 bg-gray-300`}
                                        >
                                            <span className=" w-[20px] || h-[20px] || border-2 || border-mainColor || rounded-full border-t-transparent || animate-spin"></span>
                                        </span>
                                        <div className="flex items-center justify-center">
                                            <span className="text-white">
                                                {locale === "ar" ? "اكمال الحجز" : "Complete Booking"}
                                            </span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )} */}
                    </div>
                </div>
            </div>
        </Drawer>
    )
}

export default Cart
