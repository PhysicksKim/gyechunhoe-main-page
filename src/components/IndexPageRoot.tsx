import React, { useEffect, useRef } from 'react';
import '@styles/IndexPageRoot.scss';
import Blossom from './Blossom';
import Board from '@assets/images/board01.png';

const IndexPageRoot = () => {
  return (
    <div className='main-background'>
      <div className='header'>
        header
        <div className='board'>
          <button className='btn-concert'>Concert</button>
          <button className='btn-football'>Football</button>
        </div>
      </div>
      <Blossom />
    </div>
  );
};
export default IndexPageRoot;
