import Breadcrumd from "@/components/breadcrumd";
import PincodeCheck from "@/components/pincodeCheck";
import { getCommonData, getLaptopDetails } from "@/servers/rapiv1";
import { withSessionSsr } from "@/servers/session";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FaRupeeSign, FaStar } from "react-icons/fa";
import { PiVanThin } from "react-icons/pi";
import { IoMdTime } from "react-icons/io";
import RelatedProducts from "@/components/relatedProducts";


const ProductList = ({ productDetails }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const [pincodeEnabled, setPincodeEnabled] = useState(false)
  const handleSmallImg = (e, i) => {
    setImgIndex(i);
  };
  const pincodeCheckCallback = (pincodeServiceable) => {
    setPincodeEnabled(pincodeServiceable)
}
// console.log(productDetails.related_items)
  return (
    <>
    <div className="container mt-4">
      <div className="flex justify-start gap-10">
        <div className="w-2/5  min-h-96  flex-shrink-0 relative">
          <div className=" bg-gray-100 p-4 rounded  border-gray-200 w-full border min-h-96">
            <Image
              src={productDetails.product.images[imgIndex]}
              sizes="30vw"
              className="img-fluid"
              width={450}
              height={300}
              priority
              alt="img"
              style={{ objectFit: "contain", mixBlendMode: "multiply " }}
            />
          </div>
          <div className="flex justify-start items-center gap-1 p-1 rounded-sm mt-2">
            {productDetails.product.images &&
            Array.isArray(productDetails.product.images)
              ? productDetails.product.images.map((image, index) => {
                  return (
                    <div
                      className="w-24  h-20 p-2 border rounded-sm cursor-pointer flex justify-center items-center"
                      key={index}
                      onClick={(e) => handleSmallImg(e, index)}
                    >
                      <Image
                        src={image}
                        width={100}
                        height={90}
                        className="img-fluid"
                        alt="small img"
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="w-full relative">
            <div className="flex justify-start items-center gap-10">
                <div className="flex gap-1 text-green-600">
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>
                <p className="text-sm text-gray-500">4 Reviews</p>
            </div>
            <p className="text-gray-800 mt-4 font-semibold">{productDetails.product.product_title}</p>
            <p className="text-gray-400 mt-2">{productDetails.product.processor}</p>
            <p className="text-gray-400 mt-2">{productDetails.product.hdd}</p>
            <p className="text-gray-400 mt-2">{productDetails.product.ram}</p>
            <p className="text-green-700 flex justify-start items-center font-bold gap-1 mt-2">
                <sapn className="text-[14px]"><FaRupeeSign/></sapn>
               <span className="text-[18px]">{productDetails.product.sell_price}.00 </span>
            </p>
            <div className="mt-2 w-1/2">
                <p className="text-gray-400 mb-2">Enter pincode to see product availablity</p>               
                <PincodeCheck  pincodeCheckCallback={pincodeCheckCallback}/>
            </div>
            <div className="mt-2 w-1/2 flex justify-between items-center">
                <p className="mt-1 flex justify-start items-center gap-4">
                <PiVanThin  className="text-blue-800 text-3xl"/> 
                <span className="text-gray-400">Free delivery</span>
            </p>
            <p className="mt-1 flex justify-start items-center gap-4">
                <IoMdTime  className="text-blue-800 text-2xl"/> 
                <span className="text-gray-400">3 Months Warranty</span>
            </p>
            </div>

            <div className="mt-8 flex gap-4">
                <button type="button" className="bg-teal-600 w-[250px] rounded py-3 px-10 text-white uppercase">Add to cart</button>
                <button type="button" className="bg-orange-700 w-[250px] rounded py-3 px-10 text-white uppercase">Buy Now</button> 
            </div>
 
        </div>
      </div>
    </div>
     <RelatedProducts relatedProduct={productDetails.related_items}/>
    </>
  );
};

export default ProductList;

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const { product_slug } = query;
    const product_sku_id = product_slug.split("-").pop();
    const data = [];
    const result = await getCommonData(req, data);
    if (result.success) {
      const models_res = await getLaptopDetails(product_sku_id);
      if (models_res.status_code === 200) {
        return {
          props: { productDetails: models_res.data },
        };
      }
    }
    return {
      props: {},
    };
  }
);
