import MediaUrls from '@src/class/MediaUrls';
import React from 'react';
import '@styles/menu/MobileDisplayContainer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const MobileConcert = () => {
  const handleMoveToConcertYoutube = () => {
    // 새 탭에서 콘서트 유튜브 영상으로 이동
    window.open('https://www.youtube.com/watch?v=EPvIZU2S5gg', '_blank');
  };

  return (
    <div className='mobile-display-container mobile-concert-container'>
      <video
        className='mobile-display-video mobile-concert-video'
        muted
        autoPlay
        loop
      >
        <source src={MediaUrls.concertVideoPreview}></source>
      </video>
      <div className='mobile-display-buttons mobile-concert-buttons'>
        <button
          className='mobile-display-link-btn mobile-concert-link-btn'
          onClick={handleMoveToConcertYoutube}
        >
          <FontAwesomeIcon icon={faUpRightFromSquare} />
        </button>
      </div>
    </div>
  );
};

export default MobileConcert;
