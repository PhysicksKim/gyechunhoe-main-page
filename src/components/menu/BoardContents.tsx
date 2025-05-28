import React, { useEffect, useRef, useState } from 'react';
import '@styles/menu/BoardContents.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@src/redux/Store';
import MediaUrls from '@src/class/MediaUrls';

interface BoardContentsProps {
  closeWindow: () => void;
}

const BoardContents = ({ closeWindow }: BoardContentsProps) => {
  const sourceTagRef = useRef<HTMLSourceElement>(null);
  const contentsBlobUrl = useSelector(
    (state: RootState) => state.videos.contentsBlobUrl,
  );

  useEffect(() => {
    if (sourceTagRef.current) {
      sourceTagRef.current.src = contentsBlobUrl;
    }
  }, [contentsBlobUrl]);

  const handleMoveToScoreboard = () => {
    // 새 탭에서 스코어보드 페이지로 이동
    window.open('https://gyechunhoe.com/scoreboard', '_blank');
  };

  return (
    <div className='board-contents-content'>
      <video className='contents-video' muted autoPlay loop>
        {/* {contentsBlobUrl && (
          <source
            ref={sourceTagRef}
            src={contentsBlobUrl}
            type='video/mp4'
          ></source>
        )} */}
        <source src={MediaUrls.contentsVideoPreview}></source>
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

export default BoardContents;
