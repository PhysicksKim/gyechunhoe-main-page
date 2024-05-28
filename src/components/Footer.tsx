import exp from 'constants';
import React from 'react';
import ChzzkLogo from '@assets/image/logo_chzzk.png';
import YoutubeLogo from '@assets/image/logo_youtube.png';
import NaverCafeLogo from '@assets/image/logo_naver_cafe.png';

const Footer = () => {
  return (
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
  );
};

export default Footer;
