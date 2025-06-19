import React, { useEffect, useRef, useState } from 'react';
import '@styles/menu/BoardConcert.scss';
import MediaUrls from '@src/class/MediaUrls';

interface BoardConcertProps {
  closeWindow: () => void;
}

const BoardConcert = ({ closeWindow }: BoardConcertProps) => {
  const handleMoveToConcertYoutube = () => {
    // 새 탭에서 콘서트 유튜브 영상으로 이동
    window.open('https://www.youtube.com/watch?v=EPvIZU2S5gg', '_blank');
  };

  const handleMoveToBirthdayPartyChzzk = () => {
    window.open('https://chzzk.naver.com/video/5212622', '_blank');
  };

  return (
    <div className='board-concert-content'>
      <video className='concert-video' muted autoPlay loop>
        {/* {concertVideoBlobUrl && <source src={concertVideoBlobUrl}></source>} */}
        <source src={MediaUrls.concertVideoPreview}></source>
      </video>
      <div className='display-board-btn-container'>
        <button
          className='display-board-btn-concert display-board-btn'
          onClick={handleMoveToConcertYoutube}
        ></button>
        <button
          className='display-board-btn-birthday display-board-btn'
          onClick={handleMoveToBirthdayPartyChzzk}
        ></button>
        <button
          className='display-board-btn-close display-board-btn'
          onClick={closeWindow}
        ></button>
      </div>
    </div>
  );
};

export default BoardConcert;
