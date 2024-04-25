import Image from "next/image";
import Sidebar from "../sidebar/Sidebar";
import SobProbondhoLeftContent from "./sobProbondhoLeftContent";


export default function SobProbondho() {
    return (
        <>
            <section className="all__post__sec__wrap">
                <div>
                    <Image
                        src={'/images/pages-banner-svg/probondho.png'}
                        height={380}
                        width={1920}
                        alt={"kobita banner"}
                    />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12"></div>
                        <div className="flex flex-col">

                            <div className="all__post__content flex flex-row">
                                <div className="w-[70%]">
                                    <SobProbondhoLeftContent />
                                </div>
                                <div className="w-[30%]">
                                    <Sidebar />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
        </section >


        </>
    );
}