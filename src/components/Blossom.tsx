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

  return <div id='blossom_container' ref={blossomContainerRef}></div>;
};

export default Blossom;
