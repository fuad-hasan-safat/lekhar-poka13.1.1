
// import Procchod from "@/components/procchod/Procchod";
import Procchod from '../components/procchod/Procchod'
//import { ImageSlider } from "@/components/slider/MySlider";
import {ImageSlider} from '../components/slider/ImageSlider'


// export const metadata = {
//   title: "প্রচ্ছদ",
//   description: "লেখার পোকা",
// };
export default function Home() {

  return (
    <>
        <div className="lg:pt-[95px] md:pt-[90px] sm:pt-[85px] text-black">
       
        <ImageSlider/>
        <Procchod />
        </div>
        
    </>
  );
}
