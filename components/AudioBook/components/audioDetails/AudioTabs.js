'use client'

import React, { useContext, useEffect, useState } from 'react';
import TechnicalDetails from './technicalDetails';
import Summary from './Summary';
import CommentsOfWriter from './CommentsOfWriter';
import Rating from './Rating';
import AudioTabComponent from './AudioTabComponent';
import AudioPlayer from '../../AudioPlayer/AudioPlayer';
import { singleAudioData } from '../sampleData/singleAudioDetailsPage';

const AudioTabs = ({singleAudioData}) => {

  const [ToggleState, setToggleState] = useState(1);
  
  const toggleTab = (index) => {
    setToggleState(index);

  };

  const getActiveClass = (index, className) =>
    ToggleState === index ? className : "";




 

  return (
    <>

      <div className="audio__tabs__wrap">
        <ul className="tab-list">
          <li
            className={`tabs ${getActiveClass(1, "active-tabs")}`}
            onClick={() => {toggleTab(1);}}
          >
            অডিও
          </li>
          <li
            className={`tabs ${getActiveClass(2, "active-tabs")}`}
            onClick={() => toggleTab(2)}
          >
            সারসংক্ষেপ
          </li>
          <li
            className={`tabs ${getActiveClass(3, "active-tabs")}`}
            onClick={() => toggleTab(3)}>
            কলাকুশলী
          </li>
          <li
            className={`tabs ${getActiveClass(4, "active-tabs")}`}
            onClick={() => toggleTab(4)}>
            লেখকের বক্তব্য
          </li>
          <li
            className={`tabs ${getActiveClass(5, "active-tabs")}`}
            onClick={() => toggleTab(5)}>
            রেটিং
          </li>
        </ul>
        <div className="audio__tab__content">

          <div className={`content ${getActiveClass(ToggleState, "active-content")}`}>
            {ToggleState === 1 && <AudioTabComponent audioData={singleAudioData.audio}/>}
            {ToggleState === 2 && <Summary summary={singleAudioData?.summary} />}
            {ToggleState === 3 && <TechnicalDetails technicalDetails={singleAudioData?.technical_team} />}
            {ToggleState === 4 && <CommentsOfWriter commentsOfWriter={singleAudioData?.comment_of_writer} />}
            {ToggleState === 5 && <Rating singleAudioData={singleAudioData} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AudioTabs;