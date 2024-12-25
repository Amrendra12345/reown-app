import Link from 'next/link'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'

const SignUp = () => {
  return (
    <div className={`w-screen h-full bottom-0 bg-black/40 z-20 overflow-hidden left-0 right-0`}>
        <div className={`login absolute right-0 w-[375px] bg-white h-full top-0 bg-center bg-cover bg-no-repeat py-4`} style={{backgroundImage:"url('/img/login_bg.png')"}}>
             
            <div className="border border-gray-300 text-gray-900  rounded w-10 h-10 text-2xl flex justify-center items-center cursor-pointer mb-10 hover:bg-rose-600 transition-all duration-700 hover:text-white ml-4">
              <IoCloseSharp />
            </div>
            
            <h4 className='text-2xl uppercase font-bold text-black/30 pl-6 pb-2'>Sign up</h4>
             <div className="flex justify-center items-center text-teal-700 text-3xl pt-5 pb-1" >
                  <FaRegUserCircle className="bg-white"/>
              </div>
            <div className="p-6 border border-r-0 border-l-0">
                <label htmlFor="mobile" className="text-gray-800 block mb-6 text-[15px]">Please enter your details.</label>
                <input type="text" className="form-control"id="mobile"  placeholder="Your Name"/>
                <input type="text" className="form-control"id="mobile"  placeholder="Your email address"/>
                <input type="text" className="form-control"id="mobile"  placeholder="Mobile number"/>
                <div className="flex items-center gap-2 mt-2">
                    <input type="radio" name="gender" id="male" className="border border-gray-400 w-4 h-4"/>
                    <label htmlFor="male" className="text-gray-500 text-[15px]">Male</label>
                    <input type="radio" name="gender" id="female" className="border border-gray-400 w-4 h-4"/>
                    <label htmlFor="female" className="text-gray-500 text-[15px]">Female</label>
                </div>
               
                <div className="">
                    <button type="button" className="bg-teal-600 transition-all duration-500 hover:bg-teal-700 py-3 px-6 w-full text-white uppercase rounded mt-6" >Register</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SignUp