import { getFilters } from "@/servers/rapiv1"
import { useEffect, useState } from "react"
import { BsLaptop } from "react-icons/bs"
import { FaSlidersH } from "react-icons/fa"


const AsideFilter = () => {
    const [filters, setFilters] = useState([])
    useEffect(()=>{
        const getFiltersResp = async ()=>{
            const filtersResp = await getFilters()
            if(filtersResp.status_code === 200){
                setFilters(filtersResp.data.filters)
            }
            
        }
        getFiltersResp()
    },[])
   console.log(filters)
  return (
    <>
    <div className="w-full bg-gray-100 rounded">
        <div className="px-6 py-4 border-b border-gray-300">
         <p className="flex justify-between items-center">
            <span className="font-semibold text-gray-700 uppercase">Filter</span>
            <span><FaSlidersH/></span>
        </p>
        </div>
        <div className="px-6 py-4">
            <p className="flex justify-between items-center">
                <span className="text-[15px] text-gray-600">Brand</span>
                <span className="text-blue-900"><BsLaptop /></span>
            </p>
            <ul className="mt-2">
         	{Array.isArray(filters.brands) && filters.brands.length > 0 ? (filters.brands.map((brand)=>{
                return(
                    <li key={brand.product_make} className="py-2">
                        <div className="flex item- gap-2 center justify-start">
                            <input className="w-[14px] h-[14px] mt-[3px] border-gray-300 " id={brand.product_make} type="checkbox" value="" />
                            <label className="leading-normal text-gray-500 text-[14px]" htmlFor={brand.product_make}> {brand.product_make} </label>
                        </div>
                   </li>
                )
            })):''}
            </ul>
        </div>
    </div>
    <div className="w-full bg-gray-100 rounded mt-4">
        <div className="px-6 py-4">
            <p className="flex justify-between items-center">
                <span className="text-[15px] text-gray-600">Processors</span>
                <span className="text-blue-900"><BsLaptop /></span>
            </p>
            <ul className="mt-2">
         	{Array.isArray(filters.processors) && filters.processors.length > 0 ? (filters.processors.map((processor)=>{
                return(
                    <li key={processor.processor} className="py-2">
                        <div className="flex item- gap-2 center justify-start">
                            <input className="w-[14px] h-[14px] mt-[3px] border-gray-300 " id={processor.processor} type="checkbox" value="" />
                            <label className="leading-normal text-gray-500 text-[14px]" htmlFor={processor.processor}> {processor.processor} </label>
                        </div>
                   </li>
                )
            })):''}
            </ul>
        </div>
    </div>
    </>
  )
}

export default AsideFilter
