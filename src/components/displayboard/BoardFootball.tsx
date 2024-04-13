import React, { useEffect, useRef, useState } from 'react';
import '@styles/displayboard/BoardFootball.scss';

interface BoardFootballProps {
  closeWindow: () => void;
}

const BoardFootball = ({ closeWindow }: BoardFootballProps) => {
  const handleMoveToScoreboard = () => {
    // 새 탭에서 스코어보드 페이지로 이동
    window.open('https://gyechunsik.site/scoreboard', '_blank');
  };

  return (
    <div className='board-football-content'>
      <video className='football-video' muted autoPlay loop>
        <source src='https://static.gyechunsik.site/etc/gyechunsik_mainpage_football_noaudio.mp4'></source>
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
