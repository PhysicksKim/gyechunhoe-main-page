import MediaUrls from '@src/class/MediaUrls';
import React, { useEffect, useState } from 'react';
import '@styles/menu/MobileDisplayContainer.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

export interface MobileConcertProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const MobileConcert: React.FC<MobileConcertProps> = ({ containerRef }) => {
  const [animateClass, setAnimateClass] = useState('before-animate');

  useEffect(() => {
    setTimeout(() => {
      setAnimateClass('after-animate');
    }, 10);
  }, []);

  const handleMoveToConcertYoutube = () => {
    // 새 탭에서 콘서트 유튜브 영상으로 이동
    window.open('https://www.youtube.com/watch?v=EPvIZU2S5gg', '_blank');
  };

  return (
    <div
      ref={containerRef}
      className={`mobile-display-container mobile-concert-container ${animateClass}`}
    >
      <div className='mobile-display-video-wrapper'>
        <div className='mobile-display-video-frame'>
          <video
            className='mobile-display-video mobile-concert-video'
            muted
            autoPlay
            loop
          >
            <source src={MediaUrls.concertVideoPreview}></source>
          </video>
        </div>
      </div>
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
