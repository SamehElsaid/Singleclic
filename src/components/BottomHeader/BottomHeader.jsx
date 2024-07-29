import { useEffect, useState } from "react"
import useFetchData from "../../hooks/fetchData"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_App } from "../../Redux/LoadingSlice/LoadingSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"

function BottomHeader() {
  const [fixed, setFixed] = useState(false)
  const push = useNavigate()
  const [inView, setInView] = useState(false)
  const { search, pathname } = useLocation()
  const { data, loading } = useFetchData("products/categories")
  const dispatch = useDispatch()
  useEffect(() => {
    if (!loading) {
      dispatch(SET_ACTIVE_App())
    }
  }, [loading, dispatch])
  useEffect(() => {
    if (pathname === "/" && search && !loading) {
      const category = search.split("=")[1].replaceAll("_", " ").replaceAll("&", "'")
      if (document.getElementById(category)) {
        document.getElementById(category).scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [search, pathname, loading])
  useEffect(() => {
    const scroll = () => {
      function isScrolledIntoView(el) {
        try {
          const rect = el.getBoundingClientRect();
          const elemTop = rect.top;
          const elemBottom = rect.bottom;
          const isVisible = elemTop < window.innerHeight && elemBottom >= 0;
          return isVisible;
        } catch {
          return false
        }
      }
      document.querySelectorAll(".ProductsView").forEach((item) => {
        if (isScrolledIntoView(item)) {
          setInView(item.id)
        }
      })

      

      if (window.scrollY > 150) {
        setFixed(true)
      } else {
        setFixed(false)
        setInView(null)
      }
    }
    window.addEventListener("scroll", scroll)
    scroll()
    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [push, data])
  return (
    <div className="relative h-[64.8px]">
      <ul className={`flex || justify-center || items-center || bg-secColor || text-white || ${fixed ? "fixed top-0 left-0 right-0 z-50 headerAnimation shadow-xl" : "border-t border-gray-600 "}`}>
        <Link to="/" onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }} className={`header-link text-[10px] || sm:text-[13px] || md:text-[18px] ${!search && pathname === "/" ? inView === null ? "active" : "" : ""}`}>
          Home
        </Link>
        {data?.map((item) => (
          <ul
            onClick={() => {
              if (pathname === "/") {
                document.getElementById(item).scrollIntoView({ behavior: "smooth" })
              } else {
                push(`/`)
                setTimeout(() => {
                  if (document.getElementById(item)) {
                    document.getElementById(item).scrollIntoView({ behavior: "smooth" })
                  }
                }, 0)
              }
            }}
            key={item}
            className={`header-link text-[10px] || sm:text-[13px] || md:text-[18px] ${inView === item ? "active" : ""}`}
          >
            {item}
          </ul>
        ))}
      </ul>
    </div>
  )
}

export default BottomHeader
