(function(){
    window.Bird = function(){
        this.image = [game.res['bird0_0'], game.res['bird0_1'] , game.res['bird0_2']];
        this.y = 100;
        this.x = game.canvas.width / 2 * 0.618;
        this.dy = 0.2; //下降的增量，每帧的恒定变

        this.deg = 0; //旋转角度
        this.wing = 0; //拍打翅膀
    }

    //渲染小鸟
    Bird.prototype.render = function(){
        //改变鸟的原点x,y进行旋转
        game.ctx.save();
        game.ctx.translate(this.x, this.y)
        game.ctx.rotate(this.deg);
        //之所以减去24，因为x、y是中心点的位置，减半宽半高
        game.ctx.drawImage(this.image[this.wing], -24, -24);
        game.ctx.restore();

    }

    //更新小鸟
    Bird.prototype.update = function(){
        //下降的增量，变化的量也在变，这就是自由落体
        this.dy += 0.88;
        //旋转的角度增量
        this.deg += 0.06;
        this.y += this.dy;

        //每间隔2帧拍打一次
        game.f % 2 == 0 && this.wing++;
        if(this.wing > 2){ this.wing = 0;}

        //当y变化的时候（y是小鸟的中心点）
        //小鸟的x1 x2 y1 y2四个包围宝也会变
        this.x1 = this.x - 17;
        this.x2 = this.x + 17;
        this.y1 = this.y - 12;
        this.y2 = this.y + 12;

    }

    //小鸟飞
    Bird.prototype.fly = function(){
        //小鸟只要有一个
        //负的dy就会向上飞
        this.dy = -10;
        this.deg = -1;
        document.getElementById("fly").play();
    }

})();