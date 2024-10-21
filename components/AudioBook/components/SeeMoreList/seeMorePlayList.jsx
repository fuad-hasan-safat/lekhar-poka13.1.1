import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import AudioPlayListSingleItem from '../audioDetails/audioList/AudioPlayListSilgleItem';

export default function SeeMoreListPlayList({ audioPlaylist, playListScope }) {

    const [displayCount, setDisplayCount] = useState(6);
    const [loading, setLoading] = useState(false);
    const [inViewRef, inView] = useInView({
        triggerOnce: true,
        rootMargin: '0px 0px 200px 0px',
    });

    const [isLanded, setIsLanded] = useState(false);

    useEffect(() => {
        if (inView && !loading) {
            setLoading(true);
            setTimeout(() => {
                setDisplayCount((prevCount) => Math.min(prevCount + 10, audioPlaylist.length));
                setLoading(false);
            }, 100);
        }
    }, [inView, loading]);


    useEffect(() => {
        setIsLanded(true);
    }, []);

    if (!isLanded) return null;

    return (
        <>
            {audioPlaylist?.length ?
                <>
                    <div>
                        {audioPlaylist.slice(0, displayCount).map((songInfo, index) => {
                            // console.log('See more playlist ', songInfo)
                            if (songInfo?.title === 'Not Found') return;
                            return (
                                <div key={index} className='audio__tab__wrap'>
                                    <AudioPlayListSingleItem songInfo={songInfo} audioIndex={index} audioList={audioPlaylist} playListScope={playListScope} />
                                </div>
                            )
                        }
                        )}
                        {loading && <p></p>}
                        <div ref={inViewRef} />
                    </div>
                </> :
                <div>
                    <p className='text-black mb-[20px]'>আপনার কোন অডিও প্লেলিস্টে নাই!</p>
                </div>
            }

        </>
    );
};

