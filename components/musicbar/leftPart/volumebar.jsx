import { ChangeEventHandler } from "react";
// import { VolumebarProps } from "../audioplayer/type";

const Volumebar = ({ handleVolumeChange }) => {
  return (
    <>
      <button>
        <input
          type="range"
          min="0"
          max="1"
          id="volume"
          step={0.05}
          width={100}
          defaultValue={0.5}
          className="sound appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-[4px] w-[100px] [&::-webkit-slider-runnable-track]:white "
          onChange={handleVolumeChange}
        />
      </button>
    </>
  );
};

export default Volumebar;
