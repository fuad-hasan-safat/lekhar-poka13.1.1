
'use client';

import { useEffect } from 'react';
import ImageButton from './Imagebutton';

// type ControlsProps = {
//     onPlayClick: () => void;
//     onPrevClick: () => void;
//     onNextClick: () => void;
//     onRepeatClick: () => void;
//     onShuffleClick: () => void;
//     isPlaying: boolean;
//     repeat: boolean;
//     shuffle: boolean;
//     currentTrackDuration: number | null;
//     currentTrackPlaybackPosition: number | null;
// };

const Controls = ({onPlayClick, onPrevClick, onNextClick, onRepeatClick, onShuffleClick ,isPlaying, repeat, shuffle, currentTrackDuration, currentTrackPlaybackPosition}) => {

    const playButtonIcon = '/images/icons/play-svgrepo-com.svg';
    const nextButtonIcon  = '/images/icons/ic_next.svg';
    const prevButtonIcon  = '/images/icons/ic_prev.svg';
    const shuffleButtonIcon  = '/images/icons/ic_shuffle.svg';
    const repeatButtonIcon  = '/images/icons/ic_repeat.svg';
    const shuffleButtonDisabledIcon  = '/images/icons/ic_shuffle_disabled.svg';
    const pauseButtonIcon  = '/images/icons/ic_pause.svg';
    const repeatButtonDisabledIcon  = '/images/icons/ic_repeat_disabled.svg';


    const tt = false;

  

    return (
        <div className="flex flex-row mt-4 space-x-6">
            <ImageButton src={shuffle?shuffleButtonIcon:shuffleButtonDisabledIcon} onClick={onShuffleClick} />
            <ImageButton src={prevButtonIcon}  onClick={onPrevClick}  />
            <ImageButton src={isPlaying?pauseButtonIcon: playButtonIcon} className='h-[50px] w-[50px]' onClick={onPlayClick} />
            <ImageButton src={nextButtonIcon}  onClick={onNextClick} />
            <ImageButton src={repeat?repeatButtonIcon:repeatButtonDisabledIcon} onClick={onRepeatClick} />
        </div>
    );
};

export default Controls;

