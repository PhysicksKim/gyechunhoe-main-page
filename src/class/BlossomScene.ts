import { BlossomSceneConfig } from '@src/types/types';
import Petal from './Petal';

class BlossomScene {
  container: HTMLElement;
  numPetals: number;
  petalsTypes: Petal[];
  gravity: number;
  windMaxSpeed: number;
  private windMagnitude: number;
  private placeholder: HTMLElement;
  private petals: Petal[];
  private windDuration: number;
  private width: number;
  private height: number;
  private timer: number;
  private lastUpdateTime: number;

  constructor(config: BlossomSceneConfig) {
    const container = document.getElementById(config.id);
    if (container === null) {
      throw new Error('[id] provided was not found in document');
    }
    this.container = container;
    this.placeholder = document.createElement('div');
    this.petals = [];
    this.numPetals = config.numPetals || 5;
    this.petalsTypes = config.petalsTypes;
    this.gravity = config.gravity || 0.8;
    this.windMaxSpeed = config.windMaxSpeed || 1.3;
    this.windMagnitude = 0.8;
    this.windDuration = 0.3;
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.timer = 0;
    this.lastUpdateTime = performance.now();

    this.container.style.overflow = 'hidden';
    this.placeholder.style.transformStyle = 'preserve-3d';
    this.placeholder.style.width = this.container.offsetWidth + 'px';
    this.placeholder.style.height = this.container.offsetHeight + 'px';
    this.container.appendChild(this.placeholder);
    this.createPetals();
    requestAnimationFrame(this.updateFrame.bind(this));
  }

  updateBoundary() {
    this.width = this.container.offsetWidth;
    this.height = this.container.offsetHeight;
    this.placeholder.style.width = this.width + 'px';
    this.placeholder.style.height = this.height + 'px';

    // Optionally, reset the petals to fit the new boundary
    // this.petals.forEach((petal) => {
    //   this.resetPetal(petal);
    // });
  }

  /**
   * Reset the petal position when it goes out of container
   */
  resetPetal(petal: Petal) {
    petal.x =
      this.width * 2 - Math.random() * this.width * 1.75 - this.width / 4;
    petal.y = petal.el.offsetHeight * -1;
    petal.z = Math.random() * 200;

    if (petal.x > this.width) {
      petal.x = this.width + petal.el.offsetWidth;
      petal.y = (Math.random() * this.height) / 2;
    }

    // Rotation
    petal.rotation.speed = Math.random() * 10;
    const randomAxis = Math.random();
    if (randomAxis > 0.5) {
      petal.rotation.axis = 'X';
    } else if (randomAxis > 0.25) {
      petal.rotation.axis = 'Y';
      petal.rotation.x = Math.random() * 180 + 90;
    } else {
      petal.rotation.axis = 'Z';
      petal.rotation.x = Math.random() * 360 - 180;
      // looks weird if the rotation is too fast around this axis
      petal.rotation.speed = Math.random() * 3;
    }

    // random speed
    petal.xSpeedVariation = Math.random() * 0.8 - 0.4;
    petal.ySpeed = Math.random() + this.gravity;

    return petal;
  }

  initPetal(petal: Petal) {
    petal.x = Math.random() * this.width; // 랜덤한 x 좌표
    petal.y = Math.random() * this.height; // 랜덤한 y 좌표
    petal.z = Math.random() * 200;

    if (petal.x > this.width) {
      petal.x = this.width + petal.el.offsetWidth;
      petal.y = (Math.random() * this.height) / 2;
    }

    // Rotation
    petal.rotation.speed = Math.random() * 10;
    const randomAxis = Math.random();
    if (randomAxis > 0.5) {
      petal.rotation.axis = 'X';
    } else if (randomAxis > 0.25) {
      petal.rotation.axis = 'Y';
      petal.rotation.x = Math.random() * 180 + 90;
    } else {
      petal.rotation.axis = 'Z';
      petal.rotation.x = Math.random() * 360 - 180;
      // looks weird if the rotation is too fast around this axis
      petal.rotation.speed = Math.random() * 3;
    }

    // random speed
    petal.xSpeedVariation = Math.random() * 0.8 - 0.4;
    petal.ySpeed = Math.random() + this.gravity;

    return petal;
  }

  /**
   * Calculate wind speed
   */
  calculateWindSpeed(t: number, y: number) {
    const a =
      ((this.windMagnitude / 2) * (this.height - (2 * y) / 3)) / this.height;
    return (
      a *
        Math.sin(((2 * Math.PI) / this.windDuration) * t + (3 * Math.PI) / 2) +
      a
    );
  }

  /**
   * Update petal position
   */
  updatePetal(petal: Petal) {
    const petalWindSpeed = this.calculateWindSpeed(this.timer, petal.y);
    const xSpeed = petalWindSpeed + petal.xSpeedVariation;

    petal.x -= xSpeed;
    petal.y += petal.ySpeed;
    petal.rotation.value += petal.rotation.speed;

    let t =
      'translateX( ' +
      petal.x +
      'px ) translateY( ' +
      petal.y +
      'px ) translateZ( ' +
      petal.z +
      'px )  rotate' +
      petal.rotation.axis +
      '( ' +
      petal.rotation.value +
      'deg )';
    if (petal.rotation.axis !== 'X') {
      t += ' rotateX(' + petal.rotation.x + 'deg)';
    }
    petal.el.style.transform = t;

    // reset if out of view
    if (petal.x < -10 || petal.y > this.height + 10) {
      this.resetPetal(petal);
    }
  }

  /**
   * Change the wind speed
   */
  updateWind() {
    // wind duration should be related to wind magnitude, e.g. higher windspeed means longer gust duration
    this.windMagnitude = Math.random() * this.windMaxSpeed;
    this.windDuration = this.windMagnitude * 50 + (Math.random() * 20 - 10);
  }

  /**
   * Create the petals elements
   */
  createPetals() {
    for (let i = 0; i < this.numPetals; i++) {
      const tmpPetalType =
        this.petalsTypes[
          Math.floor(Math.random() * (this.petalsTypes.length - 1))
        ];
      const tmpPetal = new Petal({ customClass: tmpPetalType.customClass });

      this.initPetal(tmpPetal);
      this.petals.push(tmpPetal);
      this.placeholder.appendChild(tmpPetal.el);
    }
  }

  updateFrame() {
    const now = performance.now();
    const delta = now - this.lastUpdateTime;
    const fps = 60;

    // 60fps 기준으로 업데이트, 원하는 fps로 변경 가능
    if (delta >= 1000 / fps) {
      this.timer += delta / 1000;

      if (this.timer >= this.windDuration) {
        this.updateWind();
        this.timer = 0;
      }

      const petalsLen = this.petals.length;
      for (let i = 0; i < petalsLen; i++) {
        this.updatePetal(this.petals[i]);
      }

      this.lastUpdateTime = now;
    }

    requestAnimationFrame(this.updateFrame.bind(this));
  }
}

export default BlossomScene;
