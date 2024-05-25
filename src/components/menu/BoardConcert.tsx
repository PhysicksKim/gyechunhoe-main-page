import React, { useEffect, useRef, useState } from 'react';
import '@styles/menu/BoardConcert.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/Store';

interface BoardConcertProps {
  closeWindow: () => void;
}

const BoardConcert = ({ closeWindow }: BoardConcertProps) => {
  const concertVideoBlobUrl = useSelector(
    (state: RootState) => state.videos.concertBlobUrl,
  );

  const handleMoveToConcertYoutube = () => {
    // 새 탭에서 콘서트 유튜브 영상으로 이동
    window.open('https://www.youtube.com/watch?v=EPvIZU2S5gg', '_blank');
  };

  return (
    <div className='board-concert-content'>
      <video className='concert-video' muted autoPlay loop>
        {concertVideoBlobUrl && <source src={concertVideoBlobUrl}></source>}
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
