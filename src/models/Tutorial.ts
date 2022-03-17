import Game from "./Game";

class Tutorial {
  opacity: number;
  readyY: number;
  state: 'down' | 'up';
  game: Game;
  constructor(game: Game) {
    this.opacity = 0;
    this.state = 'down';
    this.readyY = -62;
    this.game = game;
  }

  show() {
    this.game.canvas.drawImage(this.game.loadedResources["text_ready"], (this.game.canvasDom.width - 196) / 2, this.readyY);
    this.game.canvas.drawImage(this.game.loadedResources["tutorial"], (this.game.canvasDom.width - 114) / 2, 250);
    // this.game.canvas.globalAlpha = this.opacity;
    this.update();
  }

  update() {
    this.readyY += 2;
    if (this.readyY > 130) {
      this.readyY = 130;
    }

    // if (this.state == "down") {
    //   this.opacity -= 0.02;
    //   if (this.opacity <= 0.5) {
    //     this.state = "up"
    //   }
    // } else if (this.state == "up") {
    //   this.opacity += 0.02;
    //   if (this.opacity >= 1) {
    //     this.state = "down"
    //   }
    // }
  }
}

export default Tutorial;