//import ProcchodLeftContent from "@/components/procchodLeftContent/ProcchodLeftContent";
import ProcchodLeftContent from '../procchodLeftContent/ProcchodLeftContent'
// import Sidebar from "@/components/sidebar/Sidebar";
import Sidebar from '../sidebar/Sidebar'
export default function Procchod() {
  return (
    <section className="all__page__main__content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
             
              <div className="all__post__content flex flex-row pt-10">

                <div className="lg:w-[70%] lg:pr-10 md:pr-0 sm:pr-0 xs:pr-0">
                  <ProcchodLeftContent />
                </div>

                <div className="lg:w-[30%]">
                  <Sidebar />
                </div>
                
              </div>

            </div>
          </div>
        </div>
    </section>
  );
}
