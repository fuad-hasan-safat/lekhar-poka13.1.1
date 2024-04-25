import { Slider } from "@material-tailwind/react";


// type ProgressBarProps = {
//     progress: number;
//     onChange: (value: number) => void;
//     leftLabel: string;
//     rightLabel: string;
// };

const Progressbar = ({
    progress,
    onChange,
    leftLabel,
    rightLabel,
}) => {
    return (
        <div className="flex flex-row space-x-4 justify-center items-center ">
            <span className="text-xs text-black font-semibold">{leftLabel}</span>
            <input
                type="range"
                min='1'
                max='100'
                value={progress}
                step={0.25}
                className="slider appearance-none bg-transparent [&::-webkit-slider-runnable-track]:h-1 w-[400px] [&::-webkit-slider-runnable-track]:bg-white [&::-webkit-slider-runnable-track]:text-yellow-400 "
                height={2}
                onChange={(event) => {
                    onChange(parseInt(event?.target.value))
                }}
            />

            <span className="text-xs text-black font-semibold">{rightLabel}</span>
        </div>

    )
}

export default Progressbar;