(function(){
    window.Background = function(){
        this.image = game.res["bg_day"]; //读取图片
        this.x = 0; //背景坐标
    }

    //渲染背景
    Background.prototype.render = function(){
        //画一个矩形，填充天空的颜色
        game.ctx.save();
        game.ctx.fillStyle = "#4ec0ca";
        game.ctx.fillRect(0, 0, game.canvas.width ,game.canvas.height - 512);
        //为了不穿帮，绘制背景连续放3张图片让背景无缝滚动（288和512分别是图片的宽度和高度）
        game.ctx.drawImage(this.image,this.x , game.canvas.height - 512);
        game.ctx.drawImage(this.image,this.x + 288 , game.canvas.height - 512);
        game.ctx.drawImage(this.image,this.x + 576 , game.canvas.height - 512);
        game.ctx.restore()
    }

    //更新，让背景移动
    Background.prototype.update = function(){
        //背景左移动，小于背景的负宽度时，让X=0
        //当猫腻背景达到左边线立刻拉回
        this.x--;
        if(this.x < -288){
            this.x = 0;
        }
    }
})();