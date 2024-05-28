import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import IndexPageRoot from './IndexPageRoot';

import '@styles/Application.scss';
import '@styles/Fonts.scss';

import GyeSanabiMp3 from '@assets/audio/gyechunhoe-SanabiOST.mp3';

import MediaPreloader from './MediaPreloader';
import { useMediaQuery } from 'react-responsive';
import VolumeBar from './VolumeBar';
import Footer from './Footer';

const Application: React.FC = () => {
  const [soundVolume, setSoundVolume] = useState(0.15);
  const [play, exposedData] = useSound(GyeSanabiMp3, {
    volume: soundVolume,
    loop: true,
    autoplay: true,
  });
  const [prevVolumn, setPrevVolumn] = useState(0);
  const isMobileRatio = useMediaQuery({ query: '(max-aspect-ratio: 3/5)' });

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(event.target.value);
    setSoundVolume(volume);
  };

  const handleOnclickVolumeIcon = () => {
    if (soundVolume > 0) {
      // 들리는 상태인 경우
      setPrevVolumn(soundVolume);
      setSoundVolume(0);
    } else {
      // 뮤트 상태인 경우
      setSoundVolume(prevVolumn);
    }
  };

  return (
    <div className='app-root-container'>
      <MediaPreloader />
      <VolumeBar
        soundVolume={soundVolume}
        isMobileRatio={isMobileRatio}
        handleVolumeChange={handleVolumeChange}
        handleOnclickVolumeIcon={handleOnclickVolumeIcon}
      />
      <IndexPageRoot isMobileRatio={isMobileRatio} />
      <Footer />
    </div>
  );
};

export default Application;
