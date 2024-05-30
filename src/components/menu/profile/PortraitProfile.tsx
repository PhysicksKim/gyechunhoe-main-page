import React, { useState, useEffect } from 'react';
import Swipe from 'react-easy-swipe';

import Gye2d03 from '@assets/image/gyechunhoe_live2d_03_.png';
import chunsik from '@assets/image/chunsik_character.png';
import chzzkLogo from '@assets/image/logo_chzzk.png';
import youtubeLogo from '@assets/image/logo_youtube.png';
import naverCafeLogo from '@assets/image/logo_naver_cafe.png';

import '@styles/menu/profile/PortraitProfile.scss';
import styled from 'styled-components';

export interface PortraitProfileProps {
  animateClass: string;
}

const PortraitProfile: React.FC<PortraitProfileProps> = ({ animateClass }) => {
  /*
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const handleSwipeLeft = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % 3);
  // };

  // const handleSwipeRight = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex - 1 + 3) % 3);
  // };

  // useEffect(() => {
  //   console.log(`PortraitProfile currentIndex: ${currentIndex}`);
  // }, [currentIndex]);

  // return (
  //   <>
  //     <div className='gye-profile-title'>
  //       <h1>계춘회</h1>
  //     </div>
  //     <Swipe
  //       onSwipeLeft={handleSwipeLeft}
  //       onSwipeRight={handleSwipeRight}
  //       className='swipe-container'
  //     >
  //       <div
  //         className='swipe-inner'
  //         style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
  //       >
  //         <div className={`swipe-card swipe-card-1 ${animateClass}`}>
  //           <div className={`gye-image-container portrait ${animateClass}`}>
  //             <img src={Gye2d03} alt={'계춘회 live 2d image'}></img>
  //           </div>
  //         </div>
  //         <div className={`swipe-card swipe-card-2 ${animateClass}`}>
  //           <div className='gye-profile-description'>
  //             <p>
  //               치지직에서 다양한 컨텐츠를 하고 있는 버츄얼 스트리머 입니다.
  //               주력 컨텐츠로는 PPT, VR을 이용한 예능쇼, 축구 중계, 종합게임을
  //               하고 있습니다.
  //             </p>
  //           </div>
  //           <div className='gye-social'>
  //             <div className='social-link-wrapper chzzk-link'>
  //               <a
  //                 href='https://chzzk.naver.com/live/a9a343510e132ea3026ff3cf682820b5'
  //                 target='_blank'
  //                 rel='noreferrer'
  //               >
  //                 <img
  //                   className='profile-social-link'
  //                   src={chzzkLogo}
  //                   alt='치지직 로고'
  //                 ></img>
  //               </a>
  //             </div>
  //             <div className='social-link-wrapper youtube-link'>
  //               <a
  //                 href='https://www.youtube.com/@chunhoe_'
  //                 target='_blank'
  //                 rel='noreferrer'
  //               >
  //                 <img
  //                   className='profile-social-link'
  //                   src={youtubeLogo}
  //                   alt='유튜브 로고'
  //                 ></img>
  //               </a>
  //             </div>
  //             <div className='social-link-wrapper cafe-link'>
  //               <a
  //                 href='https://cafe.naver.com/chunhoe'
  //                 target='_blank'
  //                 rel='noreferrer'
  //               >
  //                 <img
  //                   className='profile-social-link'
  //                   src={naverCafeLogo}
  //                   alt='네이버 카페 로고'
  //                 ></img>
  //               </a>
  //             </div>
  //           </div>
  //         </div>
  //         <div className={`swipe-card swipe-card-3 ${animateClass}`}>
  //           <div className='gye-profile-bio'>
  //             <div className='profile-item profile-item-01 birth-wrapper'>
  //               <div className='cat-box birth-title'>생일</div>
  //               <div className='profile-content birth-content'>1월 8일</div>
  //             </div>
  //             <div className='profile-item profile-item-02 height-wrapper'>
  //               <div className='cat-box height-title'>키</div>
  //               <div className='profile-content height-content'>163.8cm</div>
  //             </div>
  //             <div className='profile-item profile-item-03 age-wrapper'>
  //               <div className='cat-box age-title'>나이</div>
  //               <div className='profile-content age-content'>예쁜나이</div>
  //             </div>
  //             <div className='profile-item profile-item-04 fanname-wrapper'>
  //               <div className='cat-box fanname-title'>팬네임</div>
  //               <div className='profile-content fanname-content'>
  //                 춘식이
  //                 <figure className='fanname-image profile-chunsik-character'>
  //                   <img src={chunsik} alt='춘식이'></img>
  //                 </figure>
  //               </div>
  //             </div>
  //             <div className='profile-item profile-item-05 manufacturer-wrapper'>
  //               <div className='cat-box manufacturer-title'>제조</div>
  //               <div className='profile-content manufacturer-content'>
  //                 Sonsiru
  //               </div>
  //             </div>
  //             <div className='profile-item profile-item-06 assembly-wrapper'>
  //               <div className='cat-box assembly-title'>조립</div>
  //               <div className='profile-content assembly-content'>KAXA</div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </Swipe>
  //   </>
  // );
  */

  const contents = [
    'card1 card1 card1 card1 card1 card1 card1 card1 card1 card1 card1 card1 card1 card1 card1',
    'card2 card2 card2 card2 card2 card2 card2 card2 card2 card2 card2 card2 card2 card2 card2',
    'card3 card3 card3 card3 card3 card3 card3 card3 card3 card3 card3 card3 card3 card3 card3',
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

  return (
    // <div style={{ width: '300px', height: '100px' }}>
    <ProfileContent>
      <Swipe
        className='swipe-div'
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
      >
        <CardWrapperDiv
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
        <ContentContainerWrapper>
          {contents.map((content, index) => {
            return (
              <ContentCounter key={index} index={index} cardCount={cardCount} />
            );
          })}
        </ContentContainerWrapper>
      )}
    </ProfileContent>
  );
};

const ProfileContent = styled.div`
  width: 300px;
  height: 550px;
  position: relative;
  overflow: hidden;
`;

export interface CardDivProps {
  endSwipe: boolean;
  positionx: number;
  cardCount: number;
}

const CardWrapperDiv = styled.div<CardDivProps>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform ${({ endSwipe }) => (endSwipe ? '0.5s' : '0s')};
  transform: translateX(
    ${({ positionx, cardCount }) =>
      `calc(${positionx}px + ${-100 * (cardCount - 1)}%)`}
  );
`;

export const CardItem = styled.div`
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  color: black;
`;

export const ContentContainerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 15px;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export interface ContentCounterProps {
  index: number;
  cardCount: number;
}

export const ContentCounter = styled.div<ContentCounterProps>`
  width: 6px;
  height: 6px;
  background: ${(props) =>
    props.index === props.cardCount - 1 ? '#0095f6' : '#a8a8a8'};
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;

export default PortraitProfile;
