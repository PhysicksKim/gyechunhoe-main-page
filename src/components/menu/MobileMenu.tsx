import React, { useEffect, useState } from 'react';
import '@styles/menu/MobileMenu.scss';
import { DisplayType } from '../IndexPageRoot';
import MobileConcert from './MobileConcert';
import ContentsModal from './contents/ContentModal';

export interface MobileMenuProps {
  isGyeIntroOpen: boolean;
  isContentsOpen: boolean;
  handleGyeProfileModalOpen: () => void;
  handleContentModalOpen: () => void;
  handleModalClose: () => void;
  handleCloseDisplayBoard: () => void;
  handleClick: (component: React.JSX.Element, type: DisplayType) => void;
  isSmallViewport: boolean;
  isPortrait: boolean;
  isMobileRatio: boolean;
}

export type SelectedMenu = 'profile' | 'concert' | 'contents' | '';

const MobileMenu: React.FC<MobileMenuProps> = ({
  isGyeIntroOpen,
  isContentsOpen,
  handleGyeProfileModalOpen,
  handleContentModalOpen,
  handleModalClose,
  handleCloseDisplayBoard,
  isSmallViewport,
  isPortrait,
  isMobileRatio,
}) => {
  const [displayComponent, setDisplayComponent] =
    useState<React.JSX.Element>(null);
  const [displayType, setDisplayType] = useState<DisplayType>('');
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>('');

  const menuBarRef = React.useRef<HTMLDivElement>(null);
  const menuDisplayRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isGyeIntroOpen) {
      setSelectedMenu('profile');
    } else if (displayType === 'concert') {
      setSelectedMenu('concert');
    } else if (isContentsOpen) {
      setSelectedMenu('contents');
    } else {
      setSelectedMenu('');
    }
  }, [isGyeIntroOpen, isContentsOpen, displayType]);

  const handleMouseDown = (e: MouseEvent) => {
    if (!menuBarRef.current) return;
    if (!menuDisplayRef.current) return;
    if (isGyeIntroOpen) return;

    const { clientX, clientY } = e;
    const {
      left: barL,
      right: barR,
      top: barT,
      bottom: barB,
    } = menuBarRef.current.getBoundingClientRect();
    const {
      left: displayL,
      right: displayR,
      top: displayT,
      bottom: displayB,
    } = menuDisplayRef.current.getBoundingClientRect();

    const left = barL < displayL ? barL : displayL;
    const right = barR > displayR ? barR : displayR;
    const top = barT < displayT ? barT : displayT;
    const bottom = barB > displayB ? barB : displayB;

    if (
      clientX < left ||
      clientX > right ||
      clientY < top ||
      clientY > bottom
    ) {
      toggleDisplayMenu(null, '', '');
    }
  };

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleMouseDown as unknown as EventListener,
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleMouseDown as unknown as EventListener,
      );
    };
  }, []);

  const toggleDisplayMenu = (
    mountComponent: React.JSX.Element,
    type: DisplayType,
    nowType: DisplayType,
  ) => {
    if (nowType === type || type === '') {
      setDisplayComponent(null);
      setDisplayType('');
      return;
    }

    if (type === 'concert') {
      setDisplayComponent(mountComponent);
      setDisplayType('concert');
    }
  };

  const handleGyeChunHoeClick = () => {
    handleGyeProfileModalOpen();
    setSelectedMenu('profile');
    toggleDisplayMenu(null, '', '');
    handleCloseDisplayBoard();
  };

  const wrappedHandleContentModalOpen = () => {
    handleContentModalOpen();
    setSelectedMenu('contents');
    toggleDisplayMenu(null, '', '');
    handleCloseDisplayBoard();
  };

  return (
    <div className='mobile-menu-wrapper'>
      <div ref={menuBarRef} className='mobile-menu-bar'>
        <div className='mobile-menu-left'>
          <div className='page-title'>계춘회</div>
        </div>
        <div className='mobile-menu-right'>
          <div
            className={`mobile-menu-btn mobile-menu-gyechunhoe-btn ${
              selectedMenu === 'profile' ? 'selected' : ''
            }`}
            onClick={() => handleGyeChunHoeClick()}
          >
            소개
          </div>
          <div
            className={`mobile-menu-btn mobile-menu-concert-btn ${
              selectedMenu === 'concert' ? 'selected' : ''
            }`}
            onClick={() => {
              toggleDisplayMenu(
                <MobileConcert containerRef={menuDisplayRef} />,
                'concert',
                displayType,
              );
              setSelectedMenu('concert');
            }}
          >
            콘서트
          </div>
          <div
            className={`mobile-menu-btn mobile-menu-contents-btn ${
              selectedMenu === 'contents' ? 'selected' : ''
            }`}
            onClick={wrappedHandleContentModalOpen}
          >
            컨텐츠
          </div>
        </div>
      </div>
      {displayComponent}
    </div>
  );
};

export default MobileMenu;
