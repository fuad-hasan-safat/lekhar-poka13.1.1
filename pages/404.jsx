import Image from "next/image";

export default function Custom404() {
    return <>
    <div className="banner-sec-wrap">
        <Image 
        className="py-[100px] relative XL:left-[40%] lg:left-[33%] md:left-[10%]"
        src={'/404.jpg'}
        width={600}
        height={400}
        alt="error"
        />
    </div>
    </>
  }