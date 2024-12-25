
import { checkPincodeServiceability } from "@/servers/rapiv1";
import {useEffect, useRef, useState} from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const PincodeCheck = ({pincodeCheckCallback}) => {

    const [status, setStatus] = useState('')
    const pinRef = useRef()

    useEffect(() => {
        let delivery_pincode = localStorage.getItem('delivery_pincode')
        if(delivery_pincode){
            pinRef.current.value = delivery_pincode
            pincodeCheckCallback(true)
            setStatus("serviceable")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    })

    const checkPincode = async () => {
        let pincode = pinRef.current.value
        if(pincode.length==6){
            const pincode_result = await checkPincodeServiceability(pincode)
            console.log(pincode_result)
            if(pincode_result.status_code == 200){
                if(pincode_result.message=='pincode_servicable'){
                    pincodeCheckCallback(true)
                    setStatus('serviceable')
                    localStorage.setItem("delivery_pincode", pincode)
                }else{
                    pincodeCheckCallback(false)
                    setStatus('Pincode is not serviceable')
                    localStorage.removeItem("delivery_pincode")
                }
            }else{
                pincodeCheckCallback(false)
                setStatus("Some error occurred")
                localStorage.removeItem("delivery_pincode")
            }
        }else{
            pincodeCheckCallback(false)
            setStatus("")
            localStorage.removeItem("delivery_pincode")
        }
    }

    return (
         <div className='pincode relative w-full'> 
        <input type="text" required id="pincode"  onInput={checkPincode} maxLength={6} ref={pinRef}  className="form-control"/>
         <div className='absolute top-1 right-1 w-12 h-9 bg-white flex justify-center items-center'>
            <FaMapMarkerAlt className='text-blue-700 text-2xl'/>
         </div>
        {status && status!='serviceable'?(<p className="text-red-600 text-[16px] font-semibold">{status}</p>):''}
        {status && status=='serviceable'?(<p className="text-green-600 text-[16px] font-semibold">Pincode is serviceable</p>):''}
    </div>)
}
export default PincodeCheck