import Image from "next/image";
import PostPageLeftContent from "./PostPageLeftContent";
import Sidebar from "../../sidebar/Sidebar";
import { useSelector } from "react-redux";


export default function PostPage() {
    const catTitle = useSelector(state => state.category.selectedNavbarCategory);

    return (
        <>
            <section className="banner-sec-wrap">

                <div className="banner__bg__wrap relative w-full xl:h-[380px] lg:h-[380px] md:h-[360px] sm:h-[280px] xs:h-[250px]  overflow-hidden" style={{ background: `url('/images/pages-banner-svg/baseBanner.png')center center / cover no-repeat` }}>
                    <h2 className=" absolute top-[50%] left-[50%] text-[40px] text-[#F9A106] -translate-x-[50%] -translate-y-[50%] max-h-[0px]">{catTitle}</h2>
                </div>
                
            </section>

            <section className="all__page__main__content">

                <div className="container">

                    <div className="all__post__content flex flex-row">

                        <div className="lg:w-[70%]">
                            <PostPageLeftContent />
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