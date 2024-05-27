import React, { useEffect, useRef, useState } from 'react';
import '@styles/IndexPageRoot.scss';
import '@styles/IndexPageRootAnimation.scss';
import Blossom from './Blossom';
import BoardConcert from './menu/BoardConcert';
import BoardFootball from './menu/BoardFootball';
import { CSSTransition } from 'react-transition-group';
import MenuButton from './common/Button';
import Modal from './common/Modal';
import IntroduceGye from './menu/IntroduceGye';

type DisplayType = '' | 'concert' | 'football';

const IndexPageRoot = () => {
  const [showDisplayBoard, setShowDisplayBoard] = useState(false);
  const [displayComponent, setDisplayComponent] = useState(null);
  const [nowShowing, setNowShowing] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setDisplayComponent(null);
    setNowShowing('');
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='main-background'>
      <div className='main-content art-blossom-tree'>
        <div className='board art-board-buttons'>
          <MenuButton type='gyechunhoe' onClick={handleModalOpen}></MenuButton>
          <MenuButton
            type='concert'
            onClick={() =>
              handleClick(
                <BoardConcert closeWindow={handleCloseDisplayBoard} />,
                'concert',
              )
            }
          />
          <MenuButton
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
            <div className={`display-board art-display-board ${nowShowing}`}>
              {displayComponent}
            </div>
          </div>
        </CSSTransition>
      </div>
      <Blossom />

      <Modal isOpen={isModalOpen} onClose={handleModalClose}>
        <>
          <IntroduceGye isOpen={isModalOpen} />
        </>
      </Modal>
    </div>
  );
};

export default IndexPageRoot;
