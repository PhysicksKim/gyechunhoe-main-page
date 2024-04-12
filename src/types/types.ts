import Petal from '@src/class/Petal';

export type BlossomSceneConfig = {
  id: string;
  petalsTypes: Petal[];
  numPetals?: number;
  gravity?: number;
  windMaxSpeed?: number;
};

export interface PetalConfig {
  customClass?: string;
  x?: number;
  y?: number;
  z?: number;
  xSpeedVariation?: number;
  ySpeed?: number;
  rotation?: PetalRotation;
}

export type PetalRotation = {
  axis: 'X' | 'Y' | 'Z';
  value: number;
  speed: number;
  x: number;
};
