import Game from "./Game";
import Bird from "./Bird";
import config from "../config";

const random = (x: number, y: number): number => {
  return Math.round(Math.random() * (y - x) + x)
}

class Pipe {
  game: Game;
  x: number;
  downPipe: CanvasImageSource;
  upPipe: CanvasImageSource;
  space: number;
  downHeight: number;
  upHeight: number;
  downImageWidth: number;
  upImageWidth: number;
  constructor(game: Game) {
    this.game = game;
    this.x = game.canvasDom.width;
    this.downPipe = game.loadedResources["pipe_down"];
    this.upPipe = game.loadedResources["pipe_up"];
    this.downImageWidth = this.downPipe.width as number;
    this.upImageWidth = this.upPipe.width as number;
    this.space = config.pipeSpace;
    this.downHeight = random(30, 220);
    this.upHeight = game.canvasDom.height - this.downHeight - this.space - config.landHeight;
  }

  show() {
    // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.game.canvas.drawImage(this.downPipe, 0, (this.downPipe.height as number) - this.downHeight, this.downImageWidth, this.downHeight, this.x, 0, this.downImageWidth, this.downHeight);
    this.game.canvas.drawImage(this.upPipe, 0, 0, this.upImageWidth, this.upHeight, this.x, this.downHeight + this.space, this.upImageWidth, this.upHeight);
    this.update();
  }

  update() {
    this.x -= config.sceneSpeed;
  }

  getWrap() {
    return {
      left: this.x,
      right: this.x + this.downImageWidth,
      bottom: this.downHeight + this.space,
      top: this.downHeight
    }
  }
}


class PipeScene {
  game: Game;
  frame: number;
  pipeList: Pipe[];
  bird: Bird;
  constructor(game: Game) {
    this.game = game;
    this.pipeList = [];
    this.frame = 0;
  }

  show() {
    this.frame++;
    if ((this.frame * config.sceneSpeed) % config.pipeDistance === 0) {
      const pipe = new Pipe(this.game);
      this.game.setScoreAble();
      this.pipeList.push(pipe);
      if (this.pipeList.length > 10) this.pipeList.shift();
    }
    this.update();
  }

  update() {
    for (const pipe of this.pipeList) {
      pipe.show();
    }
  }

}

export default PipeScene;