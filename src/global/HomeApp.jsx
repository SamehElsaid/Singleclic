import { useSelector } from "react-redux";
import Header from "../components/Header/Header"

function HomeApp({ children }) {
    const loading = useSelector(state => state.Loading.data)
    return (
        <>
            {loading &&
                <div style={{ zIndex: 1111 }} className="fixed bg-mainColor inset-0 flex || items-center || justify-center">
                    <div className="loader"></div>

                </div>
            }
            <Header />
            {children}
        </>
    )
}

export default HomeApp
