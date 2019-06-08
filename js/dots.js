//所有的dot obj
let dots = [];
for (let j = 0; j < data.types.length; j++) {
    dots.push(createDot());
}
// 创建一个可以变化的散点
function createDot() {
    return  {
        //定义dot的起始属性
        x: width/2,
        y: height/2,
        size: 1,
        acc: 0.1,
        start: 0,
        end: 0,

        arcReset: function() {
            this.start = 0;
            this.end = 0;
        },


        //创建点
        drawDot: function(x, y, size, color, name , j) {
            noStroke();
            let originSize = size;
            this.color = color;
            let [r, g, b] = this.color;
            fill(r, g, b, 100);
            if (this.mouseInObj(x, y, size))
                size = this.onHover(originSize, name, j);
            this.transTo(x, y, size);
        },

        drawArc: function(x, y, size, start, end, color) {
            noStroke();
            let [r, g, b] = color;
            fill(r, g, b, 150);
            this.adjustTo(x, y, size, start, end);
        },

        adjustTo: function (x, y, size, start, end) {
            this.x = this.x + this.acc * (x - this.x);
            this.y = this.y + this.acc * (y - this.y);
            this.size = this.size + this.acc * (size - this.size);
            this.start = this.start + this.acc * (start - this.start);
            this.end = this.end + this.acc * (end - this.end);
            arc(this.x, this.y, this.size, this.size, this.start, this.end, PIE);
        },


        //每帧的位置和尺寸偏移
        transTo: function (x, y, size) {
            this.x = this.x + this.acc * (x - this.x);
            this.y = this.y + this.acc * (y - this.y);
            this.size = this.size + this.acc * (size - this.size);
            ellipse(this.x, this.y, this.size);
        },

        onHover: function (size, name, j) {
            let [r, g, b] = this.color;
            fill(r, g, b, 200);
            textAlign(LEFT);
            textSize(25);
            text(name + ": \n" + data.series[currentTime][j][2] + " movies", this.x + size/2, this.y - size/2);
            return size*1.15;
        },

        //判断鼠标是否在dot的范围内
        mouseInObj: function(x, y, size) {
            return mouseX <= (x + size/2)
                && mouseX >= (x - size/2)
                && mouseY >= (y - size/2)
                && mouseY <= (y + size/2)
        }
    };
}

//普通arc
function normalArcMode() {
    let start = angle;
    for (let j = 0; j < data.types.length; j++) {
        let end = start + (data.series[currentTime][j][0] / allRate[currentTime]) * 2 * PI;
        let [x, y] = [width / 2, height / 2];
        dots[j].drawArc(x, y, 600*((data.series[currentTime][j][1]-2)/2), start, end, color[j], data.series[currentTime][j][3]);
        start = end;
    }
}

//按好评排序arc
function ratingArcMode() {
    let start = angle;
    for (let i = 0; i < ySort[currentTime].length; i++) {
        let index = () => {
            for (let j = 0;j < data.series.length; j++) {
                if (data.series[currentTime][j][1] === ySort[currentTime][i])
                    return j;
            }
        };
        let end = start + (data.series[currentTime][index()][0] / allRate[currentTime]) * 2 * PI;
        let [x, y] = [width / 2, height / 2];
        dots[index()].drawArc(x, y, 350*((data.series[currentTime][index()][1]-2)), start, end, color[index()], data.series[currentTime][index()][3]);
        start = end;
    }
}