import { FaGift, FaGlobe, FaTrophy } from "react-icons/fa";
import { RiMessage2Line } from "react-icons/ri";


const Support = () => {
  return (
    <div className='container py-24 supportHome'>
        <ul className='flex justify-around items-center'>
            <li className='flex-shrink-0 flex justify-center items-center gap-2 font-semibold text-gray-800 text-[15px] uppercase'>
                <FaGlobe className="text-2xl text-rose-600 svgIcons transition-transform duration-1000"/> <span>Free fast deliver</span>
            </li>
            <li className='flex-shrink-0 flex justify-center items-center gap-2 font-semibold text-gray-800 text-[15px] uppercase'>
                <RiMessage2Line className="text-2xl text-rose-600 svgIcons transition-transform duration-1000"/><span>24 X 7 supports</span>
            </li>
            <li className='flex-shrink-0 flex justify-center items-center gap-2 font-semibold text-gray-800 text-[15px] uppercase'>
                <FaTrophy className="text-2xl text-rose-600 svgIcons transition-transform duration-1000"/><span>Best quality</span>
            </li>
            <li className='flex-shrink-0 flex justify-center items-center gap-2 font-semibold text-gray-800 text-[15px] uppercase'>
                <FaGift className="text-2xl text-rose-600 svgIcons transition-transform duration-1000"/><span>Gift voucher</span>
            </li>
        </ul>
    </div>
  )
}

export default Support