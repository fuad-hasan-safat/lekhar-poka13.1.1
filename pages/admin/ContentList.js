
import React from 'react';


const ContentList = ({ content, onOpenModal }) => {



  return (
    <ul>
      {content?.map((item) => (
        <li key={item._id}>
          <button onClick={() => onOpenModal(item)}>{item.title}</button>
        </li>
      ))}
    </ul>
  );
};

export default ContentList;