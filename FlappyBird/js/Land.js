(function(){
    window.Land = function(){
        this.image = game.res["land"]; //读取图片
        this.x = 0;
    }

    //渲染大地
    Land.prototype.render = function(){
        game.ctx.drawImage(this.image, this.x, game.canvas.height - 112);
        game.ctx.drawImage(this.image,this.x + 336 , game.canvas.height - 112);
        game.ctx.drawImage(this.image,this.x + 672 , game.canvas.height - 112);
    }

    //更新大地，让大地背景移动
    Land.prototype.update = function(){
        this.x -= 2;
        if(this.x < -336){
            this.x = 0;
        }
    }
})();