'use client';

import Image from "next/image";

  // type ImageButtonProps = {
  //   src: string;
  //   onClick: () => void;
  //   className?: string;
  // };
  
  const ImageButton = ({ onClick, src, className }) => {
    const buttonSize = 20;
    return (
      <button onClick={onClick}>
        <Image
          src={src}
          width={buttonSize}
          height={buttonSize}
          alt=" "
          className={`drop-shadow-lg ${className ?? ''}`}
        />
      </button>
    );
  };

  export default ImageButton;