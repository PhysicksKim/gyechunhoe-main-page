import React from 'react';
import MenuButton from '../common/Button';
import BoardContents from './BoardContents';
import { CSSTransition } from 'react-transition-group';
import { DisplayType } from '../IndexPageRoot';
import BoardConcert from './BoardConcert';

export interface DesktopMenuProps {
  handleGyeProfileModalOpen: () => void;
  handleContentModalOpen: () => void;
  handleCloseDisplayBoard: () => void;
  handleClick: (component: React.JSX.Element, type: DisplayType) => void;
  handleExited: () => void;
  showDisplayBoard: boolean;
  nowShowing: DisplayType;
  displayComponent: React.JSX.Element | null;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({
  handleGyeProfileModalOpen,
  handleContentModalOpen,
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
          <MenuButton
            type='gyechunhoe'
            onClick={handleGyeProfileModalOpen}
          ></MenuButton>
          <MenuButton
            type='concert'
            onClick={() =>
              handleClick(
                <BoardConcert closeWindow={handleCloseDisplayBoard} />,
                'concert',
              )
            }
          />
          <MenuButton type='contents' onClick={handleContentModalOpen} />
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
