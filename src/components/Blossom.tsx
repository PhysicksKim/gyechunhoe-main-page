import React, { useEffect, useRef } from 'react';
import BlossomScene from '@src/class/BlossomScene';
import '@styles/BlossomContainer.scss';
import Petal from '@src/class/Petal';
import { BlossomSceneConfig } from '@src/types/types';

const Blossom = () => {
  const blossomContainerRef = useRef<HTMLDivElement>(null);
  const blossomSceneRef = useRef<BlossomScene | null>(null);

  useEffect(() => {
    const petalsTypes = [
      new Petal({ customClass: 'petal-style1' }),
      new Petal({ customClass: 'petal-style2' }),
    ];

    const myBlossomSceneConfig: BlossomSceneConfig = {
      id: 'blossom_container',
      petalsTypes,
      numPetals: 46,
    };

    if (blossomContainerRef.current) {
      blossomSceneRef.current = new BlossomScene(myBlossomSceneConfig);
    }

    const handleResize = () => {
      if (blossomSceneRef.current) {
        blossomSceneRef.current.updateBoundary();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // simulate
  /**
   * 아래 useEffect 에서 원하는 시뮬레이션 TestMonitorHz를 설정하고,
   * BlossomScene.updateFrame() 에서 const fps = 60; 부분을 변경하여
   * 벚꽃 업데이트 기준 속도를 60hz, 144hz, 240hz 등으로 변경해볼 수 있습니다.
   * TestMonitorHz : 시뮬레이션 할 모니터 헤르즈
   * updateFrame() fps : 벚꽃 업데이트 기준 속도
   */
  // useEffect(() => {
  //   const TestMonitorHz = 240;

  //   // 기존 코드에서 requestAnimationFrame을 setInterval로 대체
  //   const simulateHighFPS = (callback: () => void, fps: number) => {
  //     const interval = 1000 / fps;
  //     setInterval(callback, interval);
  //   };

  //   // 사용 예시
  //   simulateHighFPS(
  //     blossomSceneRef.current.updateFrame.bind(blossomSceneRef.current),
  //     TestMonitorHz,
  //   );
  // }, []);

  return <div id='blossom_container' ref={blossomContainerRef}></div>;
};

export default Blossom;
