
function SkeletonProductCard() {
  return (
    <div className="border || border-gray-200 || rounded-md || overflow-hidden || flex || flex-col || hover:shadow-lg || hover:cursor-pointer || transition-all || hover:translate-y-[-5px] || duration-300">
      <div className="w-full || h-[200px] || bg-gray-200 || animate-pulse"></div>
      <div className="p-4 || flex || flex-col || gap-2">
        <div className="w-full || h-[20px] || bg-gray-200 || animate-pulse"></div>
        <div className="w-full || h-[20px] || bg-gray-200 || animate-pulse"></div>
        <div className="w-full || h-[20px] || bg-gray-200 || animate-pulse"></div>
      </div>
    </div>
  )
}

export default SkeletonProductCard
