let buttonText = () => {
    fill(125);
    textAlign(CENTER);
    textSize(50);
    text(data.year[currentTime], (buttonPosition.x2 + buttonPosition.x1)/2, buttonPosition.y+12.5);
};
let buttonPosition = {
    x1: 450,
    x2: 850,
    y: 80
};

let btn1 = createTriButton();
let btn2 = createTriButton();
function createTriButton() {
    return {
        width: 30,
        height: 60,

        drawTriButton: function (x, y, dir) {
            noStroke();
            fill(125);
            if (mouseInObj(x, y, dir))
                this.onHover(dir);
            triangle(x, y, x + this.width*dir, y + this.height/2, x + this.width*dir, y - this.height/2);
        },

        onHover: function(dir) {
            dir === 1?fill(255,64,64):fill(127,207,112)
        },
    }
}

//判断鼠标是否在tri的范围内
function mouseInObj(x, y, dir) {
    if (dir === 1)
        return mouseX <= (x + btn1.width*dir)
            && mouseX >= x
            && mouseY >= y - (mouseX - x)
            && mouseY <= y + (mouseX - x);
    if (dir === -1)
        return mouseX <= x
            && mouseX >= (x + btn2.width*dir)
            && mouseY >= y - (x - mouseX)
            && mouseY <= y + (x - mouseX);
}

// tri按钮触发
let triButtonAction = () => {
    if (mouseInObj(buttonPosition.x1, buttonPosition.y, 1)) {
        if (currentTime !== 0)
            currentTime -= 1;
    }
    if (mouseInObj(buttonPosition.x2, buttonPosition.y, -1)) {
        if (currentTime !== (color.length - 1))
            currentTime += 1;
    }
};