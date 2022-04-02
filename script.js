let order = [];
let clickedOrder = [];
let score = 0;
let record = localStorage.getItem('record');
let genius = document.getElementById('genius');

const audio = [
    new Audio('mp3/1.mp3'),
    new Audio('mp3/2.mp3'),
    new Audio('mp3/3.mp3'),
    new Audio('mp3/4.mp3')
];
const audioError = new Audio('mp3/error.mp3');

// 0 = green
// 1 = red
// 2 = yellow
// 3 = blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const playBtn = document.querySelector('#play');
const resetBtn = document.querySelector('#reset');

let shuffle = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, order[i]);
    }
}

function createColorElement(color) {
    switch (color) {
        case 0: return green;
        case 1: return red;
        case 2: return yellow;
        case 3: return blue;
        default:    alert('Error. Game must restart.');
                    location.reload(true);
                    return;
    }
}

function lightColor(elementColor, number, color) {
    number *= 600;
    setTimeout(() => {
        audio[color].play();
        elementColor.classList.add('selected');
    }, number - 400);
    setTimeout(() => {
        elementColor.classList.remove('selected');
    }, number);
}

function checkOrder() {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        score++;
    //    alert(`Correct!\nStarting next level.`);
        nextLevel();
    }
}

function click(color) {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    audio[color].play();

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

function nextLevel() {
    shuffle();
}

function gameOver() {
    audioError.play();
    disableClick();
    updateRecord();
    alert(`Game over.\nYour final score is: ${score} \n`);
    location.reload(true);
}

function playGame() {
    alert(`Starting new game.\nGet ready!`);
    order = [];
    clickedOrder = [];
    score = 0;
    enableClick();
    nextLevel();
}

function updateRecord() {
    if(score > record) localStorage.setItem('record', score);
    document.getElementById('record').innerHTML = (record) ? record : 0;
}

function control(control) {
    switch (control) {
        case 'play':
            playGame();
            break;
        case 'reset':
            localStorage.clear();
            updateRecord();
            location.reload(true);
            break;
        default:
            alert('Error. Game must restart.');
            location.reload(true);
    }
}

function disableClick() {
    genius.classList.add('disabled');
}

function enableClick() {
    genius.classList.remove('disabled');
}


green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
playBtn.onclick = () => control('play');
resetBtn.onclick = () => control('reset');

updateRecord();

