
import { authActions } from '@/redux/auth/auth.reducer'
import { getAuthData } from '@/redux/auth/auth.selector'
import React, { useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoCloseSharp } from 'react-icons/io5'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'


const MobileOtp = () => {
    const dispatch = useDispatch()
    const [otp, setOtp] = useState('');
    const auth = useSelector(getAuthData)
    const handleSubmitOtp = () => {
        // put validations for otp
        const mobile_number = auth.userMobile
        if(props.verify_type == 'login'){
            dispatch(authActions.verifyLogin({mobile_number, otp}))
        }else{
            dispatch(authActions.verifySignup({mobile_number, otp}))
        }

    }
  return (
    <div className={`w-screen h-full bottom-0 bg-black/40 z-20 overflow-hidden left-0 right-0`}>
    <div className={`login absolute right-0 w-[375px] bg-white h-full top-0 bg-center bg-cover bg-no-repeat py-4`} style={{backgroundImage:"url('/img/login_bg.png')"}}>
         
        <div className="border border-gray-300 text-gray-900  rounded w-10 h-10 text-2xl flex justify-center items-center cursor-pointer mb-10 hover:bg-rose-600 transition-all duration-700 hover:text-white ml-4" onClick={()=>dispatch(authActions.closeSidebar())}>
          <IoCloseSharp />
        </div>
        
        <h4 className='text-2xl uppercase font-bold text-black/30 pl-6 pb-2'>OTP </h4>
         <div className="flex justify-center items-center text-teal-700 text-3xl pt-5 pb-1" >
              <FaRegUserCircle className="bg-white"/>
          </div>
        <div className="p-6 border border-r-0 border-l-0">
            <p htmlFor="mobile" className="text-gray-800 block mb-4 text-[15px]">Enter OTP</p>
            <p className='text-gray-500 block mb-6 text-[15px]'>We’ve sent an OTP on <span className='text-gray-900 tracking-wider font-semibold'>9625785318</span> </p>
            <div className='otpInput'>
            <OTPInput value={''}
                       onChange={'setOtp'}
                      numInputs={4}
                      renderInput={(props) => <input  {...props} required/>}/>
            
            </div>
            <p className='text-[14px] text-teal-700 font-semibold mt-1'>Resend OTP</p>
            <div className="">
                <button type="button" className="bg-teal-600 transition-all duration-500 hover:bg-teal-700 py-3 px-6 w-full text-white uppercase rounded mt-6"  onClick={handleSubmitOtp} >Continue</button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default MobileOtp