import Divider from "../common/sidebardivider"
import Jonopriyo from "./jonopriyo/Jonopriyo"
import Lekhok from "./lekhok/Lekhok"
import Login from "./login-sidebar/Login"
import Samprotik from "./samprotik/Samprotik"
import Somosamoyik from "./somosamoyik/Somosamoyik"
export default function Sidebar() {

    return (
        <div>
            <div className="bg-white rounded  pt-12">
                <div className="sidebar__wrap shadow-md px-10 mb-[40px]">
                
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
                {/* <h1 className="text-3xl">This is Sidebar</h1> */}

            </div>
        </div>
    )
}