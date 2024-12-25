import Link from 'next/link'
import React from 'react'

const Breadcrumd = () => {
  return (
    <div className='flex items-center justify-start w-full h-40 bg-no-repeat bg-center  bg-cover' style={{backgroundImage: `url("/img/breadcrumb.jpg")`}}>
        <div className='container'>
            <ul className='flex justify-start items-center gap-4'>
                <li><Link href={'/'} className='text-white text-xl'>Home</Link></li>
                <li><Link href={'/product-list'} className='text-white text-xl'>Product-list</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Breadcrumd