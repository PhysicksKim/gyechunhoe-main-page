import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
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
import { CONTENTS, DEFAULT_CONTENT } from '@src/assets/contents/contents';
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

// NavigationBar 컴포넌트를 메모이제이션 - selectedContent가 변경될 때만 리렌더링
const MemoizedNavigationBar = React.memo<{
  selectedContent: ContentType;
  navItemsRef: React.RefObject<HTMLDivElement>;
  showLeftButton: boolean;
  showRightButton: boolean;
  handleNavClick: (type: ContentType) => void;
  handleNavSwipe: (direction: 'left' | 'right') => void;
  handleNavScroll: () => void;
}>(
  ({
    selectedContent,
    navItemsRef,
    showLeftButton,
    showRightButton,
    handleNavClick,
    handleNavSwipe,
    handleNavScroll,
  }) => (
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
  ),
);

MemoizedNavigationBar.displayName = 'MemoizedNavigationBar';

// SlideButtons 컴포넌트를 메모이제이션 - cardCount가 변경될 때만 리렌더링
const MemoizedSlideButtons = React.memo<{
  cardCount: number;
  totalImages: number;
  onClickLeft: () => void;
  onClickRight: () => void;
}>(({ cardCount, totalImages, onClickLeft, onClickRight }) => (
  <SlideButtons>
    <div className='slide-button-left' onClick={onClickLeft}>
      <FontAwesomeIcon icon={faCaretLeft} />
    </div>
    <div className='slide-button-right' onClick={onClickRight}>
      <FontAwesomeIcon icon={faCaretRight} />
    </div>
  </SlideButtons>
));

MemoizedSlideButtons.displayName = 'MemoizedSlideButtons';

// ContentCounter 컴포넌트를 메모이제이션 - cardCount가 변경될 때만 리렌더링
const MemoizedContentCounter = React.memo<{
  totalImages: number;
  cardCount: number;
  handleCounterClick: (index: number) => void;
}>(({ totalImages, cardCount, handleCounterClick }) => (
  <ContentCounterWrapper key={cardCount}>
    {Array.from({ length: totalImages }).map((_, index) => (
      <ContentCounter
        key={index}
        $isActive={index + 1 === cardCount}
        onClick={() => handleCounterClick(index)}
      />
    ))}
  </ContentCounterWrapper>
));

MemoizedContentCounter.displayName = 'MemoizedContentCounter';

// ContentBody 컴포넌트를 메모이제이션 - 스와이프 중에도 이미지만 업데이트
const MemoizedContentBody = React.memo<{
  currentContent: any;
  endSwipe: boolean;
  positionx: number;
  cardCount: number;
  onSwipeMove: (position: { x: number }) => void;
  onSwipeEnd: () => void;
}>(
  ({
    currentContent,
    endSwipe,
    positionx,
    cardCount,
    onSwipeMove,
    onSwipeEnd,
  }) => (
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
  ),
);

MemoizedContentBody.displayName = 'MemoizedContentBody';

const ContentsModal: React.FC<ContentModalProps> = ({
  isOpen,
  handleModalClose,
  isSmallViewport,
  isPortrait,
  isMobileRatio,
}) => {
  const [selectedContent, setSelectedContent] =
    useState<ContentType>(DEFAULT_CONTENT);
  const [positionx, setPositionx] = useState<number>(0);
  const [cardCount, setCardCount] = useState<number>(1);
  const [endSwipe, setEndSwipe] = useState<boolean>(true);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const navItemsRef = useRef<HTMLDivElement>(null);

  // currentContent를 useMemo로 메모이제이션 - selectedContent가 변경될 때만 재계산
  const currentContent = useMemo(
    () => CONTENTS.find((content) => content.type === selectedContent),
    [selectedContent],
  );

  // totalImages를 useMemo로 메모이제이션 - currentContent가 변경될 때만 재계산
  const totalImages = useMemo(
    () => (currentContent ? currentContent.images.length + 1 : 0),
    [currentContent],
  );

  // 스크롤 버튼 체크 함수를 useCallback으로 메모이제이션
  const checkScrollButtons = useCallback(() => {
    if (navItemsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navItemsRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const debouncedCheckScrollButtons = debounce(checkScrollButtons, 100);

    // 초기 실행
    debouncedCheckScrollButtons();

    // resize 이벤트 리스너 추가
    window.addEventListener('resize', debouncedCheckScrollButtons);

    return () => {
      window.removeEventListener('resize', debouncedCheckScrollButtons);
      debouncedCheckScrollButtons.cancel(); // debounce 취소
    };
  }, [checkScrollButtons]);

  // 스크롤 이벤트 핸들러를 useCallback으로 메모이제이션
  const handleNavScroll = useCallback(() => {
    if (navItemsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navItemsRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1); // 1px 여유 추가
    }
  }, []);

  const scrollToContent = useCallback((type: ContentType) => {
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
  }, []);

  // 스와이프 중에는 이미지만 업데이트하도록 최적화
  const onSwipeMove = useCallback(
    (position: { x: number }) => {
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
    },
    [cardCount, totalImages],
  );

  // 스와이프가 끝난 후에만 다른 요소들이 리렌더링되도록 최적화
  const onSwipeEnd = useCallback(() => {
    if (positionx < -20) {
      setCardCount((cardCount) => Math.min(cardCount + 1, totalImages));
    }
    if (positionx > 20) {
      setCardCount((cardCount) => Math.max(cardCount - 1, 1));
    }
    setPositionx(() => 0);
    setEndSwipe(true);
  }, [positionx, totalImages]);

  const onClickLeft = useCallback(() => {
    if (cardCount > 1) {
      setCardCount((cardCount) => cardCount - 1);
    }
  }, [cardCount]);

  const onClickRight = useCallback(() => {
    if (cardCount < totalImages) {
      setCardCount((cardCount) => cardCount + 1);
    }
  }, [cardCount, totalImages]);

  const handleNavClick = useCallback(
    (type: ContentType) => {
      setSelectedContent(type);
      setCardCount(1);
      scrollToContent(type);
    },
    [scrollToContent],
  );

  const handleNavSwipe = useCallback((direction: 'left' | 'right') => {
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
  }, []);

  const handleCounterClick = useCallback((index: number) => {
    setCardCount(index + 1);
  }, []);

  return (
    <ModalContent>
      <MemoizedNavigationBar
        selectedContent={selectedContent}
        navItemsRef={navItemsRef}
        showLeftButton={showLeftButton}
        showRightButton={showRightButton}
        handleNavClick={handleNavClick}
        handleNavSwipe={handleNavSwipe}
        handleNavScroll={handleNavScroll}
      />

      <ContentsModalWrapper
        $showBtn={isMobileRatio || isSmallViewport}
        $breakPoint={750}
      >
        <div className='modal-close-btn' onClick={handleModalClose}>
          <FontAwesomeIcon icon={faClose} />
        </div>
      </ContentsModalWrapper>

      <MemoizedContentBody
        currentContent={currentContent}
        endSwipe={endSwipe}
        positionx={positionx}
        cardCount={cardCount}
        onSwipeMove={onSwipeMove}
        onSwipeEnd={onSwipeEnd}
      />

      <MemoizedSlideButtons
        cardCount={cardCount}
        totalImages={totalImages}
        onClickLeft={onClickLeft}
        onClickRight={onClickRight}
      />

      <MemoizedContentCounter
        totalImages={totalImages}
        cardCount={cardCount}
        handleCounterClick={handleCounterClick}
      />
    </ModalContent>
  );
};

export default React.memo(ContentsModal);
