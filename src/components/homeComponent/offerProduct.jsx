import Image from 'next/image'
const OfferProucts = () => {
    return (
        <section className='offser'>
            <div className='container'>
                <div className='grid grid-cols-4 gap-14 w-full'>
                    <div className='img-thumani'>
                        <Image src={'/img/laptop-adv3.jpg'} alt='laptop ads2'sizes="100vw"width={300} height={300}  />
                    </div>
                    <div className='img-thumani'>
                         <Image src={'/img/laptop-adv2.jpg'} alt='laptop ads'sizes="100vw"width={300} height={300} />
                    </div>
                    <div className='img-thumani'>
                         <Image src={'/img/laptop-adv.jpg'} alt='laptop ads2'sizes="100vw"width={300} height={300} />
                    </div>
                    <div className='img-thumani'>
                         <Image src={'/img/laptop-adv1.jpg'} alt='laptop ads2'sizes="100vw"width={300} height={300} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OfferProucts