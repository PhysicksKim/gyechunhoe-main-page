import MediaUrls from '@src/class/MediaUrls';
import React, { useEffect, useState } from 'react';
import '@styles/menu/MobileDisplayContainer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export interface MobileFootballProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const MobileFootball: React.FC<MobileFootballProps> = ({ containerRef }) => {
  const [animateClass, setAnimateClass] = useState('before-animate');

  useEffect(() => {
    setTimeout(() => {
      setAnimateClass('after-animate');
    }, 10);
  }, []);

  const handleMoveToScoreboard = () => {
    // 새 탭에서 스코어보드 페이지로 이동
    window.open('https://gyechunsik.site/scoreboard', '_blank');
  };

  return (
    <div
      ref={containerRef}
      className={`mobile-display-container mobile-football-container ${animateClass}`}
    >
      <div className='mobile-display-video-wrapper'>
        <div className='mobile-display-video-frame'>
          <video
            className='mobile-display-video mobile-football-video'
            muted
            autoPlay
            loop
          >
            <source src={MediaUrls.footballVideoPreview}></source>
          </video>
        </div>
      </div>
      <div className='mobile-display-buttons mobile-football-buttons'>
        <button
          className='mobile-display-link-btn mobile-football-link-btn'
          onClick={handleMoveToScoreboard}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </button>
      </div>
    </div>
  );
};

export default MobileFootball;
