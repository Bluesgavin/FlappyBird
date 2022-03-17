import Game from './Game';
import Title from './Title';
import Button from './Button';
import Brid from './Bird';
import Background from './Background';
import Tutorial from './Tutorial';
import PipeScene from './PipeScene';
import Land from './Land';

class ScreenManager {
  title: Title;
  button: Button;
  bird: Brid;
  land: Land;
  background: Background;
  pipeScene: PipeScene;
  game: Game;
  tutorial: Tutorial;
  scene: 'MENU' | 'TUTORIAL' | 'STARTED' | 'END';
  dieSound: HTMLAudioElement;
  boomState: number
  bgOpacity: number;


  constructor(game: Game) {
    this.scene = 'MENU';
    this.game = game;
    this.dieSound = document.getElementById('fly') as HTMLAudioElement;
  }

  init() {
    this.game.clearScore();
    this.background = new Background(this.game);
    this.bird = new Brid(this.game);
    this.land = new Land(this.game);
    this.button = new Button(this.game);
    this.title = new Title(this.game);
    this.bindEvent();
  }

  initTutorial() {
    this.button = null;
    this.title = null;
    this.tutorial = new Tutorial(this.game);
  }

  initGame() {
    this.tutorial = null;
    this.pipeScene = new PipeScene(this.game);
  }

  initEnd() {
    this.boomState = 0;
    this.bgOpacity = 1;
  }


  render() {
    switch (this.scene) {
      case "MENU":
        this.renderMenu();
        break;
      case 'TUTORIAL':
        this.renderTutorial();
        break;
      case 'STARTED':
        this.renderGame();
        break;
      case 'END':
        this.renderEnd();
        break;
    }
  }

  renderMenu() {
    this.background.show();
    this.land.show();
    this.title.show();
    this.button.show();
    this.bird.show();
  }

  renderTutorial() {
    this.background.show();
    this.land.show();
    this.tutorial.show();
  }

  renderGame() {
    this.background.show();
    this.land.show();
    this.pipeScene.show();
    this.bird.render();
    this.checkCrash();
  }

  renderEnd() {
    const bird = this.bird;
    const canvas = this.game.canvas;

    this.background.show();
    this.land.show();
    this.pipeScene.show();
    this.bird.dying();

    if (bird.y > this.game.canvasDom.height - 112 - 12) {
      bird.y = this.game.canvasDom.height - 112 - 12;
      this.game.frame % 5 == 0 && this.boomState++;
      if (this.boomState >= 11) {
        this.boomState = 11;
        this.scene = 'MENU';
        this.init();
      }
    }

    this.bgOpacity = this.bgOpacity < 0.03 ? 0 : this.bgOpacity - 0.03;
    canvas.drawImage(this.game.loadedResources["b" + this.boomState], bird.x - 50, bird.y - 100);
    canvas.save();
    canvas.globalAlpha = this.bgOpacity;
    canvas.drawImage(this.game.loadedResources["gameoverbg"], 0, 0, this.game.canvasDom.width, this.game.canvasDom.height);
    canvas.restore();
  }

  bindEvent() {
    this.game.canvasDom.onmousedown = (e) => {
      const x = e.offsetX;
      const y = e.offsetY;
      switch (this.scene) {
        case "MENU":
          const { left, right, top, bottom } = this.button.getPositionInfo();
          if (x >= left && x <= right && y >= top && y <= bottom) this.enterTutorial();
          break;
        case 'TUTORIAL':
          this.startGame();
          break;
        case 'STARTED':
          this.bird.jump();
          break;
      }
    }
  }

  enterTutorial() {
    this.scene = "TUTORIAL";
    this.initTutorial();
  }

  startGame() {
    this.scene = "STARTED";
    this.initGame();
  }

  checkCrash() {
    const birdWarp = this.bird.getWrap();
    if (birdWarp.bottom >= this.game.canvasDom.height) {
      this.die();
      return;
    }
    for (const pipe of this.pipeScene.pipeList) {
      const pipeWrap = pipe.getWrap();
      if (birdWarp.right < pipeWrap.left || birdWarp.left > pipeWrap.right || (birdWarp.right > pipeWrap.left && birdWarp.left < pipeWrap.right && birdWarp.top > pipeWrap.top && birdWarp.bottom < pipeWrap.bottom)) {
        if (birdWarp.left > pipeWrap.right) {
          this.game.getScore();
        }
      } else {
        this.die();
      }
    }
  }

  die() {
    this.dieSound.play();
    this.scene = 'END';
    this.initEnd();
  }

}

export default ScreenManager;