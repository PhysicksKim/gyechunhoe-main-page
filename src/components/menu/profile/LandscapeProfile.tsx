import React from 'react';

import chunsik from '@assets/image/chunsik_character.png';

import '@styles/menu/profile/LandscapeProfile.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export interface LandscapeProfileProps {
  animateClass: string;
  handleModalClose: () => void;
}

const LandscapeProfile: React.FC<LandscapeProfileProps> = ({
  animateClass,
  handleModalClose,
}) => {
  return (
    <div className='landscape-profile-container'>
      <div className={`gye-image-container landscape ${animateClass}`}>
        <div className='landscape-gye-image'></div>
      </div>
      <div className={`gye-profile-container landscape ${animateClass}`}>
        <div className='gye-profile'>
          <div className='gye-profile-title'>
            <h1>계춘회</h1>
          </div>
          <div
            className='landscape-modal-close-btn'
            onClick={() => handleModalClose()}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className='gye-profile-description'>
            <p>
              치지직에서 다양한 컨텐츠를 하고 있는 버츄얼 스트리머 입니다. 주력
              컨텐츠로는 PPT, VR을 이용한 예능쇼, 축구 중계, 종합게임을 하고
              있습니다.
            </p>
          </div>
          <div className='gye-profile-bio'>
            <div className='profile-item profile-item-01 birth-wrapper'>
              <div className='cat-box birth-title'>생일</div>
              <div className='profile-content birth-content'>1월 8일</div>
            </div>
            <div className='profile-item profile-item-02 height-wrapper'>
              <div className='cat-box height-title'>키</div>
              <div className='profile-content height-content'>163.8cm</div>
            </div>
            <div className='profile-item profile-item-03 age-wrapper'>
              <div className='cat-box age-title'>나이</div>
              <div className='profile-content age-content'>예쁜나이</div>
            </div>
            <div className='profile-item profile-item-04 fanname-wrapper'>
              <div className='cat-box fanname-title'>팬네임</div>
              <div className='profile-content fanname-content'>
                춘식이
                <figure className='fanname-image profile-chunsik-character'>
                  <img src={chunsik} alt='춘식이'></img>
                </figure>
              </div>
            </div>
            <div className='profile-item profile-item-05 manufacturer-wrapper'>
              <div className='cat-box manufacturer-title'>제조</div>
              <div className='profile-content manufacturer-content'>
                Sonsiru
              </div>
            </div>
            <div className='profile-item profile-item-06 assembly-wrapper'>
              <div className='cat-box assembly-title'>조립</div>
              <div className='profile-content assembly-content'>KAXA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandscapeProfile;
