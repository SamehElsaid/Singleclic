import { FaFacebookF, FaHeadphones, FaInstagram, FaTiktok } from "react-icons/fa"
import { RiSnapchatFill } from "react-icons/ri"

function TopHeader() {
    return (
        <div className="bg-mainColor || text-white">
            <div className="container || py-3">
                <div className="flex || justify-center || items-center || flex-col-reverse || md:flex-row || md:justify-between || gap-3">
                    <div className="flex || items-center || gap-1">
                        <FaHeadphones className="text-2xl" />
                        <p className="text-xs flex-1"> ORDER ONLINE OR CALL US +(1800) 1234</p>
                    </div>
                    <div className="flex || items-center || gap-1">
                        <div className="hover:bg-blue-500 || circle-W-30 ">
                            <FaFacebookF className="text-xl" />
                        </div>
                        <div className="hover:bg-pink-600 || circle-W-30 ">
                            <FaInstagram  className="text-xl" />
                        </div>
                        <div className="hover:bg-red-500 || circle-W-30 ">
                            <FaTiktok  className="text-xl" />
                        </div>
                        <div className="hover:bg-yellow-500 || circle-W-30 ">
                            <RiSnapchatFill  className="text-xl" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default TopHeader
