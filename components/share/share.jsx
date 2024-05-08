import { FacebookShareButton } from "react-share";
import { FaFacebook } from "react-icons/fa";

const ShareOnFacebook = ({ url, title, description, image }) => {
  return (
    <FacebookShareButton url={url} quote={title} hashtag="#YourHashtag">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
        <FaFacebook className="mr-2" />
        Share on Facebook
      </button>
    </FacebookShareButton>
  );
};

export default ShareOnFacebook;
