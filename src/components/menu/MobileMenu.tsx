import React, { useEffect, useState } from 'react';
import '@styles/menu/MobileMenu.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';
import BoardConcert from './BoardConcert';
import { DisplayType } from '../IndexPageRoot';
import MobileConcert from './MobileConcert';
import MobileFootball from './MobileFootball';

export interface MobileMenuProps {
  handleCloseDisplayBoard: () => void;
  handleClick: (component: React.JSX.Element, type: DisplayType) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  handleCloseDisplayBoard,
  handleClick,
}) => {
  const [displayComponent, setDisplayComponent] =
    useState<React.JSX.Element>(null);
  const [displayType, setDisplayType] = useState<DisplayType>('');

  useEffect(() => {
    console.log('displayComponent changed');
    // console.log(`type : ${displayComponent?.type}`);
  }, [displayComponent]);

  const toggleDisplayMenu = (
    mountComponent: React.JSX.Element,
    type: DisplayType,
    nowType: DisplayType,
  ) => {
    // 이미 해당 컴포넌트가 떠있는 경우
    if (displayType == type) {
      setDisplayComponent(null);
      setDisplayType('');
      return;
    }

    if (type === 'concert') {
      setDisplayComponent(<MobileConcert />);
      setDisplayType('concert');
    } else if (type === 'football') {
      setDisplayComponent(<MobileFootball />);
      setDisplayType('football');
    }
  };

  return (
    <>
      <div className='mobile-menu-bar'>
        <div className='mobile-menu-left'>
          <div className='page-title'>계춘회</div>
        </div>
        <div className='mobile-menu-right'>
          <div
            className='mobile-menu-gyechunhoe-btn'
            onClick={() => {
              console.log('gyechunhoe click');
            }}
          >
            소개
          </div>
          <div
            className='mobile-menu-concert-btn'
            onClick={() => {
              console.log('concert click');
              toggleDisplayMenu(<MobileConcert />, 'concert', displayType);
            }}
          >
            콘서트
          </div>
          <div
            className='mobile-menu-football-btn'
            onClick={() => {
              console.log('football click');
              toggleDisplayMenu(<MobileFootball />, 'football', displayType);
            }}
          >
            축구
          </div>
        </div>
      </div>
      {displayComponent}
    </>
  );
};

export default MobileMenu;
