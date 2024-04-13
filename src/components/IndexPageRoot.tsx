import React, { useEffect, useRef, useState } from 'react';
import '@styles/IndexPageRoot.scss';
import Blossom from './Blossom';
import BoardConcert from './displayboard/BoardConcert';
import BoardFootball from './displayboard/BoardFootball';

type DisplayType = '' | 'concert' | 'football';

const IndexPageRoot = () => {
  const [showDisplayBoard, setShowDisplayBoard] = useState(false);
  const [displayComponent, setDisplayComponent] = useState(null);
  const [nowShowing, setNowShowing] = useState('');

  const handleClick = (component: React.JSX.Element, type: DisplayType) => {
    if (nowShowing === type) {
      setShowDisplayBoard(false);
      setDisplayComponent(null);
      setNowShowing('');
    } else {
      setDisplayComponent(component);
      setShowDisplayBoard(true);
      setNowShowing(type);
    }
  };

  const handleCloseDisplayBoard = () => {
    setShowDisplayBoard(false);
    setDisplayComponent(null);
    setNowShowing('');
  };

  return (
    <div className='main-background'>
      <div className='header'>
        <div className='board'>
          <button
            className='btn-concert'
            onClick={() =>
              handleClick(
                <BoardConcert closeWindow={handleCloseDisplayBoard} />,
                'concert',
              )
            }
          ></button>
          <button
            className='btn-football'
            onClick={() =>
              handleClick(
                <BoardFootball closeWindow={handleCloseDisplayBoard} />,
                'football',
              )
            }
          ></button>
        </div>
        {showDisplayBoard && (
          <div className='display-board-container'>
            <div className={`display-board ${nowShowing}`}>
              {displayComponent}
            </div>
          </div>
        )}
      </div>
      <Blossom />
    </div>
  );
};

export default IndexPageRoot;
