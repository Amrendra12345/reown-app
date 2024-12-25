import Image from 'next/image'
import Link from 'next/link'
import Login from './authComponent/login'
import MobileOtp from './authComponent/mobileOtp'
import SignUp from './authComponent/signUp'
import { getAuthData } from '@/redux/auth/auth.selector'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '@/redux/auth/auth.reducer'



const Header = () => {
    const auth = useSelector(getAuthData);
    const dispatch = useDispatch()

    const displayLoginSidebar = () => {
        console.log(auth.openedLoginSidebar ,'jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj')
		switch (auth.openedLoginSidebar){            
			case 'login': return <Login></Login>
			case 'signup': return <SignUp></SignUp>
			case 'verifyLogin': return <MobileOtp verify_type="login"></MobileOtp>
			case 'verifySignup': return <MobileOtp verify_type="signup"></MobileOtp>
			default : return <></>
		}
	}
  return (
    <>
    <header className='py-1'>
        <div className='container'>
            <nav className='flex justify-between items-center'>
                <Link href={'/'}>
                   <Image src={'/img/reown_logo_sample.png'} className='img-fluid' width={260} height={40} alt="reown-logo" priority style={{width:"85%"}} />
                </Link>
                <ul className='flex justify-end gap-4 items-center'>
                    <li className='bg-teal-600 cursor-pointer hover:bg-teal-700 transition-all delay-300 rounded py-[6px] px-4 uppercase text-white'
                    onClick={()=>dispatch(authActions.openSidebar('login'))}
                    >Login</li>
                </ul>
            </nav>
        </div>
    </header>
    {
        displayLoginSidebar()
    }
     
    </>
  )
}

export default Header