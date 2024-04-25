
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
        <div className="">
       
        <ImageSlider/>
        <Procchod />
        </div>
        
    </>
  );
}
