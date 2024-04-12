import { PetalConfig, PetalRotation } from '@src/types/types';

class Petal implements PetalConfig {
  customClass?: string;
  x?: number;
  y?: number;
  z?: number;
  xSpeedVariation?: number;
  ySpeed?: number;
  rotation?: PetalRotation;
  el: HTMLElement;

  constructor(config: PetalConfig) {
    this.customClass = config.customClass || '';
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.z = config.z || 0;
    this.xSpeedVariation = config.xSpeedVariation || 0;
    this.ySpeed = config.ySpeed || 0;
    this.rotation = {
      axis: 'X',
      value: 0,
      speed: 0,
      x: 0,
    };

    if (config.rotation && typeof config.rotation === 'object') {
      this.rotation.axis = config.rotation.axis || this.rotation.axis;
      this.rotation.value = config.rotation.value || this.rotation.value;
      this.rotation.speed = config.rotation.speed || this.rotation.speed;
      this.rotation.x = config.rotation.x || this.rotation.x;
    }

    this.el = document.createElement('div');
    this.el.className = 'petal ' + this.customClass;
    this.el.style.position = 'absolute';
    this.el.style.backfaceVisibility = 'visible';
  }
}

export default Petal;
