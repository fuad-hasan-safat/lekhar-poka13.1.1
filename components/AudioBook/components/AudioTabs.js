import React,{useState} from 'react';

const AudioTabs = () => {

    const [ToggleState, setToggleState] = useState(1);

    const toggleTab = (index) => {
      setToggleState(index);
    };
  
    const getActiveClass = (index, className) =>
      ToggleState === index ? className : "";

    return (
        <div className="audio__tabs__wrap">
         <ul className="tab-list">
          <li
            className={`tabs ${getActiveClass(1, "active-tabs")}`}
            onClick={() => toggleTab(1)}
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
          <div className={`content ${getActiveClass(1, "active-content")}`}>
            <h2>Lorem</h2>
          </div>
          <div className={`content ${getActiveClass(2, "active-content")}`}>
            <h2>Ipsum</h2>
          </div>
          <div className={`content ${getActiveClass(3, "active-content")}`}>
            <h2>Dolor</h2>
          </div>
        </div>
      </div>
    );
};

export default AudioTabs;