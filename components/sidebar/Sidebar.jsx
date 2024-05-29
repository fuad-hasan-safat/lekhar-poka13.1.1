import Divider from "../common/sidebardivider"
import Jonopriyo from "./jonopriyo/Jonopriyo"
import Lekhok from "./lekhok/Lekhok"
import Login from "./login-sidebar/Login"
import Samprotik from "./samprotik/Samprotik"
import Somosamoyik from "./somosamoyik/Somosamoyik"


export default function Sidebar() {

    return (
        <div>
            <div className="bg-white rounded ">
                <div className=" shadow-md lg:px-10 md:px-8 sm:px-6 xs:px-5 mb-[40px]">
                   
                    <div className="">
                        <Login />
                    </div>

                    <div>
                        <Somosamoyik />
                    </div>
                    <Divider />
                    <div>
                        <Samprotik />
                    </div>
                    <Divider />
                    <div>
                        <Jonopriyo />
                    </div>
                    <Divider />
                    <div>
                        <Lekhok />
                    </div>
                </div>
            </div>
        </div>
    )
}