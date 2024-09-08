import Link from "next/link";
import { categoryActions } from "../redux/category-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const FooterLink = ({ title, links }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    function handleLink(title){
        dispatch(categoryActions.selectNavbarCategory(title))
        router.push(`/category/${title}`)
    }
    return (

        <div>

            <div className="text-xl  pb-4">
                {title}
            </div>

            <div className="pb-2 ">

                <ul className="m-1 space-y-4">

                    {links.map((link, index) => (

                        <li key={index}>

                            {link.type === 'catLink' ?
                             <button onClick={()=>handleLink(link.label)}>
                                {link.label}
                            </button> : 
                            <Link href={link.url}>
                            {link.label}
                        </Link>
                            }

                        </li>

                    ))}

                </ul>

            </div>

        </div>

    )
}

export default FooterLink;