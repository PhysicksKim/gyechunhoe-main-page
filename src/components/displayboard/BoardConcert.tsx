import React, { useEffect, useRef, useState } from 'react';
import '@styles/displayboard/BoardConcert.scss';

interface BoardConcertProps {
  closeWindow: () => void;
}

const BoardConcert = ({ closeWindow }: BoardConcertProps) => {
  const handleMoveToConcertYoutube = () => {
    // 새 탭에서 콘서트 유튜브 영상으로 이동
    window.open('https://www.youtube.com/watch?v=EPvIZU2S5gg', '_blank');
  };

  return (
    <div className='board-concert-content'>
      <video className='concert-video' muted autoPlay loop>
        <source src='https://static.gyechunsik.site/etc/gyechunhoe_concert_clips_for_webmain_720p_noaudio.mp4'></source>
      </video>
      <div className='display-board-btn-container'>
        <button
          className='display-board-btn-move display-board-btn'
          onClick={handleMoveToConcertYoutube}
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
