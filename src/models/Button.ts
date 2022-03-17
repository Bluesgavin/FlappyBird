import Game from './Game';

class Button {
  game: Game;
  y: number;
  targetY: number;
  constructor(game: Game) {
    this.game = game;
    this.y = game.canvasDom.height + 70;
    this.targetY = 330;
  }

  show() {
    this.game.canvas.drawImage(this.game.loadedResources["button_play"], (this.game.canvasDom.width - 116) / 2, this.y);
    this.update();
  }

  update() {
    this.y -= 5;
    if (this.y < this.targetY) {
      this.y = this.targetY
    }
  }

  getPositionInfo() {
    const left = (this.game.canvasDom.width - 116) / 2;
    const right = left + 116
    const top = this.targetY;
    const bottom = top + 70;
    return {
      left,
      right,
      top,
      bottom
    }
  }
}

export default Button;