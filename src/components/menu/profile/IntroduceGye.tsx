import React, { useEffect, useState } from 'react';

import PortraitProfile from './PortraitProfile';
import DesktopProfile from './DesktopProfile';
import LandscapeProfile from './LandscapeProfile';

interface IntroduceGyeProps {
  modalContentRef?: React.Ref<HTMLDivElement>;
  isOpen: boolean;
  handleModalClose: () => void;
  isSmallViewport: boolean;
  isPortrait: boolean;
  isMobileRatio: boolean;
}

const IntroduceGye: React.FC<IntroduceGyeProps> = ({
  modalContentRef,
  isOpen,
  handleModalClose,
  isSmallViewport,
  isPortrait = false,
  isMobileRatio,
}) => {
  const [animateClass, setAnimateClass] = useState('before-animate');

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimateClass('after-animate');
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setAnimateClass('before-animate');
    }
  }, [isOpen]);

  useEffect(() => {
    console.log(`isPortrait: ${isPortrait}`);
    console.log(`isSmallViewport: ${isSmallViewport}`);
  }, [isPortrait, isSmallViewport]);

  return (
    <div
      className={`introduce-gye-container ${isOpen ? 'open' : ''} ${
        !isSmallViewport ? 'desktop' : isPortrait ? 'portrait' : 'landscape'
      }`}
    >
      {!isSmallViewport ? (
        <DesktopProfile animateClass={animateClass} />
      ) : isPortrait ? (
        <PortraitProfile
          animateClass={animateClass}
          handleModalClose={handleModalClose}
        />
      ) : (
        <LandscapeProfile
          animateClass={animateClass}
          handleModalClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default IntroduceGye;
