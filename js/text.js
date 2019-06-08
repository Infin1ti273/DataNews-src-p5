let outputText = function () {
    let x = 200;
    let y = 180;
    for (let i = 0; i < data.types.length; i++) {
        createText(x, y, i);
        y += 30;
    }
};

function createText(x, y, index) {
    let [r, g, b] = color[index];
    fill(r, g, b, 150);
    textAlign(RIGHT);
    textSize(20);
    text(data.types[index], x, y);
    noStroke();
    rect(x + 5, y - 20, 50, 20);
}