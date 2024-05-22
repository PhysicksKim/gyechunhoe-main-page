import React, { useEffect, useState } from 'react';
import Gye2d01 from '@assets/image/gyechunhoe_live2d_01.png';
import Gye2d02 from '@assets/image/gyechunhoe_live2d_02.png';
import '@styles/IntroduceGye.scss';

interface IntroduceGyeProps {
  isOpen: boolean;
}

const IntroduceGye: React.FC<IntroduceGyeProps> = ({ isOpen }) => {
  const [animateClass, setAnimateClass] = useState('before-animate');

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setAnimateClass('after-animate');
      }, 100); // 약간의 지연 후 클래스 변경
      return () => clearTimeout(timer);
    } else {
      setAnimateClass('before-animate');
    }
  }, [isOpen]);

  return (
    <div className={`introduce-gye-container ${isOpen ? 'open' : ''}`}>
      <div className='gye-image-container'>
        <img
          className={`gye-image ${animateClass}`}
          src={Gye2d02}
          alt='Gye Image'
        />
      </div>
      <div className='gye-profile-container'>
        <div className={`gye-profile ${animateClass}`}>
          <div className='gye-profile-title'>
            <h1>계춘회</h1>
          </div>
          <div className='gye-profile-bio'>
            <p>생일 - 1월 8일</p>
            <p>키 - 163.8</p>
            <p>나이 - 예쁜나이</p>
            <p>팬네임 - 춘식이</p>
            <p>제조 - Sonsiru </p>
            <p>조립 - KAXA</p>
          </div>
          <div className='gye-profile-description'>
            <h3>소개말</h3>
            <p>
              치지직에서 다양한 컨텐츠를 하고 있는 버츄얼 스트리머 입니다. 주력
              컨텐츠로는 PPT, VR을 이용한 예능쇼, 축구 중계, 종합게임을 하고
              있습니다.
            </p>
          </div>
          <div className='gye-social'>소셜</div>
        </div>
      </div>
    </div>
  );
};

export default IntroduceGye;
