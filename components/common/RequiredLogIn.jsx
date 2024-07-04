import Link from 'next/link'

export default function RequiredLogin() {
    return (

        <section>
            <div className='container grid h-screen justify-items-center items-center'>

                <div className='w-full text-center text-black font-bold text-4xl  '>

                    <h2>অনুগ্রহ করে লগইন করুন</h2>
                    
                    <Link href="/account/login"><span className='text-blue-600'>লগইন পৃষ্ঠায় যান</span></Link>

                </div>
                
            </div>
        </section>

    )
}