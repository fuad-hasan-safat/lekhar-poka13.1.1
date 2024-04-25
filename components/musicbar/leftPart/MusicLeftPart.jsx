import { useState } from "react";
// import { MusicLeftPartProps } from "../audioplayer/type";
import Volumebar from "./volumebar";

export default function MusicleftPart({
  muteSound,
  handleVolumeChange,
}) {
  const [isMute, setIsMute] = useState(false);

  function handleMute() {
    muteSound();
    setIsMute(!isMute);
  }

  return (
    <div className="flex flex-row  space-x-5 mt-[70px]">
      {/* fav icon */}
      <button className="">
        <img src="/images/icons/ic_fav.svg"></img>
      </button>

      {/* volume icon */}
      <button onClick={handleMute}>
        {isMute ? (
          <img
            width={30}
            height={30}
            src="/images/icons/ic_volumeoff.svg"
          ></img>
        ) : (
          <img width={30} height={30} src="/images/icons/ic_volumeon.svg"></img>
        )}
      </button>
      {/* volume bar */}
      <div>
        <Volumebar handleVolumeChange={handleVolumeChange} />
      </div>
      {/*   notes */}
      <button>
        <img src="/images/icons/ic_songlist.svg"></img>
      </button>
    </div>
  );
}
