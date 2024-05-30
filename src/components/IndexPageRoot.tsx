import React, { useEffect, useRef, useState } from 'react';
import '@styles/IndexPageRoot.scss';
import '@styles/IndexPageRootAnimation.scss';
import Blossom from './Blossom';
import Modal from './common/Modal';
import IntroduceGye from './menu/profile/IntroduceGye';
import MobileMenu from './menu/MobileMenu';
import DesktopMenu from './menu/DesktopMenu';

export type DisplayType = '' | 'concert' | 'football';

export interface IndexPageRootProps {
  isMobileRatio: boolean;
  isSmallViewport: boolean;
  isPortrait: boolean;
}

const IndexPageRoot: React.FC<IndexPageRootProps> = ({
  isMobileRatio,
  isSmallViewport,
  isPortrait,
}) => {
  const [showDisplayBoard, setShowDisplayBoard] = useState(false);
  const [displayComponent, setDisplayComponent] =
    useState<React.JSX.Element | null>(null);
  const [nowShowing, setNowShowing] = useState<DisplayType>('');
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
      {isMobileRatio ? (
        <MobileMenu
          handleModalOpen={handleModalOpen}
          handleCloseDisplayBoard={handleCloseDisplayBoard}
          handleClick={handleClick}
        />
      ) : (
        <DesktopMenu
          handleModalOpen={handleModalOpen}
          handleCloseDisplayBoard={handleCloseDisplayBoard}
          handleClick={handleClick}
          handleExited={handleExited}
          showDisplayBoard={showDisplayBoard}
          nowShowing={nowShowing}
          displayComponent={displayComponent}
        />
      )}
      <Blossom />
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        isSmallViewport={isSmallViewport}
        isPortrait={isPortrait}
        isMobileRatio={isMobileRatio}
      >
        <IntroduceGye
          isOpen={isModalOpen}
          isSmallViewport={isSmallViewport}
          isPortrait={isPortrait}
          isMobileRatio={isMobileRatio}
        />
      </Modal>
    </div>
  );
};

export default IndexPageRoot;
