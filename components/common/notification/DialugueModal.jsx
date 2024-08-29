import { useRouter } from "next/router";
import { forwardRef, useContext } from "react"
import { UserContext } from "../../lekharpokaStore/user-context";
import useTabSyncAuth from "../../../utils/useReloadUrl";
import { useDispatch } from "react-redux";
import { userSessionAction } from "../../redux/usersession-slice";
import { audioPlayerAction } from "../../redux/audioplayer-slice";
import { userPostAction } from "../../redux/userpost-slice";
import { playlistAction } from "../../redux/playlist-slice";
const DialugueModal = forwardRef(function DialugueModal({ alert, address, type }, ref) {

    const { triggerLogout } = useTabSyncAuth();
    const dispatch = useDispatch();
    const { setUser } = useContext(UserContext);

    const router = useRouter();
    function logout() {
        dispatch(playlistAction.removePlayList());
        dispatch(userPostAction.removePost());
        dispatch(audioPlayerAction.resetAudioPlayer());
        dispatch(userSessionAction.removeUser());

        const user = {
            userName: '',
            userUuid: '',
            userImage: '',
            userToken: '',
            userType: '',
            isLoggedIn: false,
            isloggedOut: true,
        }
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