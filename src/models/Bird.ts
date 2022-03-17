import Game from "./Game";
import config from "../config";

class Brid {
  game: Game;
  image: CanvasImageSource[];
  y: number;
  x: number;
  deg: number;
  wing: number;
  dy: number;
  direction: 'down' | 'up';
  frame: number;
  sound: HTMLAudioElement;
  boomState: number;
  constructor(game: Game) {
    this.game = game;
    this.image = [game.loadedResources['bird0_0'], game.loadedResources['bird0_1'], game.loadedResources['bird0_2']];
    this.y = 100;
    this.x = game.canvasDom.width / 2 * 0.618;
    this.deg = 0;
    this.wing = 0;
    this.direction = 'down';
    this.dy = 0.2;
    this.frame = 0;
    this.sound = document.getElementById('fly') as HTMLAudioElement;
    this.boomState = 0;
  }

  show() {
    this.game.canvas.drawImage(this.game.loadedResources["bird1_2"], (this.game.canvasDom.width - 48) / 2, this.y);
    this.update();
  }

  update() {
    if (this.direction == "down") {
      this.y += 2;
      if (this.y > 230) {
        this.direction = "up"
      }
    } else if (this.direction == "up") {
      this.y -= 2;
      if (this.y < 170) {
        this.direction = "down"
      }
    }
  }

  refresh() {
    const canvas = this.game.canvas;
    this.frame++;
    canvas.save();
    canvas.translate(this.x, this.y);
    canvas.rotate(this.deg);
    canvas.drawImage(this.image[this.wing], -24, -24);
    canvas.restore();
  }

  render() {
    this.refresh();
    this.dy += config.birdfallHeight;
    this.deg += 0.06;
    this.y += this.dy;
    this.frame % 2 == 0 && this.wing++;
    if (this.wing > 2) { this.wing = 0; }
  }

  dying() {
    this.y += 20;
    this.deg += 0.5;
    if (this.deg > 1.57) {
      this.deg = 1.57;
    }
    this.refresh();
  }

  jump() {
    this.dy = -config.birdJumpHeight;
    this.deg = -1;
    this.sound.play();
  }

  getWrap() {
    const imgHeight = (this.image[0].height as number) / 2;
    const imgWidth = (this.image[0].width as number) / 2;
    return {
      left: this.x - imgWidth,
      right: this.x + imgWidth,
      top: this.y - imgHeight,
      bottom: this.y + imgHeight
    }
  }

}

export default Brid;