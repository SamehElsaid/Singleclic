import { useSelector } from "react-redux"
import ProductsView from "../components/ProductsView/ProductsView"

function Home() {
  const { data, loading, error } = useSelector((state) => state.product)

  if (error)
    return (
      <div className="flex || justify-center || items-center || min-h-[70vh] || py-10">
        <h2 className="text-xl || font-semibold || text-red-500">Something went wrong</h2>
      </div>
    )
  return (
    <div>
      <ProductsView data={data?.filter((item) => item.category === "electronics")} title="Electronics" loading={loading} />
      <div className="border-b-2 || border-gray-200"></div>
      <ProductsView data={data?.filter((item) => item.category === "jewelery")} title="Jewelery" loading={loading} />
      <div className="border-b-2 || border-gray-200"></div>
      <ProductsView data={data?.filter((item) => item.category === "men's clothing")} title="Men's clothing" loading={loading} />
      <div className="border-b-2 || border-gray-200"></div>
      <ProductsView data={data?.filter((item) => item.category === "women's clothing")} title="Women's clothing" loading={loading} />
    </div>
  )
}

export default Home
