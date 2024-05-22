import React, { useEffect, useRef, useState } from 'react';
import '@styles/IndexPageRoot.scss';
import '@styles/IndexPageRootAnimation.scss';
import Blossom from './Blossom';
import BoardConcert from './displayboard/BoardConcert';
import BoardFootball from './displayboard/BoardFootball';
import { CSSTransition } from 'react-transition-group';
import Button from './Button';
import { useSelector } from 'react-redux';
import { RootState } from '@src/redux/Store';

type DisplayType = '' | 'concert' | 'football';

const IndexPageRoot = () => {
  const [showDisplayBoard, setShowDisplayBoard] = useState(false);
  const [displayComponent, setDisplayComponent] = useState(null);
  const [nowShowing, setNowShowing] = useState('');

  const handleClick = (component: React.JSX.Element, type: DisplayType) => {
    if (nowShowing === type) {
      setShowDisplayBoard(false);
    } else {
      setDisplayComponent(component);
      setShowDisplayBoard(true);
      setNowShowing(type);
    }
  };

  const handleCloseDisplayBoard = () => {
    setShowDisplayBoard(false);
  };

  const handleExited = () => {
    setDisplayComponent(null);
    setNowShowing('');
  };

  return (
    <div className='main-background'>
      <div className='header'>
        <div className='board'>
          <Button
            type='concert'
            onClick={() =>
              handleClick(
                <BoardConcert closeWindow={handleCloseDisplayBoard} />,
                'concert',
              )
            }
          />
          <Button
            type='football'
            onClick={() =>
              handleClick(
                <BoardFootball closeWindow={handleCloseDisplayBoard} />,
                'football',
              )
            }
          />
        </div>
        <CSSTransition
          in={showDisplayBoard}
          timeout={500}
          classNames='display-board'
          unmountOnExit
          onExited={handleExited}
        >
          <div className='display-board-container'>
            <div className={`display-board ${nowShowing}`}>
              {displayComponent}
            </div>
          </div>
        </CSSTransition>
      </div>
      <Blossom />
    </div>
  );
};

export default IndexPageRoot;
