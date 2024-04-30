
import React from 'react';


const ContentList = ({ content, onOpenModal, setIsTitleClick }) => {



  return (
    <ul>
      {content?.map((item) => (
        <li key={item._id}>
          <button onClick={() => {onOpenModal(item); setIsTitleClick(true)}}>{item.title}</button>
        </li>
      ))}
    </ul>
  );
};

export default ContentList;