import MediaUrls from '@src/class/MediaUrls';
import React, { useEffect, useState } from 'react';
import '@styles/menu/MobileDisplayContainer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export interface MobileContentsProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const MobileContents: React.FC<MobileContentsProps> = ({ containerRef }) => {
  const [animateClass, setAnimateClass] = useState('before-animate');

  useEffect(() => {
    setTimeout(() => {
      setAnimateClass('after-animate');
    }, 10);
  }, []);

  const handleMoveToScoreboard = () => {
    window.open('https://gyechune.com/scoreboard', '_blank');
  };

  return (
    <div
      ref={containerRef}
      className={`mobile-display-container mobile-contents-container ${animateClass}`}
    >
      <div className='mobile-display-video-wrapper'>
        <div className='mobile-display-video-frame'>
          <video
            className='mobile-display-video mobile-contents-video'
            muted
            autoPlay
            loop
          >
            {/* <source src={MediaUrls.contentsVideoPreview}></source> */}
          </video>
        </div>
      </div>
      <div className='mobile-display-buttons mobile-contents-buttons'>
        <button
          className='mobile-display-link-btn mobile-contents-link-btn'
          onClick={handleMoveToScoreboard}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </button>
      </div>
    </div>
  );
};

export default MobileContents;
