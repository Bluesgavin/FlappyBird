import Game from './Game';
import config from '../config';
class Background {
  game: Game;
  image: CanvasImageSource;
  imageWidth: number;
  x: number;
  constructor(game: Game) {
    this.game = game;
    this.image = game.loadedResources["bg_day"];
    this.imageWidth = this.image.width as number;
    this.x = 0;
  }

  refresh() {
    const canvas = this.game.canvas;
    const canvasDom = this.game.canvasDom;
    const bgY = canvasDom.height - config.landHeight - (this.image.height as number) + 100;
    canvas.fillStyle = "#4ec0ca";
    canvas.fillRect(0, 0, canvasDom.width, bgY);
    canvas.drawImage(this.image, this.x, bgY);
    canvas.drawImage(this.image, this.x + this.imageWidth, bgY);
    canvas.drawImage(this.image, this.x + this.imageWidth * 2, bgY);
  }

  update() {
    this.x -= config.sceneSpeed;
    if (this.x < -this.imageWidth) {
      this.x = 0;
    }
  }

  show() {
    this.refresh();
    this.update();
  }
}

export default Background;