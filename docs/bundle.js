(()=>{"use strict";const t=function(){function t(t){this.game=t,this.y=-48,this.targetY=120}return t.prototype.show=function(){this.game.canvas.drawImage(this.game.loadedResources.title,(this.game.canvasDom.width-178)/2,this.y),this.update()},t.prototype.update=function(){this.y+=2,this.y>this.targetY&&(this.y=this.targetY)},t}();const i=function(){function t(t){this.game=t,this.y=t.canvasDom.height+70,this.targetY=330}return t.prototype.show=function(){this.game.canvas.drawImage(this.game.loadedResources.button_play,(this.game.canvasDom.width-116)/2,this.y),this.update()},t.prototype.update=function(){this.y-=5,this.y<this.targetY&&(this.y=this.targetY)},t.prototype.getPositionInfo=function(){var t=(this.game.canvasDom.width-116)/2,i=t+116,e=this.targetY;return{left:t,right:i,top:e,bottom:e+70}},t}(),e=112;const s=function(){function t(t){this.game=t,this.image=[t.loadedResources.bird0_0,t.loadedResources.bird0_1,t.loadedResources.bird0_2],this.y=100,this.x=t.canvasDom.width/2*.618,this.deg=0,this.wing=0,this.direction="down",this.dy=.2,this.frame=0,this.sound=document.getElementById("fly"),this.boomState=0}return t.prototype.show=function(){this.game.canvas.drawImage(this.game.loadedResources.bird1_2,(this.game.canvasDom.width-48)/2,this.y),this.update()},t.prototype.update=function(){"down"==this.direction?(this.y+=2,this.y>230&&(this.direction="up")):"up"==this.direction&&(this.y-=2,this.y<170&&(this.direction="down"))},t.prototype.refresh=function(){var t=this.game.canvas;this.frame++,t.save(),t.translate(this.x,this.y),t.rotate(this.deg),t.drawImage(this.image[this.wing],-24,-24),t.restore()},t.prototype.render=function(){this.refresh(),this.dy+=.68,this.deg+=.06,this.y+=this.dy,this.frame%2==0&&this.wing++,this.wing>2&&(this.wing=0)},t.prototype.dying=function(){this.y+=20,this.deg+=.5,this.deg>1.57&&(this.deg=1.57),this.refresh()},t.prototype.jump=function(){this.dy=-8,this.deg=-1,this.sound.play()},t.prototype.getWrap=function(){var t=this.image[0].height/2,i=this.image[0].width/2;return{left:this.x-i,right:this.x+i,top:this.y-t,bottom:this.y+t}},t}();var a=function(){function t(t){this.game=t,this.image=t.loadedResources.bg_day,this.imageWidth=this.image.width,this.x=0}return t.prototype.refresh=function(){var t=this.game.canvas,i=this.game.canvasDom,s=i.height-e-this.image.height+100;t.fillStyle="#4ec0ca",t.fillRect(0,0,i.width,s),t.drawImage(this.image,this.x,s),t.drawImage(this.image,this.x+this.imageWidth,s),t.drawImage(this.image,this.x+2*this.imageWidth,s)},t.prototype.update=function(){this.x-=2,this.x<-this.imageWidth&&(this.x=0)},t.prototype.show=function(){this.refresh(),this.update()},t}();const h=a;const o=function(){function t(t){this.opacity=0,this.state="down",this.readyY=-62,this.game=t}return t.prototype.show=function(){this.game.canvas.drawImage(this.game.loadedResources.text_ready,(this.game.canvasDom.width-196)/2,this.readyY),this.game.canvas.drawImage(this.game.loadedResources.tutorial,(this.game.canvasDom.width-114)/2,250),this.update()},t.prototype.update=function(){this.readyY+=2,this.readyY>130&&(this.readyY=130)},t}();var n=function(){function t(t){this.game=t,this.x=t.canvasDom.width,this.downPipe=t.loadedResources.pipe_down,this.upPipe=t.loadedResources.pipe_up,this.downImageWidth=this.downPipe.width,this.upImageWidth=this.upPipe.width,this.space=150,this.downHeight=(30,220,Math.round(190*Math.random()+30)),this.upHeight=t.canvasDom.height-this.downHeight-this.space-e}return t.prototype.show=function(){this.game.canvas.drawImage(this.downPipe,0,this.downPipe.height-this.downHeight,this.downImageWidth,this.downHeight,this.x,0,this.downImageWidth,this.downHeight),this.game.canvas.drawImage(this.upPipe,0,0,this.upImageWidth,this.upHeight,this.x,this.downHeight+this.space,this.upImageWidth,this.upHeight),this.update()},t.prototype.update=function(){this.x-=2},t.prototype.getWrap=function(){return{left:this.x,right:this.x+this.downImageWidth,bottom:this.downHeight+this.space,top:this.downHeight}},t}();const r=function(){function t(t){this.game=t,this.pipeList=[],this.frame=0}return t.prototype.show=function(){if(this.frame++,2*this.frame%200==0){var t=new n(this.game);this.game.setScoreAble(),this.pipeList.push(t),this.pipeList.length>10&&this.pipeList.shift()}this.update()},t.prototype.update=function(){for(var t=0,i=this.pipeList;t<i.length;t++)i[t].show()},t}();var g=function(){function t(t){this.game=t,this.image=t.loadedResources.land,this.imageWidth=this.image.width,this.x=0}return t.prototype.show=function(){var t=this.game.canvas,i=this.game.canvasDom;t.drawImage(this.image,this.x,i.height-e),t.drawImage(this.image,this.x+this.imageWidth,i.height-e),t.drawImage(this.image,this.x+2*this.imageWidth,i.height-e),this.update()},t.prototype.update=function(){this.x-=2,this.x<-this.imageWidth&&(this.x=0)},t}();const c=g;const d=function(){function e(t){this.scene="MENU",this.game=t,this.dieSound=document.getElementById("fly")}return e.prototype.init=function(){this.game.clearScore(),this.background=new h(this.game),this.bird=new s(this.game),this.land=new c(this.game),this.button=new i(this.game),this.title=new t(this.game),this.bindEvent()},e.prototype.initTutorial=function(){this.button=null,this.title=null,this.tutorial=new o(this.game)},e.prototype.initGame=function(){this.tutorial=null,this.pipeScene=new r(this.game)},e.prototype.initEnd=function(){this.boomState=0,this.bgOpacity=1},e.prototype.render=function(){switch(this.scene){case"MENU":this.renderMenu();break;case"TUTORIAL":this.renderTutorial();break;case"STARTED":this.renderGame();break;case"END":this.renderEnd()}},e.prototype.renderMenu=function(){this.background.show(),this.land.show(),this.title.show(),this.button.show(),this.bird.show()},e.prototype.renderTutorial=function(){this.background.show(),this.land.show(),this.tutorial.show()},e.prototype.renderGame=function(){this.background.show(),this.land.show(),this.pipeScene.show(),this.bird.render(),this.checkCrash()},e.prototype.renderEnd=function(){var t=this.bird,i=this.game.canvas;this.background.show(),this.land.show(),this.pipeScene.show(),this.bird.dying(),t.y>this.game.canvasDom.height-112-12&&(t.y=this.game.canvasDom.height-112-12,this.game.frame%5==0&&this.boomState++,this.boomState>=11&&(this.boomState=11,this.scene="MENU",this.init())),this.bgOpacity=this.bgOpacity<.03?0:this.bgOpacity-.03,i.drawImage(this.game.loadedResources["b"+this.boomState],t.x-50,t.y-100),i.save(),i.globalAlpha=this.bgOpacity,i.drawImage(this.game.loadedResources.gameoverbg,0,0,this.game.canvasDom.width,this.game.canvasDom.height),i.restore()},e.prototype.bindEvent=function(){var t=this;this.game.canvasDom.onmousedown=function(i){var e=i.offsetX,s=i.offsetY;switch(t.scene){case"MENU":var a=t.button.getPositionInfo(),h=a.left,o=a.right,n=a.top,r=a.bottom;e>=h&&e<=o&&s>=n&&s<=r&&t.enterTutorial();break;case"TUTORIAL":t.startGame();break;case"STARTED":t.bird.jump()}}},e.prototype.enterTutorial=function(){this.scene="TUTORIAL",this.initTutorial()},e.prototype.startGame=function(){this.scene="STARTED",this.initGame()},e.prototype.checkCrash=function(){var t=this.bird.getWrap();if(t.bottom>=this.game.canvasDom.height)this.die();else for(var i=0,e=this.pipeScene.pipeList;i<e.length;i++){var s=e[i].getWrap();t.right<s.left||t.left>s.right||t.right>s.left&&t.left<s.right&&t.top>s.top&&t.bottom<s.bottom?t.left>s.right&&this.game.getScore():this.die()}},e.prototype.die=function(){this.dieSound.play(),this.scene="END",this.initEnd()},e}();var p={bg_day:"images/bg_day.png",land:"images/land.png",pipe_down:"images/pipe_down.png",pipe_up:"images/pipe_up.png",bird0_0:"images/bird0_0.png",bird0_1:"images/bird0_1.png",bird0_2:"images/bird0_2.png",bird1_2:"images/bird1_2.png",title:"images/title.png",button_play:"images/button_play.png",text_ready:"images/text_ready.png",tutorial:"images/tutorial.png",gameoverbg:"images/gameoverbg.png",b0:"images/b0.png",b1:"images/b1.png",b2:"images/b2.png",b3:"images/b3.png",b4:"images/b4.png",b5:"images/b5.png",b6:"images/b6.png",b7:"images/b7.png",b8:"images/b8.png",b9:"images/b9.png",b10:"images/b10.png",b11:"images/b11.png"};const m=function(){function t(t){this.frame=0,this.canvasDom=t,this.canvas=this.canvasDom.getContext("2d"),this.loadedResources={},this.screen=new d(this),this.isScore=!1,this.score=0,this.scoreSound=document.getElementById("score"),this.init()}return t.prototype.init=function(){this.load()},t.prototype.load=function(){var t=this,i=0,e=Object.keys(p).length;for(var s in p){var a=new Image;a.src=p[s],this.loadedResources[s]=a,a.onload=function(){i++,t.clear(),t.canvas.textAlign="center",t.canvas.font="30px 微软雅黑",t.canvas.fillStyle="blue",t.canvas.fillText("正在加载图片".concat(i," / ").concat(e),t.canvasDom.width/2,50),t.canvas.restore(),i===e&&t.start()}}},t.prototype.clear=function(){this.canvas.clearRect(0,0,this.canvasDom.width,this.canvasDom.height)},t.prototype.start=function(){var t=this,i=0;this.screen.init();var e=function(s){var a=s-i;t.frame++,t.clear(),t.screen.render(),t.canvas.textAlign="left",t.canvas.font="16px 微软雅黑",t.canvas.fillStyle="blue",t.canvas.fillText("帧率："+Math.ceil(1e3/a),10,20),t.canvas.fillText("分数："+t.score,10,40),i=s,window.requestAnimationFrame(e)};window.requestAnimationFrame(e)},t.prototype.setScoreAble=function(){this.isScore=!0},t.prototype.getScore=function(){this.isScore&&(this.score++,this.isScore=!1,this.scoreSound.play())},t.prototype.clearScore=function(){this.score=0,this.isScore=!0},t}();var u=document.querySelector("canvas");if(!u)throw new Error("找不到canvas元素");new m(u)})();