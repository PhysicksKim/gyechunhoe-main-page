import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import IndexPageRoot from './IndexPageRoot';

import '@styles/Application.scss';
import '@styles/Fonts.scss';

import ChzzkLogo from '@assets/image/logo_chzzk.png';
import YoutubeLogo from '@assets/image/logo_youtube.png';
import NaverCafeLogo from '@assets/image/logo_naver_cafe.png';
import GyeSanabiMp3 from '@assets/audio/gyechunhoe-SanabiOST.mp3';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';
import MediaPreloader from './MediaPreloader';

const Application: React.FC = () => {
  const [soundVolume, setSoundVolume] = useState(0.15);
  const [play, exposedData] = useSound(GyeSanabiMp3, {
    volume: soundVolume,
    loop: true,
    autoplay: true,
  });
  const [prevVolumn, setPrevVolumn] = useState(0);

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
      <div className='audio-control'>
        {soundVolume > 0 ? (
          <>
            <FontAwesomeIcon
              icon={faVolumeHigh}
              onClick={handleOnclickVolumeIcon}
            ></FontAwesomeIcon>
          </>
        ) : (
          <>
            <FontAwesomeIcon
              icon={faVolumeMute}
              onClick={handleOnclickVolumeIcon}
            ></FontAwesomeIcon>
          </>
        )}
        <input
          className='sound-volume'
          type='range'
          min='0'
          max='1'
          step='0.05'
          value={soundVolume}
          onChange={handleVolumeChange}
        />
      </div>
      <IndexPageRoot />
      <div className='footer'>
        <div className='links'>
          <a
            href='https://chzzk.naver.com/live/a9a343510e132ea3026ff3cf682820b5'
            target='_blank'
            rel='noreferrer'
          >
            <img src={ChzzkLogo} />
          </a>
          <a
            href='https://www.youtube.com/@chunhoe_'
            target='_blank'
            rel='noreferrer'
          >
            <img src={YoutubeLogo} />
          </a>
          <a
            href='https://cafe.naver.com/chunhoe'
            target='_blank'
            rel='noreferrer'
          >
            <img src={NaverCafeLogo} />
          </a>
        </div>
        <div className='background-art-author'>Background Art : Melco</div>
      </div>
    </div>
  );
};

export default Application;
