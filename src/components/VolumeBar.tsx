import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

import '@styles/VolumeBar.scss';

export interface VolumeBarProps {
  soundVolume: number;
  isMobileRatio: boolean;
  handleVolumeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnclickVolumeIcon: () => void;
}

const VolumeBar: React.FC<VolumeBarProps> = ({
  soundVolume,
  isMobileRatio,
  handleVolumeChange,
  handleOnclickVolumeIcon,
}) => {
  return (
    <div
      className={`audio-control ${
        isMobileRatio ? 'mobile-audio-control' : 'desktop-audio-control'
      }`}
    >
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
  );
};

export default VolumeBar;
