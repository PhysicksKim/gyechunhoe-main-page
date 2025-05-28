import React, { useEffect, useRef, useState } from 'react';
import '@styles/IndexPageRoot.scss';
import '@styles/IndexPageRootAnimation.scss';
import Blossom from './Blossom';
import Modal from './common/Modal';
import IntroduceGye from './menu/profile/IntroduceGye';
import MobileMenu from './menu/MobileMenu';
import DesktopMenu from './menu/DesktopMenu';
import ContentsModal from './menu/contents/ContentModal';

export type DisplayType = '' | 'concert' | 'contents';

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
  const [isGyeProfileModalOpen, setIsGyeProfileModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

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

  const handleGyeProfileModalOpen = () => {
    setIsGyeProfileModalOpen(true);
    setDisplayComponent(null);
    setNowShowing('');
  };

  const handleContentModalOpen = () => {
    setIsContentModalOpen(true);
    setDisplayComponent(null);
    setNowShowing('');
  };

  const handleModalClose = () => {
    setIsGyeProfileModalOpen(false);
    setIsContentModalOpen(false);
  };

  return (
    <div className='main-background'>
      {isMobileRatio ? (
        <MobileMenu
          handleGyeProfileModalOpen={handleGyeProfileModalOpen}
          handleContentModalOpen={handleContentModalOpen}
          handleModalClose={handleModalClose}
          handleCloseDisplayBoard={handleCloseDisplayBoard}
          handleClick={handleClick}
          isGyeIntroOpen={isGyeProfileModalOpen}
          isContentsOpen={isContentModalOpen}
          isSmallViewport={isSmallViewport}
          isPortrait={isPortrait}
          isMobileRatio={isMobileRatio}
        />
      ) : (
        <DesktopMenu
          handleGyeProfileModalOpen={handleGyeProfileModalOpen}
          handleContentModalOpen={handleContentModalOpen}
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
        onClose={handleModalClose}
        isOpen={isGyeProfileModalOpen}
        isSmallViewport={isSmallViewport}
        isPortrait={isPortrait}
        isMobileRatio={isMobileRatio}
      >
        <IntroduceGye
          handleModalClose={handleModalClose}
          isOpen={isGyeProfileModalOpen}
          isSmallViewport={isSmallViewport}
          isPortrait={isPortrait}
          isMobileRatio={isMobileRatio}
        />
      </Modal>
      <Modal
        onClose={handleModalClose}
        isOpen={isContentModalOpen}
        isSmallViewport={isSmallViewport}
        isPortrait={isPortrait}
        isMobileRatio={isMobileRatio}
      >
        <ContentsModal
          handleModalClose={handleModalClose}
          isOpen={isContentModalOpen}
          isSmallViewport={isSmallViewport}
          isPortrait={isPortrait}
          isMobileRatio={isMobileRatio}
        />
      </Modal>
    </div>
  );
};

export default IndexPageRoot;
