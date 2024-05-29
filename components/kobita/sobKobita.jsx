import Image from "next/image";
import Sidebar from "../sidebar/Sidebar";
import SobKobitaLeftContent from "./sobKobitaLeftContent";

export default function SobKobita() {

    return (
        <>
            <section className="banner-sec-wrap">

                <div className="relative w-full xl:h-[380px] lg:h-[360px] md:h-[340px] sm:h-[280px] xs:h-[260px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">কবিতা</h2>
                </div>
                
            </section>

            <section className="all__page__main__content">

                <div className="container">

                    <div className="all__post__content flex flex-row">

                        <div className="lg:w-[70%]">
                            <SobKobitaLeftContent />
                        </div>

                        <div className="lg:w-[30%]">
                            <Sidebar />
                        </div>

                    </div>
                </div>

            </section>

        </>
    );
}