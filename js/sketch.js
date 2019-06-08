let width = 1350;
let height = 900;

//图表边距
let padding = 200;
let maxXAxis = [];
let maxYAxis = [];
let allRate = [];
//不同时间最大x值,y值,电影数值
for (let i = 0; i < data.year.length; i++) {
    let max = 0;
    let max2 = 0;
    let max3 = 0;
    for (let j = 0; j < data.types.length; j++) {
        if (max < data.series[i][j][0])
            max = data.series[i][j][0];
        if (max2 < data.series[i][j][1])
            max2 = data.series[i][j][1];
        max3 += data.series[i][j][0];
    }
    maxXAxis.push(max);
    maxYAxis.push(max2);
    allRate.push(max3);
}

let ySort = [];
let xScale = [];
let yScale = [];
for (let i = 0; i < data.year.length; i++) {
    let sort = [];
    xScale.push([]);
    yScale.push([]);
    for (let j = 0; j < data.types.length; j++) {
        sort.push(data.series[i][j][1]);
        xScale[i].push(data.series[i][j][0]/maxXAxis[i]);
        yScale[i].push(data.series[i][j][1]/maxYAxis[i]);
    }
    ySort.push(sort.sort());
}

//现在时间点
let currentTime = 0;

//散点图的零点
let zeroPoint = {
    x: padding,
    y: height - padding
};
//散点图的终点
let maxPoint = {
    x: width - padding,
    y: padding
};

//散点用-计算坐标
let calculateAxis = (x, y) => {
    let xRange = maxPoint.x - zeroPoint.x;
    let yRange = maxPoint.y - zeroPoint.y;
    return [x/maxXAxis[currentTime] * xRange + zeroPoint.x, y/5 * yRange + zeroPoint.y]
};

setup = () => {
    this.createCanvas(width, height);
    this.background(0);
};
let counter = 0;
let type = 0;
let angle = 0;

draw = () => {
    this.background(0, 75);
    btn1.drawTriButton(buttonPosition.x1, buttonPosition.y, 1);
    btn2.drawTriButton(buttonPosition.x2, buttonPosition.y, -1);
    buttonText();

    // pie -> arc
    if (type === -1) {
        counter += 1;
        for (let j = 0; j < data.types.length; j++) {
            let [x, y] = [width / 2, height / 2];
            dots[j].drawArc(x, y, 1, 0, 0, color[j], data.series[currentTime][j][3]);
        }
        if (counter === 30) {
            type = 0;
        }
    }

    //画出所有的点
    if (type === 0) {
        counter = 0;
        xAxis();
        yAxis();
        for (let j = 0; j < data.types.length; j++) {
            dots[j].arcReset();
            let [x, y] = calculateAxis(data.series[currentTime][j][0], data.series[currentTime][j][1]);
            dots[j].drawDot(x, y, data.series[currentTime][j][2] / 4 + 3, color[j], data.series[currentTime][j][3], j);
        }
    }

    // dot -> arc
    if (type === 1) {
        counter += 1;
        for (let j = 0; j < data.types.length; j++) {
            let [x, y] = [width/2, height/2];
            dots[j].drawDot(x, y, 1, color[j], data.series[currentTime][j][3]);
        }
        if (counter === 30) {
            type = 2;
        }
    }

    // arc
    if (type === 2) {
        outputText();
        counter = 0;
        // normalArcMode();
        ratingArcMode();
    }
};


// 鼠标单击事件
// noinspection JSUnusedGlobalSymbols
function mousePressed() {
    triButtonAction();
    if (!mouseInObj(buttonPosition.x1, buttonPosition.y, 1)&&!mouseInObj(buttonPosition.x2, buttonPosition.y, -1)) {
        if (type === 0)
            type = 1;
        if (type === 2)
            type = -1;
        angle = 0;
    }
}

function mouseWheel(event) {
    if (event > 0)
        angle += 0.5;
    else angle -= 0.5;
}


