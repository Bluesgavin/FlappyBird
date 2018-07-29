(function(){
    window.Game = function(){
        this.f = 0; //帧编号初始值
        this.init(); //初始化资源
        this.pipeArr = []; //管子数组
    }

    Game.prototype.init = function(){
        //第一步：得到2d画布
        this.canvas = document.querySelector("canvas");
        this.ctx = this.canvas.getContext("2d");

        //第二步：创建资源文件
        this.res = {
            "bg_day" : "images/bg_day.png",
            "land" : "images/land.png",
            "pipe_down" : "images/pipe_down.png",
            "pipe_up" : "images/pipe_up.png",
            "bird0_0" : "images/bird0_0.png",
            "bird0_1" : "images/bird0_1.png",
            "bird0_2" : "images/bird0_2.png",
            "bird1_2": "images/bird1_2.png",
            "title" : "images/title.png",
            "button_play" : "images/button_play.png",
            "text_ready" : "images/text_ready.png",
            "tutorial" : "images/tutorial.png",
            "gameoverbg": "images/gameoverbg.png",
            "b0" : "images/b0.png",
            "b1" : "images/b1.png",
            "b2" : "images/b2.png",
            "b3" : "images/b3.png",
            "b4" : "images/b4.png",
            "b5" : "images/b5.png",
            "b6" : "images/b6.png",
            "b7" : "images/b7.png",
            "b8" : "images/b8.png",
            "b9" : "images/b9.png",
            "b10" : "images/b10.png",
            "b11" : "images/b11.png"
        }

        var self = this;
        //遍历这个对象，将他们的地址变为真实图片地址
        var count = 0; //已成功加载的图片个数
        var length = Object.keys(this.res).length; //所有图片的总数
        for(var k in this.res){
           //创建image对象
           var image = new Image();
           //设置src图片路径
           image.src = this.res[k];
           //将R里面的资源文件，变为真正的图片对象
           this.res[k] = image;
           //当image加载成功后，显示图片在画布上
           image.onload = function(){
               count++; //当某张图片加载成功，给计数器+1
               self.clear(); //清屏

               //save()和restore()配合使用，防止污染别人的样式
               self.ctx.save();
               self.ctx.textAlign = "center";
               self.ctx.font = "30px 微软雅黑";
               self.ctx.fillStyle = "blue";
               self.ctx.fillText(`正在加载图片${count} / ${length}`, self.canvas.width / 2,50);
               self.ctx.restore()
               //当加载完毕，开始游戏
               if(count == length){
                   //当图片加载成功的数量等于总数，就开始游戏
                   self.start();
               }
           }
        }
    }

    //事件监听小鸟飞
    // Game.prototype.bindEvent = function(){
    //     var self = this;
    //     this.canvas.onmousedown = function(){
    //         self.bird.fly()
    //     }
    // }

    //清屏方法
    Game.prototype.clear = function(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
    //游戏主循环
    Game.prototype.start = function(){
        var self = this;

        // this.background = new Background();//实例化背景类
        // this.land = new Land();//实例化大地类
        // this.bird = new Bird();//实例化小鸟类
        this.sm = new SceneManager();

        this.timer = setInterval(function(){
            self.f++;
            self.clear(); //清屏
            self.sm.render(); //渲染场景管理器

            // //渲染和更新 背景类
            // self.background.render();
            // self.background.update();

            // //渲染和更新 大地类
            // self.land.render();
            // self.land.update();

            //每间隔100帧，实例化一根管子
            // self.f % 100 == 0 && new Pipe();
            //循环遍历管子数组 更新和渲染
            // for(var i = 0; i < self.pipeArr.length;i++){
            //     self.pipeArr[i].render();
            //     self.pipeArr[i].update();
            // }

            //渲染和更新 小鸟类
            // self.bird.render();
            // self.bird.update();


            //显示帧编号
            self.ctx.font = "16px 微软雅黑";
            self.ctx.fillStyle = "blue";
            self.ctx.fillText("帧率：" + self.f,10,20);
            self.ctx.fillText(game.sm.smNumber + "号场景",10,50);
            self.ctx.fillText("分数：" + game.sm.score,10,80);
        },20);
    }
})();