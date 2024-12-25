import { createSlug } from '@/servers/rapiv1'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsCart2, BsEye } from 'react-icons/bs'
import { FaRupeeSign, FaStar } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'

const RelatedProducts = ({relatedProduct}) => {
  return (
    <div className='container mt-4'>
        <h4 className='text-2xl font-semibold text-center text-gray-700'> Related Products</h4>
       <div className="grid grid-cols-4 gap-8 mt-8">
          {Array.isArray(relatedProduct) && relatedProduct.map((product, index)=>{
            return(
            <div className="product-img" key={index}>
                <div className="relative p-4 bg-gray-100 h-[300px] mb-28">
                 <Link href={`/product/${createSlug(product.product_title,product.product_sku_id)}`}>
                     <div className="w-[295px] h-[250px] relative">
                        <Image
                            src={product.product_icon}
                            sizes="30vw"
                            fill
                            style={{
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                            }}
                            className="img-fluid"
                            alt="img"
                            priority
                        />
                    </div>
                    <div className="flex justify-center items-center gap-4 caption_product">
                            <span className="bg-sky-600 h-10 w-10 rounded-full flex justify-center items-center">
                            <BsCart2 className="text-white text-xl" />
                            </span>
                            <span className="bg-sky-600 h-10 w-10 rounded-full flex justify-center items-center">
                            <BsEye className="text-white text-xl" />
                            </span>
                            <span className="bg-sky-600 h-10 w-10 rounded-full flex justify-center items-center">
                            <FiHeart className="text-white text-xl" />
                            </span>
                     </div>
                    </Link>
                     <div className="flex justify-center items-center gap-2 mb-4 mt-12">
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                    </div>
                     <div className="flex justify-center items-center flex-col gap-2">
                        <p className="text-[16px] text-gray-600 text-wrap overflow-hidden text-ellipsis">
                            {product.product_title.split("|")[0]}
                        </p>
                        <p className="text-xl font-semibold flex justify-center items-center">
                            <FaRupeeSign className="text-[15px]" />{" "}
                            {product.sell_price}
                        </p>
                   </div>
                </div>
             </div>  
            )
            })}
        </div>
    </div>
  )
}

export default RelatedProducts