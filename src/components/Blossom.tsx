import React, { useEffect, useRef } from 'react';
import BlossomScene from '@src/class/BlossomScene';
import '@styles/BlossomContainer.scss';
import Petal from '@src/class/Petal';
import { BlossomSceneConfig } from '@src/types/types';

const Blossom = () => {
  const blossomContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const petalsTypes = [
      new Petal({ customClass: 'petal-style1' }),
      new Petal({ customClass: 'petal-style2' }),
      // new Petal({ customClass: 'petal-style3' }),
      // new Petal({ customClass: 'petal-style4' }),
      // new Petal({ customClass: 'petal-style5' }),
    ];

    const myBlossomSceneConfig: BlossomSceneConfig = {
      id: 'blossom_container',
      petalsTypes,
      numPetals: 20,
    };

    if (blossomContainerRef.current) {
      new BlossomScene(myBlossomSceneConfig);
    }
  }, []);

  return (
    <>
      <div id='blossom_container' ref={blossomContainerRef}></div>
    </>
  );
};

export default Blossom;
