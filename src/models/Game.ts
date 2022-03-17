import assets from "../assets";
import ScreenManager from './ScreenManager';

const RESOURCES = assets.resources;

class Game {
  canvasDom: HTMLCanvasElement;
  frame: number;
  canvas: CanvasRenderingContext2D;
  loadedResources: { [key: string]: any }
  screen: ScreenManager
  isScore: Boolean;
  score: number;
  scoreSound: HTMLAudioElement;
  constructor(canvas: HTMLCanvasElement) {
    this.frame = 0;
    this.canvasDom = canvas;
    this.canvas = this.canvasDom.getContext('2d');
    this.loadedResources = {};
    this.screen = new ScreenManager(this);
    this.isScore = false;
    this.score = 0;
    this.scoreSound = document.getElementById("score") as HTMLAudioElement;
    this.init();
  }

  init() {
    this.load();
  }

  load() {
    let count = 0;
    const maxCount = Object.keys(RESOURCES).length;
    for (const resource in RESOURCES) {
      const img = new Image();
      img.src = RESOURCES[resource];
      this.loadedResources[resource] = img;
      img.onload = () => {
        count++;
        this.clear();
        this.canvas.textAlign = "center";
        this.canvas.font = "30px 微软雅黑";
        this.canvas.fillStyle = "blue";
        this.canvas.fillText(`正在加载图片${count} / ${maxCount}`, this.canvasDom.width / 2, 50);
        this.canvas.restore()
        if (count === maxCount) this.start();
      }
    }
  }

  clear() {
    this.canvas.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
  }

  start() {
    let last = 0;
    this.screen.init();

    const render = (stamp: number) => {
      const time = stamp - last;

      this.frame++;
      this.clear();
      this.screen.render();
      this.canvas.textAlign = "left";
      this.canvas.font = "16px 微软雅黑";
      this.canvas.fillStyle = "blue";
      this.canvas.fillText("帧率：" + Math.ceil(1000 / time), 10, 20);
      this.canvas.fillText("分数：" + this.score, 10, 40);
      last = stamp;
      window.requestAnimationFrame(render);
    }
    window.requestAnimationFrame(render);
  }

  setScoreAble() {
    this.isScore = true;
  }

  getScore() {
    if (this.isScore) {
      this.score++;
      this.isScore = false;
      this.scoreSound.play();
    }
  }

  clearScore() {
    this.score = 0;
    this.isScore = true;
  }
}

export default Game;