import Game from './Game';

class Title {
  game: Game;
  y: number;
  targetY: number;
  constructor(game: Game) {
    this.game = game;
    this.y = -48;
    this.targetY = 120;
  }

  show() {
    this.game.canvas.drawImage(this.game.loadedResources["title"], (this.game.canvasDom.width - 178) / 2, this.y);
    this.update();
  }
  update() {
    this.y += 2;
    if (this.y > this.targetY) {
      this.y = this.targetY
    }
  }
}

export default Title;