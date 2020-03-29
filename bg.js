const body = document.querySelector("body");

const IMG_NUM = 10;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `image/${imgNumber + 1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandNumber() {
    const number = Math.floor(Math.random() * IMG_NUM);
    return number;
}

function init() {
    const randNumber = genRandNumber();
    paintImage(randNumber)
}

init();