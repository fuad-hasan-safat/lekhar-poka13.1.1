import { useRouter } from "next/router";
import { forwardRef, useContext } from "react"
import { UserContext } from "../../lekharpokaStore/user-context";
import useTabSyncAuth from "../../../utils/useReloadUrl";
import { AudioPlayListContext } from "../../store/audioPlayer-context";
const DialugueModal = forwardRef(function DialugueModal({ alert, address, type }, ref) {

    const { triggerLogout } = useTabSyncAuth();

    const { setUser } = useContext(UserContext);
    const {resetAudioPlayer} = useContext(AudioPlayListContext);

    const router = useRouter();
    function logout() {
        localStorage.removeItem("status");
        localStorage.removeItem("name");
        localStorage.removeItem("uuid");
        localStorage.removeItem("phone");
        localStorage.removeItem("token");
        localStorage.removeItem("usertype");
        localStorage.removeItem("email");

        const user = {
            userName: '',
            userUuid: '',
            userImage: '',
            userToken: '',
            userType: '',
            isLoggedIn: false,
            isloggedOut: true,
        }
        resetAudioPlayer();
        setUser(user);
        triggerLogout();
        ref.current.close();
        router.push(address)
    }

    function handleClick() {
        if (type === 'logout') {
            logout();
        } else if (type === 'delete') {
            address();
        }
    }

    return (
        <dialog ref={ref} className="result-modal">
            <h2>{alert}</h2>


            <button onClick={() => ref.current.close()} className="bg-red-300">না</button>
            <button onClick={handleClick} className="ml-[15px]">হ্যাঁ</button>

        </dialog>
    )
})

export default DialugueModal