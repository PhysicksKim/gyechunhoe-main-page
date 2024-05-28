import MediaUrls from '@src/class/MediaUrls';
import React from 'react';
import '@styles/menu/MobileDisplayContainer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const MobileFootball = () => {
  const handleMoveToScoreboard = () => {
    // 새 탭에서 스코어보드 페이지로 이동
    window.open('https://gyechunsik.site/scoreboard', '_blank');
  };

  return (
    <div className='mobile-display-container mobile-football-container'>
      <video
        className='mobile-display-video mobile-football-video'
        muted
        autoPlay
        loop
      >
        <source src={MediaUrls.footballVideoPreview}></source>
      </video>
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
