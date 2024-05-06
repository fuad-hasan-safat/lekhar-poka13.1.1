
import React from 'react';


const ContentList = ({ content, onOpenModal, setIsTitleClick, isSlider= false }) => {



  return (
    <ul>
      {content?.map((item) => (
        <li key={item._id}>
          {!isSlider  && ( <button onClick={() => {onOpenModal(item); setIsTitleClick(true)}}>{item.title}</button>)}
          {isSlider && <p>{item.title}</p>}
          <hr />
         
        </li>
      ))}
    </ul>
  );
};

export default ContentList;