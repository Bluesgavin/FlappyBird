(function(){
    window.SceneManager = function(){
        //当前场景的编号
        this.smNumber = 1;
        //初始化场景编号
        this.init(1);
        this.bindEvent();
        this.score = 0; //分数
    }

    SceneManager.prototype.init = function(number){
        //init只有一个初始化参数，不涉及运动，只负责实例化类
        switch(number){
            case 1:
                // 1号：游戏封面和开始按钮场景
                this.background = new Background();//实例化背景类
                this.land = new Land();//实例化大地类

                this.titleY = -48; //初始title的位置
                this.titleYtarget = 120; //title停留的目标位置

                this.buttonY = game.canvas.height + 70; //初始按钮的位置
                this.buttonYtarget = 330; //按钮停留的目标位置

                this.birdY = 170; //初始小鸟的位置
                this.birdYDirection = "down"; //小鸟运动的方向
                break;
            case 2:
                //2号：教学场景
                this.background = new Background();//实例化背景类
                this.land = new Land();//实例化大地类

                this.readyY = -62; //2号场景的ready图片初始位置

                //修改tutorial的透明度
                this.tutorialOpacity = 1;
                this.tutorialState = "down"

                break;
            case 3:
                //3号：游戏主场景
                this.background = new Background();//实例化背景类
                this.land = new Land();//实例化大地类
                this.bird = new Bird();//实例化小鸟类
                break;
            case 4:
                //红色边框的图片透明度
                this.bgOpacity = 1;
                this.boom = 0;  //小鸟死亡爆炸动画的初始图片编号
                break;
        }
    }

    SceneManager.prototype.render = function(){
        //这里才是真正渲染和更新方法，可以写动画，因为game类中定时器render此方法。
        switch(this.smNumber){
            case 1:
                //渲染和更新 背景类
                this.background.render();
                this.background.update();
                //渲染和更新 大地类
                this.land.render();
                this.land.update();

                //渲染title、按钮、小鸟
                game.ctx.drawImage(game.res["title"], (game.canvas.width-178) / 2 , this.titleY);
                game.ctx.drawImage(game.res["button_play"], (game.canvas.width-116) / 2 , this.buttonY);
                game.ctx.drawImage(game.res["bird1_2"], (game.canvas.width-48) / 2 , this.birdY);

                //title下降运动
                this.titleY += 2;
                if(this.titleY > this.titleYtarget){
                    this.titleY = this.titleYtarget
                }

                //按钮上升运动
                this.buttonY -= 5;
                if(this.buttonY < this.buttonYtarget){
                    this.buttonY = this.buttonYtarget
                }

                //小鸟上下运动
                if(this.birdYDirection == "down"){
                    this.birdY+=2;
                    if(this.birdY > 230){
                        this.birdYDirection = "up"
                    }
                }else if(this.birdYDirection == "up"){
                    this.birdY-=2;
                    if(this.birdY < 170){
                        this.birdYDirection = "down"
                    }
                }

                break;
            case 2:
                 //渲染和更新 背景类
                this.background.render();
                this.background.update();

                //渲染和更新 大地类
                this.land.render();
                this.land.update();

                //ready图片下降
                game.ctx.drawImage(game.res["text_ready"] , (game.canvas.width - 196) / 2, this.readyY);
                this.readyY += 2;
                if(this.readyY > 130){
                    this.readyY = 130;
                }

                //渲染图片和改变透明度
                game.ctx.save();
                game.ctx.globalAlpha = this.tutorialOpacity;
                game.ctx.drawImage(game.res["tutorial"] , (game.canvas.width - 114) / 2, 250);
                game.ctx.restore();

                //让图片闪烁
                if(this.tutorialState == "down"){
                    this.tutorialOpacity -= 0.02;
                    if(this.tutorialOpacity <= 0.03){
                        this.tutorialState = "up"
                    }
                }else if(this.tutorialState == "up"){
                    this.tutorialOpacity += 0.02;
                    if(this.tutorialOpacity >= 1){
                        this.tutorialState = "down"
                    }
                }

                game.ctx.drawImage(game.res["bird0_0"] , 100 , 170);

                break;
            case 3:
                //渲染和更新 背景类
                this.background.render();
                this.background.update();

                //渲染和更新 大地类
                this.land.render();
                this.land.update();

                // 每间隔100帧，实例化一根管子
                game.f % 100 == 0 && new Pipe();
                // 循环遍历管子数组 更新和渲染
                for(var i = 0; i < game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                    game.pipeArr[i].update();
                }

                // 渲染和更新 小鸟类
                this.bird.render();
                this.bird.update();
                break;
            case 4 :
                this.background.render();
                this.land.render();
                // 循环遍历管子数组 更新和渲染
                for(var i = 0; i < game.pipeArr.length;i++){
                    game.pipeArr[i].render();
                }
                // 渲染和更新 小鸟类
                this.bird.render();

                //让鸟的y值，急速下降
                this.bird.y += 20;
                this.bird.deg += 0.5;
                if(this.bird.deg > 1.57){
                    this.bird.deg = 1.57;
                }

                if(this.bird.y > game.canvas.height - 112 - 12){
                    this.bird.y =  game.canvas.height - 112 - 12;
                    //每隔2帧，换一张图
                    game.f % 2 == 0 && this.boom++;
                    if(this.boom >= 11){
                        this.boom = 11;
                        //情况管子数组，为下一回合做准备
                        game.pipeArr = [];
                        // game.score = 0；
                        //死亡后，回到一号场景，重新游戏
                        this.smNumber = 1;
                        this.init(1);
                    }

                }
                // 渲染羽毛飞升
                game.ctx.drawImage(game.res["b" + this.boom], this.bird.x - 50, this.bird.y-100);

                //渲染红色边框图片
                this.bgOpacity -= 0.03;
                if(this.bgOpacity < 0){
                    this.bgOpacity = 0;
                }
                game.ctx.save();
                game.ctx.globalAlpha = this.bgOpacity;
                game.ctx.drawImage(game.res["gameoverbg"], 0, 0, game.canvas.width, game.canvas.height);
                game.ctx.restore();

                break;
        }
    }

    //事件监听小鸟飞
    SceneManager.prototype.bindEvent = function(){
        var self = this;
        //根据当前场景触发事件
        game.canvas.onmousedown = function(e){
            //得到鼠标点击的位置
            var x = e.offsetX;
            var y = e.offsetY;
            switch(self.smNumber){
                case 1:
                    var left = (game.canvas.width - 116) / 2
                    var right = (game.canvas.width - 116) / 2 + 116
                    var up = 330;
                    var down = 390;
                    if(x >= left && x <= right && y <= down && y >= up){
                        //进入2号教学场景
                        self.smNumber = 2;
                        self.init(2);
                    }
                    break;
                case 2:
                    var left = (game.canvas.width - 114) / 2
                    var right = (game.canvas.width - 114) / 2 + 114
                    var up = 250;
                    var down = 350;
                    if(x >= left && x <= right && y <= down && y >= up){
                        //进入2号教学场景
                        self.smNumber = 3;
                        self.init(3);
                    }
                    break;
                case 3:
                    self.bird.fly();
                    break;
                case 4:
                    break;
            }
        }

        game.canvas.onkeydown = function(e){
            switch(self.smNumber){
                case 1:
                    break;
                case 2:
                    break;
                case 3:
                    if(e.keyCode == 32){
                        self.bird.fly();
                    }
                    break;
                case 4:
                    break;
            }
        }
        game.canvas.focus();
    }
})();