import React from 'react';
import MenuButton from '../common/Button';
import BoardConcert from './BoardConcert';
import BoardFootball from './BoardFootball';
import { CSSTransition } from 'react-transition-group';
import { DisplayType } from '../IndexPageRoot';

export interface DesktopMenuProps {
  handleModalOpen: () => void;
  handleCloseDisplayBoard: () => void;
  handleClick: (component: React.JSX.Element, type: DisplayType) => void;
  handleExited: () => void;
  showDisplayBoard: boolean;
  nowShowing: DisplayType;
  displayComponent: React.JSX.Element | null;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  handleModalOpen,
  handleCloseDisplayBoard,
  handleClick,
  handleExited,
  showDisplayBoard,
  nowShowing,
  displayComponent,
}) => {
  return (
    <>
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
    </>
  );
};

export default DesktopMenu;
