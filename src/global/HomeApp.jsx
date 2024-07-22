import Header from "../components/Header/Header"

function HomeApp({ children }) {


    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default HomeApp
