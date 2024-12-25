import Header from './header'
import Footer from './footer'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const Layout = ({children}) => {
  return (
    <main className={inter.className}>
     <Header/>
        {children}
     <Footer/>
    </main>
  )
}

export default Layout