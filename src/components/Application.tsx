import React, { useEffect, useState } from 'react';
import IndexPageRoot from './IndexPageRoot';
import '@styles/Application.scss';
import GyeSanabiMp3 from '@assets/audio/gyechunhoe-SanabiOST.mp3';
import useSound from 'use-sound';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

const Application: React.FC = () => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);
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
    </div>
  );
};

export default Application;
