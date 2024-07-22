import { useEffect } from "react"
import useFetchData from "../../hooks/fetchData"
import { useDispatch } from "react-redux"
import { SET_ACTIVE_App } from "../../Redux/LoadingSlice/LoadingSlice"
import { NavLink } from "react-router-dom"

function BottomHeader() {
  const { data, loading } = useFetchData("products/categories")
  console.log(loading)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!loading) {
      dispatch(SET_ACTIVE_App())
    }
  }, [loading, dispatch])
  return (
    <ul className="flex || justify-center || items-center || bg-secColor || text-white || border-t || border-gray-600">
      <NavLink to="/" className="header-link">
        Home
      </NavLink>
      {data?.map((item) => (
        <NavLink
          to={`/?category=${item.replace(" ", "_")}`}
          key={item}
          className="header-link"
        >
          {item}
        </NavLink>
      ))}
    </ul>
  )
}

export default BottomHeader
