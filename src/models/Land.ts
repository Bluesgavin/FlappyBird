import Game from './Game';
import config from '../config';

class Land {
  game: Game;
  y: number;
  x: number;
  image: CanvasImageSource;
  imageWidth: number;
  constructor(game: Game) {
    this.game = game;
    this.image = game.loadedResources["land"];
    this.imageWidth = this.image.width as number;
    this.x = 0;
  }

  show() {
    const canvas = this.game.canvas;
    const canvasDom = this.game.canvasDom;
    canvas.drawImage(this.image, this.x, canvasDom.height - config.landHeight);
    canvas.drawImage(this.image, this.x + this.imageWidth, canvasDom.height - config.landHeight);
    canvas.drawImage(this.image, this.x + this.imageWidth * 2, canvasDom.height - config.landHeight);
    this.update();
  }

  update() {
    this.x -= config.sceneSpeed;
    if (this.x < -this.imageWidth) {
      this.x = 0;
    }
  }
}

export default Land;