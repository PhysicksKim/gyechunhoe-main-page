import React, { useState, useEffect } from 'react';
import Swipe from 'react-easy-swipe';

import Gye2d03 from '@assets/image/gyechunhoe_live2d.webp';
import chunsik from '@assets/image/chunsik_character.png';

import '@styles/menu/profile/PortraitProfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

import {
  ProfileContent,
  CardWrapperDiv,
  CardItem,
  ContentCounterWrapper,
  ContentCounter,
} from './PortraitProfileStyledComps';
import { INTRODUCE_TEXT } from '@src/assets/contents/contents';

export interface PortraitProfileProps {
  animateClass: string;
  handleModalClose: () => void;
}

const PortraitProfile: React.FC<PortraitProfileProps> = ({
  animateClass,
  handleModalClose,
}) => {
  const contents = [
    <>
      <div className='gye-profile-description-container'>
        <div
          className='gye-description-image'
          style={{ backgroundImage: Gye2d03 }}
        ></div>
        <div className='gye-profile-description-wrapper'>
          <div className='gye-profile-description'>
            <p>{INTRODUCE_TEXT}</p>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className='gye-profile-bio-container'>
        <div className='gye-profile-bio-picture'></div>
        <div className='gye-profile-catbox-wrapper'>
          <div className='profile-item profile-item-01 birth-wrapper'>
            <div className='cat-box birth-title'>생일</div>
            <div className='profile-content birth-content'>1월 8일</div>
          </div>
          <div className='profile-item profile-item-02 height-wrapper'>
            <div className='cat-box height-title'>키</div>
            <div className='profile-content height-content'>163.8cm</div>
          </div>
          <div className='profile-item profile-item-03 age-wrapper'>
            <div className='cat-box age-title'>나이</div>
            <div className='profile-content age-content'>예쁜나이</div>
          </div>
          <div className='profile-item profile-item-04 fanname-wrapper'>
            <div className='cat-box fanname-title'>팬네임</div>
            <div className='profile-content fanname-content'>
              춘식이
              <figure className='fanname-image profile-chunsik-character'>
                <img
                  src={chunsik}
                  alt='춘식이'
                  onDragStart={(e) => e.preventDefault()}
                ></img>
              </figure>
            </div>
          </div>
          <div className='profile-item profile-item-05 manufacturer-wrapper'>
            <div className='cat-box manufacturer-title'>제조</div>
            <div className='profile-content manufacturer-content'>Sonsiru</div>
          </div>
          <div className='profile-item profile-item-06 assembly-wrapper'>
            <div className='cat-box assembly-title'>조립</div>
            <div className='profile-content assembly-content'>KAXA</div>
          </div>
        </div>
      </div>
    </>,
    <>
      <div className={`gye-image-container portrait `}>
        <img
          src={Gye2d03}
          alt='계춘회 live 2d image'
          onDragStart={(e) => e.preventDefault()}
        ></img>
      </div>
    </>,
  ];

  const [positionx, setPositionx] = useState<number>(0);
  const [cardCount, setCardCount] = useState<number>(1);
  const [endSwipe, setEndSwipe] = useState<boolean>(true);

  const onSwipeMove = (position: { x: number }) => {
    setEndSwipe(false);
    if (contents.length === 1) {
      return;
    }
    if (cardCount === 1 && position.x < 0) {
      setPositionx(() => position.x);
      return;
    }
    if (cardCount > 1 && cardCount < contents.length) {
      setPositionx(() => position.x);
      return;
    }
    if (cardCount === contents.length && position.x > 0) {
      setPositionx(() => position.x);
      return;
    }
  };

  const onSwipeEnd = () => {
    if (positionx < -20) {
      setCardCount((cardCount) => cardCount + 1);
    }
    if (positionx > 20) {
      setCardCount((cardCount) => cardCount - 1);
    }
    setPositionx(() => 0);
    setEndSwipe(true);
  };

  const onClickLeft = () => {
    if (cardCount > 1) {
      setCardCount((cardCount) => cardCount - 1);
    }
  };

  const onClickRight = () => {
    if (cardCount < contents.length) {
      setCardCount((cardCount) => cardCount + 1);
    }
  };

  return (
    <ProfileContent className={`portrait-profile ${animateClass}`}>
      <div className={`gye-profile-title ${animateClass}`}>
        <h1>계춘회</h1>
      </div>
      <div className='gye-profile-modal-close-btn' onClick={handleModalClose}>
        <FontAwesomeIcon icon={faClose} />
      </div>
      <Swipe
        className={`swipe-div ${animateClass}`}
        allowMouseEvents={true}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
      >
        <CardWrapperDiv
          className='card-wrapper-div'
          endSwipe={endSwipe}
          positionx={positionx}
          cardCount={cardCount}
        >
          {contents.map((content, index) => {
            return <CardItem key={index}>{content}</CardItem>;
          })}
        </CardWrapperDiv>
      </Swipe>
      {contents.length > 1 && (
        <ContentCounterWrapper>
          {contents.map((content, index) => {
            return (
              <ContentCounter
                key={index}
                index={index}
                cardCount={cardCount}
              ></ContentCounter>
            );
          })}
        </ContentCounterWrapper>
      )}
      <div className='slide-buttons'>
        <div className='slide-button-left' onClick={onClickLeft}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div className='slide-button-right' onClick={onClickRight}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    </ProfileContent>
  );
};

export default PortraitProfile;
