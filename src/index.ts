import Game from "./models/Game";

const canvasDom = document.querySelector('canvas');

if (!canvasDom) throw new Error('找不到canvas元素');

const game = new Game(canvasDom);