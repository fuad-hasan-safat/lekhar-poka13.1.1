import { readFile } from './cropImage';
import { useImageCropContext } from './ImageCropProvider';
import Button from './Button';
import Cropper from './Cropper';
import { RotationSlider, ZoomSlider } from './Sliders';

const ImageCropModalContent = ({ handleDone, handleClose }) => {
  const { setImage } = useImageCropContext();

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
  };

  return (
    <div className="text-center relative">
      <h5 className="text-gray-800 mb-4">ছবি সম্পাদনা করুন </h5>
      <div className="border border-dashed border-gray-200 p-6 rounded-lg">
        <div className="flex justify-center">
          <div className="crop-container  mb-4">
            <Cropper />
          </div>
        </div>
        {/* <ZoomSlider className="mb-4" />
        <RotationSlider className="mb-4" /> */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <Button variant="light" className="shadow w-full mb-4 hover:shadow-lg">
          <label htmlFor="avatarInput">অন্য ছবি আপলোড করুন</label>
        </Button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleClose}>
            বাতিল
          </Button>
          <Button variant="primary" className="w-full" onClick={handleDone}>
            সংরক্ষণ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropModalContent;