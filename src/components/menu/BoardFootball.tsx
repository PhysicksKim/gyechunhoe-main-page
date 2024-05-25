import React, { useEffect, useRef, useState } from 'react';
import '@styles/menu/BoardFootball.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux/Store';

interface BoardFootballProps {
  closeWindow: () => void;
}

const BoardFootball = ({ closeWindow }: BoardFootballProps) => {
  // const videoTagRef = useRef<HTMLVideoElement>(null);
  const sourceTagRef = useRef<HTMLSourceElement>(null);
  const footballVideoBlobUrl = useSelector(
    (state: RootState) => state.videos.footballBlobUrl,
  );

  useEffect(() => {
    if (sourceTagRef.current) {
      sourceTagRef.current.src = footballVideoBlobUrl;
    }
  }, [footballVideoBlobUrl]);

  const handleMoveToScoreboard = () => {
    // 새 탭에서 스코어보드 페이지로 이동
    window.open('https://gyechunsik.site/scoreboard', '_blank');
  };

  return (
    <div className='board-football-content'>
      <video className='football-video' muted autoPlay loop>
        {footballVideoBlobUrl && (
          <source
            ref={sourceTagRef}
            src={footballVideoBlobUrl}
            type='video/mp4'
          ></source>
        )}
      </video>
      <div className='display-board-btn-container'>
        <button
          className='display-board-btn-move display-board-btn'
          onClick={handleMoveToScoreboard}
        ></button>
        <button
          className='display-board-btn-close display-board-btn'
          onClick={closeWindow}
        ></button>
      </div>
    </div>
  );
};

export default BoardFootball;
