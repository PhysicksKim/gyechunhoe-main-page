import styled from 'styled-components';
import { colors } from '@styles/color';

export const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  &.before-animate {
    opacity: 0;
    transform: scale(0.8);
  }

  &.after-animate {
    opacity: 1;
    transform: scale(1);
    transition: all 0.3s ease-in-out;
  }
`;

export const NavigationBar = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  cursor: default;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  z-index: 1002;
  background-color: white;

  .nav-slide-buttons {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    z-index: 1002;

    .nav-slide-left,
    .nav-slide-right {
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      pointer-events: auto;
      color: #666;
      transition: all 0.3s ease;
      opacity: 0;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      background-color: rgba(255, 255, 255, 0.5);

      &.visible {
        opacity: 1;
      }

      &:not(.visible) {
        cursor: default;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }

    .nav-slide-left {
      margin-left: 0;
      z-index: 2000;
    }

    .nav-slide-right {
      margin-right: 0;
      z-index: 2000;
    }
  }

  .nav-items {
    display: flex;
    white-space: nowrap;
    overflow-x: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    padding: 0 40px;
    width: 100%;
    cursor: default;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    z-index: 1002;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const ContentsModalWrapper = styled.div<{
  $showBtn: boolean;
  $breakPoint: number;
}>`
  position: relative;
  width: 100%;
  height: 1px;

  .modal-close-btn {
    position: absolute;
    right: 0px;
    top: 10px;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1001;
    font-weight: 700;
    color: ${colors.softWhite};
    background-color: ${colors.darkGrey};
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: background-color 0.1s ease-in-out;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-shrink: 0;

    visibility: ${(props) =>
      props.$showBtn || props.$breakPoint < 749 ? 'visible' : 'hidden'};

    &:hover {
      background-color: ${colors.darkGreyHover};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    }
  }
`;

export const NavigationItem = styled.div<{ $isActive: boolean }>`
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? '#ff6ba9' : 'transparent')};
  background-color: ${(props) =>
    props.$isActive ? 'rgba(255, 107, 169, 0.1)' : 'transparent'};
  transition: all 0.3s ease;
  font-size: 16px;
  color: ${(props) => (props.$isActive ? '#ff6ba9' : '#666')};
  opacity: ${(props) => (props.$isActive ? 1 : 0.7)};
  flex-shrink: 0;

  &:hover {
    background-color: rgba(255, 107, 169, 0.1);
    color: #ff6ba9;
    opacity: 1;
  }
`;

export const ContentBody = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  transition: opacity 0.3s ease;

  .swipe-div {
    width: 100%;
    height: 100%;
  }
`;

export const SlideButtons = styled.div`
  position: absolute;
  top: calc(50% + 10px);
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  z-index: 2000;
  pointer-events: none;

  .slide-button-left,
  .slide-button-right {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    pointer-events: auto;
    color: #666;
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(255, 255, 255, 0.9);
      color: #333;
    }
  }
`;

export const ContentCounterWrapper = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
`;

export const ContentCounter = styled.div<{ $isActive: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${(props) => (props.$isActive ? '#ff6ba9' : '#ddd')};
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#ff6ba9' : '#ccc')};
  }
`;
