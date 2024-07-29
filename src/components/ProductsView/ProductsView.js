import ProductCard from "../ProductCard/ProductCard";
import SkeletonProductCard from "../SkeletonProductCard/SkeletonProductCard";

function ProductsView({ data, title, loading }) {
  return (
    <div className="container py-24 ProductsView" id={title.toLowerCase()}>
      <h2 className="text-2xl || font-semibold || w-fit || pb-1 || group || mx-auto || text-center || mb-5 || relative">
        {title}
        <span className="absolute || w-[50%] || h-[2px] || bg-appColor || left-1/2 || -translate-x-1/2 || bottom-0 || transition-all || duration-300 || group-hover:w-[100%]"></span>
      </h2>
      <div className="grid || grid-cols-1 || md:grid-cols-2 || lg:grid-cols-3 || gap-5">
        {loading &&
          Array.from({ length: 10 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        {data?.map((item) => (
          <ProductCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ProductsView;
