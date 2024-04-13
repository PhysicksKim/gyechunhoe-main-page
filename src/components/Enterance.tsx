import React from 'react';

interface EnteranceProps {
  isEntered: boolean;
  enter: () => void;
}

const Enterance = () => {
  return (
    <div className='enterance-container'>
      container
      <div className='enterance-wrapper'>Wrapper</div>
    </div>
  );
};

export default Enterance;
