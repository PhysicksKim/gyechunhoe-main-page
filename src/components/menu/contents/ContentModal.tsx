import React, { useState, useEffect, useRef } from 'react';
import Swipe from 'react-easy-swipe';
import { debounce } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretLeft,
  faCaretRight,
  faChevronLeft,
  faChevronRight,
  faClose,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { ContentType } from '@src/types/content';
import { CONTENTS } from '@src/assets/contents';
import {
  ModalContent,
  NavigationBar,
  NavigationItem,
  ContentBody,
  SlideButtons,
  ContentCounterWrapper,
  ContentCounter,
  ContentsModalWrapper,
} from './ContentModalStyledComps';
import ContentSlide from './ContentSlide';

interface ContentModalProps {
  isOpen: boolean;
  handleModalClose: () => void;
  isSmallViewport: boolean;
  isPortrait: boolean;
  isMobileRatio: boolean;
}

const ContentsModal: React.FC<ContentModalProps> = ({
  isOpen,
  handleModalClose,
  isSmallViewport,
  isPortrait,
  isMobileRatio,
}) => {
  const [selectedContent, setSelectedContent] = useState<ContentType>('jjak');
  const [positionx, setPositionx] = useState<number>(0);
  const [cardCount, setCardCount] = useState<number>(1);
  const [endSwipe, setEndSwipe] = useState<boolean>(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const navItemsRef = useRef<HTMLDivElement>(null);

  const currentContent = CONTENTS.find(
    (content) => content.type === selectedContent,
  );

  // 현재 선택된 컨텐츠의 이미지 개수 계산
  const totalImages = currentContent ? currentContent.images.length : 0;

  useEffect(() => {
    const checkScrollButtons = () => {
      if (navItemsRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = navItemsRef.current;
        setShowLeftButton(scrollLeft > 0);
        setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    const debouncedCheckScrollButtons = debounce(checkScrollButtons, 100);

    // 초기 실행
    debouncedCheckScrollButtons();

    // resize 이벤트 리스너 추가
    window.addEventListener('resize', debouncedCheckScrollButtons);

    return () => {
      window.removeEventListener('resize', debouncedCheckScrollButtons);
      debouncedCheckScrollButtons.cancel(); // debounce 취소
    };
  }, []);

  // 스크롤 이벤트 핸들러
  const handleNavScroll = () => {
    if (navItemsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navItemsRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1); // 1px 여유 추가
    }
  };

  const scrollToContent = (type: ContentType) => {
    if (navItemsRef.current) {
      const selectedItem = navItemsRef.current.querySelector(
        `[data-type="${type}"]`,
      );
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  };

  const onSwipeMove = (position: { x: number }) => {
    setEndSwipe(false);
    if (cardCount === 1 && position.x < 0) {
      setPositionx(() => position.x);
      return;
    }
    if (cardCount > 1 && cardCount < totalImages) {
      setPositionx(() => position.x);
      return;
    }
    if (cardCount === totalImages && position.x > 0) {
      setPositionx(() => position.x);
      return;
    }
  };

  const onSwipeEnd = () => {
    if (positionx < -20) {
      setCardCount((cardCount) => Math.min(cardCount + 1, totalImages));
    }
    if (positionx > 20) {
      setCardCount((cardCount) => Math.max(cardCount - 1, 1));
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
    if (cardCount < totalImages) {
      setCardCount((cardCount) => cardCount + 1);
    }
  };

  const handleNavClick = (type: ContentType) => {
    setSelectedContent(type);
    setCardCount(1);
    scrollToContent(type);
  };

  const handleNavSwipe = (direction: 'left' | 'right') => {
    if (navItemsRef.current) {
      const scrollAmount = 200; // 스크롤할 픽셀 양
      const newScrollLeft =
        direction === 'left'
          ? navItemsRef.current.scrollLeft - scrollAmount
          : navItemsRef.current.scrollLeft + scrollAmount;

      navItemsRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleCounterClick = (index: number) => {
    setCardCount(index + 1);
  };

  return (
    <ModalContent>
      <NavigationBar>
        <div ref={navItemsRef} className='nav-items' onScroll={handleNavScroll}>
          {CONTENTS.map((content) => (
            <NavigationItem
              key={content.type}
              $isActive={content.type === selectedContent}
              onClick={() => handleNavClick(content.type)}
              data-type={content.type}
            >
              {content.name}
            </NavigationItem>
          ))}
        </div>

        <div className='nav-slide-buttons'>
          <div
            className={`nav-slide-left ${showLeftButton ? 'visible' : ''}`}
            onClick={() => handleNavSwipe('left')}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </div>
          <div
            className={`nav-slide-right ${showRightButton ? 'visible' : ''}`}
            onClick={() => handleNavSwipe('right')}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>
      </NavigationBar>
      <ContentsModalWrapper
        $showBtn={isMobileRatio || isSmallViewport}
        $breakPoint={750}
      >
        <div className='modal-close-btn' onClick={handleModalClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </ContentsModalWrapper>

      <ContentBody>
        <Swipe
          className='swipe-div'
          allowMouseEvents={true}
          onSwipeMove={onSwipeMove}
          onSwipeEnd={onSwipeEnd}
        >
          {currentContent && (
            <ContentSlide
              content={currentContent}
              endSwipe={endSwipe}
              positionx={positionx}
              cardCount={cardCount}
            />
          )}
        </Swipe>
      </ContentBody>

      <SlideButtons>
        <div className='slide-button-left' onClick={onClickLeft}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </div>
        <div className='slide-button-right' onClick={onClickRight}>
          <FontAwesomeIcon icon={faCaretRight} />
        </div>
      </SlideButtons>

      <ContentCounterWrapper key={cardCount}>
        {Array.from({ length: totalImages }).map((_, index) => (
          <ContentCounter
            key={index}
            $isActive={index + 1 === cardCount}
            onClick={() => handleCounterClick(index)}
          />
        ))}
      </ContentCounterWrapper>
    </ModalContent>
  );
};

export default ContentsModal;
