let xAxis = () => {
    fill(155);
    textAlign(LEFT);
    textSize(20);
    text(0, zeroPoint.x, zeroPoint.y);
    text(maxXAxis[currentTime], maxPoint.x, zeroPoint.y);
    text("viewers", maxPoint.x, zeroPoint.y + 20)
};

let yAxis = () => {
    fill(155);
    textAlign(RIGHT);
    textSize(20);
    text(0, zeroPoint.x, zeroPoint.y - 20);
    text(5, zeroPoint.x, maxPoint.y - 20);
    text("Ratings", zeroPoint.x, maxPoint.y - 40);
};