(function(){
    window.Pipe = function(){
        //两根管子
        this.pipeDown = game.res["pipe_down"]; //上管子
        this.pipeUp = game.res["pipe_up"]; //下管子

        this.pipeDownHeight = _.random(50, 300); //上管子随机的高度（因）
        this.space = 120;  //上下管子之间的空隙（因）
        //下面管子的高度随之而定了（果），高度 - 上管子高 - 空隙 - 大地的高
        this.pipeUpHeight = game.canvas.height - 112 - this.pipeDownHeight - this.space;

        this.x = game.canvas.width; //让管子在屏幕外面就绪
        this.isScore = false;

        game.pipeArr.push(this); //将管子实例存放到数组中

    }

    //渲染管子
    Pipe.prototype.render = function(){
        //渲染上面的管子
        //ctx.drawImage(img,切片X,切片Y,切片W,切片H,画布X,画布Y,图片W,图片H);
        game.ctx.drawImage(this.pipeDown, 0, 400-this.pipeDownHeight ,52,this.pipeDownHeight, this.x ,0, 52,this.pipeDownHeight);
        //渲染下面的管子
        game.ctx.drawImage(this.pipeUp, 0, 0,52,this.pipeUpHeight, this.x ,this.pipeDownHeight + this.space , 52,this.pipeUpHeight);
    }

    //更新管子
    Pipe.prototype.update = function(){
        this.x -= 2; //让管子移动
        if(this.x < -300){
            this.goDie(); //释放管子（从数组中删除）
        }

        //管子的包围盒
        this.x1 = this.x;
        this.x2 = this.x + 52;
        this.y1 = this.pipeDownHeight;
        this.y2 = this.pipeDownHeight + this.space;

        //碰撞检测，写在管子的原因，是因为写在小鸟类要遍历管子
        if(game.sm.bird.x2 > this.x1 && (game.sm.bird.y1 < this.y1 || game.sm.bird.y2 > this.y2) && game.sm.bird.x1 < this.x2 || game.sm.bird.y2 > game.canvas.height - 112){
            document.getElementById("die").play();
            // 死亡之后，进入4号场景
            game.sm.smNumber = 4;
            game.sm.init(4);
            // clearInterval(game.timer); //停止游戏
        }else if(!this.isScore && game.sm.bird.x1 > this.x2){
            //这里是记分条件，就是把是否加分的true或false给管子身上
            this.isScore = true;
            game.sm.score++;
            document.getElementById("score").play();
        }
    }

    Pipe.prototype.goDie = function(){
        //释放数组（删除超过了画布外的管子）
        for(var i = game.pipeArr.length - 1; i >= 0; i--){
            if(game.pipeArr[i] == this){
                game.pipeArr.splice(i,1);
            }
        }
    }
})();