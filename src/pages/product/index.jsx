import Breadcrumd from "@/components/breadcrumd";
import { createSlug, getCommonData, getProductsList } from "@/servers/rapiv1";
import { withSessionSsr } from "@/servers/session";
import Image from "next/image";
import { FaRupeeSign, FaSlidersH, FaStar } from "react-icons/fa";
import { BsCart2, BsEye, BsLaptop } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import AsideFilter from "@/components/asideFilter";
import Link from "next/link";

const ProductList = (props) => {
  const { products } = props;
 //  console.log(products)
  return (
    <>
      <Breadcrumd />
      <div className="container pt-16">
        <div className="flex justify-start items-start gap-8">
          <div className="w-[400px]">
            <AsideFilter />
          </div>
          <div className="w-full">
            <h1 className="text-xl font-semibold">Product </h1>
            <div className="mt-4 grid grid-cols-3 gap-8">
              {Array.isArray(products.models) &&
                products.models.map((el) => {
                  return (
                    <div className="product-img" key={el.product_sku_id}>                       
                        <Link href={`/product/${createSlug(el.product_title,el.product_sku_id)}`}>
                      <div className="relative p-4 bg-gray-100 h-[300px]">
                        <div className="w-[340px] h-[200px] relative">
                          <Image
                            src={el.product_icon}
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
                      </div>
                       </Link>
                      <div className="flex justify-center items-center gap-2 my-4">
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                        <FaStar className="text-gray-200" />
                      </div>
                      <div className="flex justify-center items-center flex-col gap-2">
                        <p className="text-[16px] text-gray-600 text-wrap overflow-hidden text-ellipsis">
                          {el.product_title.split("|")[0]}
                        </p>
                        <p className="text-xl font-semibold flex justify-center items-center">
                          <FaRupeeSign className="text-[15px]" />{" "}
                          {el.sell_price}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const data = [];
    const result = await getCommonData(req, data);
    const { page, search } = query;
    const make_id = query["make_id[]"];
    const processors = query["processors[]"];
    if (result.success) {
      let limit = 20;
      let offset = 0;
      if (page != undefined) {
        offset = (parseInt(page) - 1) * limit;
      }
      const product_res = await getProductsList(
        search,
        make_id,
        processors,
        offset,
        limit
      );
      // console.log(product_res.data, 'pro')
      return {
        props: { products: product_res.data },
      };
    }
    return {
      props: {},
    };
  }
);

export default ProductList;
