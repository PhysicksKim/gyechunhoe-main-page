import styled from 'styled-components';

export const ProfileContent = styled.div`
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

export const CardWrapperDiv = styled.div<CardDivProps>`
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform ${({ endSwipe }) => (endSwipe ? '0.5s' : '0s')};
  transform: translateX(
    ${({ positionx, cardCount }) =>
      `calc(${positionx}px + ${-100 * (cardCount - 1)}%)`}
  );
  user-select: none;
`;

export const CardItem = styled.div`
  width: 300px;
  height: 100%;
  flex-shrink: 0;
  object-fit: cover;
  color: black;
`;

export const ContentCounterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 17px;
  left: 50%;
  transform: translateX(-50%);
  /* background-color: #333333; */
  padding: 5px 10px;
  box-sizing: border-box;
  border-radius: 20px;
`;

export interface ContentCounterProps {
  index: number;
  cardCount: number;
}

export const ContentCounter = styled.div<ContentCounterProps>`
  width: 6px;
  height: 6px;
  background: ${(props) =>
    props.index === props.cardCount - 1 ? '#ff6ba9' : '#a0a0a0'};
  border-radius: 50%;
  &:not(:last-of-type) {
    margin-right: 4px;
  }
`;
