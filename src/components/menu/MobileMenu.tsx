import React, { useEffect, useState } from 'react';
import '@styles/menu/MobileMenu.scss';
import { DisplayType } from '../IndexPageRoot';
import MobileConcert from './MobileConcert';
import MobileFootball from './MobileFootball';

export interface MobileMenuProps {
  isModalOpen: boolean;
  handleModalOpen: () => void;
  handleModalClose: () => void;
  handleCloseDisplayBoard: () => void;
  handleClick: (component: React.JSX.Element, type: DisplayType) => void;
}

export type SelectedMenu = 'profile' | 'concert' | 'football' | '';

const MobileMenu: React.FC<MobileMenuProps> = ({
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  handleCloseDisplayBoard,
}) => {
  const [displayComponent, setDisplayComponent] =
    useState<React.JSX.Element>(null);
  const [displayType, setDisplayType] = useState<DisplayType>('');
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>('');

  const menuBarRef = React.useRef<HTMLDivElement>(null);
  const menuDisplayRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen) {
      setSelectedMenu('profile');
    } else if (displayType === 'concert') {
      setSelectedMenu('concert');
    } else if (displayType === 'football') {
      setSelectedMenu('football');
    } else {
      setSelectedMenu('');
    }
  }, [isModalOpen, displayType]);

  const handleMouseDown = (e: MouseEvent) => {
    if (!menuBarRef.current) return;
    if (!menuDisplayRef.current) return;
    if (isModalOpen) return;

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
    // 이미 해당 컴포넌트가 떠있는 경우 || 컴포넌트를 close 하고 싶은 경우
    if (nowType === type || type === '') {
      setDisplayComponent(null);
      setDisplayType('');
      return;
    }

    if (type === 'concert') {
      setDisplayComponent(mountComponent);
      setDisplayType('concert');
    } else if (type === 'football') {
      setDisplayComponent(mountComponent);
      setDisplayType('football');
    }
  };

  const handleGyeChunHoeClick = () => {
    handleModalOpen();
    handleCloseDisplayBoard();
    setSelectedMenu('profile');
    toggleDisplayMenu(null, '', '');
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
            className={`mobile-menu-btn mobile-menu-football-btn ${
              selectedMenu === 'football' ? 'selected' : ''
            }`}
            onClick={() => {
              toggleDisplayMenu(
                <MobileFootball containerRef={menuDisplayRef} />,
                'football',
                displayType,
              );
              setSelectedMenu('football');
            }}
          >
            축구
          </div>
        </div>
      </div>
      {displayComponent}
    </div>
  );
};

export default MobileMenu;
