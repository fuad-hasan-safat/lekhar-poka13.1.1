import React, { useState } from 'react';

function Bio({ bio= '' }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if(bio.length <= 0) return;

  const wordCount = bio?.split(' ').length;
  const truncatedBio = wordCount > 50 ? `${bio.split(' ').slice(0, 50).join(' ')}...` : bio;

  const handleSeeMore = () => {
    setIsExpanded(true);
  };

  const handleSeeLess = () => {
    setIsExpanded(false);
  };

  return (
    <div className='text-[16px] text-[#737373] mt-[10px] text-justify'>
      {isExpanded ? <p>{bio}</p> : <p>{truncatedBio}</p>}
      {wordCount > 50 && !isExpanded && <button className='text-[#F9A106]' onClick={handleSeeMore}>আরো দেখুন</button>}
      {isExpanded && <button className='text-[#F9A106]' onClick={handleSeeLess}>কমিয়ে দেখুন </button>}
    </div>
  );
}

export default Bio;