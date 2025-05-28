import React from 'react';
import styled from 'styled-components';
import { Content } from '@src/types/content';

interface ContentSlideProps {
  content: Content;
  endSwipe: boolean;
  positionx: number;
  cardCount: number;
}

const SlideWrapper = styled.div<{
  $endSwipe: boolean;
  $positionx: number;
  $cardCount: number;
}>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform ${({ $endSwipe }) => ($endSwipe ? '0.5s' : '0s')};
  transform: translateX(
    ${({ $positionx, $cardCount }) =>
      `calc(${$positionx}px + ${-100 * ($cardCount - 1)}%)`}
  );
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

const SlideItem = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
`;

const ContentSlide: React.FC<ContentSlideProps> = ({
  content,
  endSwipe,
  positionx,
  cardCount,
}) => {
  return (
    <SlideWrapper
      $endSwipe={endSwipe}
      $positionx={positionx}
      $cardCount={cardCount}
    >
      <SlideItem key={`${content.name}-poster`}>
        <img src={content.poster} alt={content.name} />
      </SlideItem>
      {content.images.map((image, index) => (
        <SlideItem key={index + content.name}>
          <img src={image} alt={`${content.name} - ${index + 1}`} />
        </SlideItem>
      ))}
    </SlideWrapper>
  );
};

export default ContentSlide;
