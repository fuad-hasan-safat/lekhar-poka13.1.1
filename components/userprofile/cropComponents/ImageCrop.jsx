import { useEffect, useState } from 'react';

import Modal from './Modal';
import { readFile } from './cropImage';
import ImageCropModalContent from './ImageCropModalContent';
import { useImageCropContext } from './ImageCropProvider';
import { apiBasePath } from '../../../utils/constant';
import { useRouter } from 'next/router';

const ImageCrop = ({ image, type = "profilePic", setWriterImage}) => {
    const router = useRouter();
    console.log({ image })

    const [username, setUsername] = useState("");
    const [userUuid, setUserUuid] = useState("");
    const [userToken, setUserToken] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [preview, setPreview] = useState(image);

    const { getProcessedImage, setImage, resetStates } = useImageCropContext();

    useEffect(() => {
        setUsername(localStorage.getItem("name") || "");
        setUserToken(localStorage.getItem("token") || "");
        setUserUuid(localStorage.getItem("uuid") || "");

    }, [])
    useEffect(()=>{
        setPreview(image)


    },[image.length])

    const handleDone = async () => {
        const avatar = await getProcessedImage();
        setPreview(window.URL.createObjectURL(avatar));
        resetStates();
        setOpenModal(false);

        //  sent data to backend 

        if (type === "createWriter") {
            setWriterImage(avatar)

        } else {

            console.log(' call in profile image crop                    CROP     VROP')

            const formData = new FormData();
            formData.append('file', avatar);
            formData.append('user_id', localStorage.getItem("uuid"));

            try {
                const response = await fetch(`${apiBasePath}/profile-pic`, {
                    method: 'PUT',
                    headers: {
                        // 'x-access-token': token,
                    },
                    body: formData
                });
                // setIsProfileUpdated(true)

                // console.log('------>>>> PROFILE PICCCCCCCC RESPONSE <<<<<<--------', response)

                if (response.ok) {
                    const data = await response.json();
                    alert('প্রোফাইল সফলভাবে আপডেট হয়েছে')




                } else {
                    console.error('Failed to update profile:', response.statusText);
                }
                router.reload()
            } catch (error) {
                console.error('Error updating profile:', error);
            }

        }



    };

    const handleFileChange = async ({ target: { files } }) => {
        const file = files && files[0];
        const imageDataUrl = await readFile(file);
        setImage(imageDataUrl);
        setOpenModal(true);
    };

    return (
        <div className="-mt-[110px]">
            <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="avatarInput"
                accept="image/*"
            />
            <label htmlFor="avatarInput" className="cursor-pointer">
                <img
                    src={preview}
                    height={192}
                    width={192}
                    className="object-cover rounded-full h-48 w-48"
                    alt={preview}
                />
                <div onClick={handleFileChange} className='button -mt-[53px]'><i className='ri-camera-line'></i></div>

            </label>

            <Modal open={openModal} handleClose={() => setOpenModal(false)}>
                <ImageCropModalContent handleDone={handleDone} handleClose={() => setOpenModal(false)} />
            </Modal>
        </div>
    );
};

export default ImageCrop;