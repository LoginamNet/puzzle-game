/*-----------------------------------------common-----------------------------------------*/

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}

function arrToMatrix(arr, size) {
    var matrix = [], i, j;

    for (i = 0, j = -1; i < arr.length; i++) {
        if (i % size === 0) {
            j++;
            matrix[j] = [];
        }

        matrix[j].push(arr[i]);
    }

    return matrix;
}

/*-----------------------------------------audio-----------------------------------------*/

let audio = new Audio(`../puzzle-game/assets/sounds/button_click.mp3`);

function mute(item, cl) {
    if (audio.volume === 0) {
        audio.volume = 1;
        item.classList.remove(cl);
    } else {
        audio.volume = 0;
        item.classList.add(cl);
    }

    localStorage.setItem('audioVol', audio.volume);
}

/*-----------------------------------------close-popup-----------------------------------------*/

function closePopup(el, item1, item2, cl1, cl2) {
    let target = el.target;

    if (target.classList.contains(cl1) && item2.classList.contains(cl2)) {
        item1.classList.remove(cl1);
        item2.classList.remove(cl2);
    }
} 

/*-----------------------------------------body-setup-----------------------------------------*/

let gameField = document.createElement('div');
gameField.classList.add('game-field');

let statisticsBox = document.createElement('div');
statisticsBox.classList.add('statistics-box');

let movesBox = document.createElement('div');
movesBox.classList.add('moves-box');
let movesCount = document.createElement('span');
movesBox.textContent = 'MOVES: ';
movesCount.textContent = '0';
movesBox.append(movesCount);

let timerBox = document.createElement('div');
timerBox.classList.add('timer-box');
let timerCount = document.createElement('span');
timerCount.classList.add('timer-count');
timerBox.textContent = 'TIME: ';
timerCount.innerHTML = `00:00:00`;
timerBox.append(timerCount);

statisticsBox.append(movesBox);
statisticsBox.append(timerBox);

let sizesBox = document.createElement('div');
sizesBox.classList.add('sizes-box');

let size3Btn = document.createElement('button');
size3Btn.classList.add('button');
size3Btn.setAttribute('value', '3');
size3Btn.textContent = '3x3';

let size4Btn = document.createElement('button');
size4Btn.classList.add('button');
size4Btn.setAttribute('value', '4');
size4Btn.classList.add('button-checked');
size4Btn.textContent = '4x4';

let size5Btn = document.createElement('button');
size5Btn.classList.add('button');
size5Btn.setAttribute('value', '5');
size5Btn.textContent = '5x5';

let size6Btn = document.createElement('button');
size6Btn.classList.add('button');
size6Btn.setAttribute('value', '6');
size6Btn.textContent = '6x6';

let size7Btn = document.createElement('button');
size7Btn.classList.add('button');
size7Btn.setAttribute('value', '7');
size7Btn.textContent = '7x7';

let size8Btn = document.createElement('button');
size8Btn.classList.add('button');
size8Btn.setAttribute('value', '8');
size8Btn.textContent = '8x8';

sizesBox.append(size3Btn, size4Btn, size5Btn, size6Btn, size7Btn, size8Btn);

let controlBox = document.createElement('div');
controlBox.classList.add('control-box');

let startBtn = document.createElement('button');
startBtn.classList.add('button');
startBtn.textContent = 'START';

let pauseBtn = document.createElement('button');
pauseBtn.classList.add('button');
pauseBtn.setAttribute('disabled', 'disabled');
pauseBtn.textContent = 'PAUSE';

let restartBtn = document.createElement('button');
restartBtn.classList.add('button');
restartBtn.textContent = 'RESTART';

controlBox.append(startBtn, pauseBtn, restartBtn);

let settingsBox = document.createElement('div');
settingsBox.classList.add('settings-box');

let saveBtn = document.createElement('button');
saveBtn.classList.add('button');
saveBtn.textContent = 'SAVE';

let muteBtn = document.createElement('button');
muteBtn.classList.add('button');
muteBtn.textContent = `MUTE`;

let resultsBtn = document.createElement('button');
resultsBtn.classList.add('button');
resultsBtn.setAttribute('disabled', 'disabled');
resultsBtn.textContent = `RESULTS`;

settingsBox.append(saveBtn, muteBtn, resultsBtn);

let bodyFader = document.createElement('div');
bodyFader.classList.add('body-fader');

let winBox = document.createElement('div');
winBox.classList.add('win-box');
let winBoxH2 = document.createElement('h2');
winBoxH2.textContent = `Hooray!`;
let winBoxP = document.createElement('p');

winBox.append(winBoxH2);
winBox.append(winBoxP);

let scoreBox = document.createElement('div');
scoreBox.classList.add('score-box');

let scoreList = document.createElement('div');
scoreList.classList.add('score-list');

let scoreDescription = document.createElement('div');
scoreDescription.classList.add('score-description');

let scoreDescSize = document.createElement('span');
let scoreDescMoves = document.createElement('span');
let scoreDescTime = document.createElement('span');
scoreDescSize.textContent = `SIZE`;
scoreDescMoves.textContent = `MOVES`;
scoreDescTime.textContent = `FINAL TIME`;

scoreDescription.append(scoreDescSize, scoreDescMoves, scoreDescTime);

scoreBox.append(scoreDescription, scoreList);

document.body.append(statisticsBox);
document.body.append(gameField);
document.body.append(sizesBox);
document.body.append(controlBox);
document.body.append(settingsBox);
document.body.append(bodyFader);
document.body.append(winBox);
document.body.append(scoreBox);

/*-----------------------------------------timer-----------------------------------------*/

let [seconds,minutes,hours] = [0,0,0];
let time = document.querySelector('.timer-count');
let int = null;

function startTimer() {
    if (int!==null){
        clearInterval(int);
    }

    int = setInterval(displayTimer, 1000);
    timerBox.querySelector('span').classList.add('timer-active');
    startBtn.setAttribute('disabled', 'disabled');
    pauseBtn.removeAttribute('disabled', 'disabled');
}

function startTimerOnClick() {
    if (!timerBox.querySelector('span').classList.contains('timer-active')) {
        if (int === null){
            clearInterval(int);
            int = setInterval(displayTimer, 1000);
        } else {
            clearInterval(int);
            int = setInterval(displayTimer, 1000);
        }
        timerBox.querySelector('span').classList.add('timer-active');
        startBtn.setAttribute('disabled', 'disabled');
        pauseBtn.removeAttribute('disabled', 'disabled');
    }
}

function stopTimer() {
    clearInterval(int);
    timerBox.querySelector('span').classList.remove('timer-active');
    startBtn.removeAttribute('disabled', 'disabled');
    pauseBtn.setAttribute('disabled', 'disabled');
}


function restartTimer() {
    clearInterval(int);
    [seconds,minutes,hours] = [0,0,0];
    time.innerHTML = '00:00:00';
    timerBox.querySelector('span').classList.remove('timer-active');
}

function displayTimer(){
    seconds+=1;

        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }

 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;

 time.innerHTML = `${h}:${m}:${s}`;
}

/*-----------------------------------------start-field-setup-----------------------------------------*/

function getFieldSize() {
    let sizeButtons = sizesBox.querySelectorAll('.button');
    for (let item of sizeButtons) {

        if (item.classList.contains('button-checked')) {
            return Number(item.value);
        }
    }

}

let fieldSize = getFieldSize();


function getGameField() {

    let fieldNumbers = [];

    for (let i = 0; i < fieldSize * fieldSize; i++) {
        fieldNumbers.push(i + 1);
    }

    shuffle(fieldNumbers);

    let pairs = 0;
    let fieldMatrix;

    for (let i = 0; i < fieldNumbers.length; i++) {

        if (fieldNumbers[i] === fieldSize * fieldSize) {
            i++;
        }

        for (let j = i; j < fieldNumbers.length; j++) {

            if (fieldNumbers[j] === fieldSize * fieldSize) {
                j++;
            }

            if (fieldNumbers[i] > fieldNumbers[j]) {
                pairs++;
            }
        }
    }


    fieldMatrix = arrToMatrix(fieldNumbers, fieldSize);
    let emptySquareRow;

    for (let i = 0; i < fieldMatrix.length; i++) {
        for (let j = 0; j < fieldMatrix[i].length; j++) {
            if(fieldMatrix[i][j] === fieldSize * fieldSize) {
                emptySquareRow = i + 1;
            }
        }
    }

    let result = pairs + emptySquareRow;

    for (let i = 0; i < fieldSize * fieldSize; i++) {

        let gameSquare = document.createElement('div');

        if (fieldNumbers[i] === fieldSize * fieldSize) {
            gameSquare.textContent = ``;
            gameSquare.classList.add('game-square', 'game-square-empty');
            gameSquare.draggable = true;
        } else {
            gameSquare.classList.add('game-square');
            gameSquare.textContent = fieldNumbers[i];
            gameSquare.draggable = true;gameSquare.draggable = true;
        }

        gameSquare.style.width = `${100 / fieldSize}%`;
        gameField.appendChild(gameSquare);
    }

    if (fieldSize % 2 !== 0 && pairs % 2 !== 0) {
        gameField.innerHTML = ``;
        getGameField();
    } if (fieldSize % 2 === 0 && result % 2 !== 0) {
        gameField.innerHTML = ``;
        getGameField();
    }
}


getGameField();


/*-----------------------------------------field-active-buttons-setup-----------------------------------------*/

let startField = gameField.querySelectorAll('div');
let select;
let moveCounter = 0;

function setField(arr, fieldSize) {

    for (let i = 0; i < arr.length; i++) {
        arr[i].classList.remove('game-square-active');
        arr[i].classList.remove('game-square-select');
    }

    for (let i = 0; i < arr.length; i++) {

        if (arr[i].classList.contains('game-square-empty') && i === 0) {
            arr[i + 1].classList.add('game-square-active');
            arr[i + fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i === (fieldSize - 1)) {
            arr[i - 1].classList.add('game-square-active');
            arr[i + fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i === (arr.length - fieldSize)) {
            arr[i + 1].classList.add('game-square-active');
            arr[i - fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i === (arr.length - 1)) {
            arr[i - 1].classList.add('game-square-active');
            arr[i - fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i % fieldSize === 0 && i !== (arr.length - fieldSize)) {
            arr[i + 1].classList.add('game-square-active');
            arr[i + fieldSize].classList.add('game-square-active');
            arr[i - fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i % fieldSize === (fieldSize - 1) && i !== (fieldSize - 1) && i !== (arr.length - 1)) {
            arr[i - 1].classList.add('game-square-active');
            arr[i + fieldSize].classList.add('game-square-active');
            arr[i - fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i > 0 && i < (fieldSize - 1)) {
            arr[i + 1].classList.add('game-square-active');
            arr[i - 1].classList.add('game-square-active');
            arr[i + fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty') && i > (arr.length - fieldSize) && i < (arr.length - 1)) {
            arr[i + 1].classList.add('game-square-active');
            arr[i - 1].classList.add('game-square-active');
            arr[i - fieldSize].classList.add('game-square-active');
        } else if (arr[i].classList.contains('game-square-empty')) {
            arr[i + 1].classList.add('game-square-active');
            arr[i - 1].classList.add('game-square-active');
            arr[i + fieldSize].classList.add('game-square-active');
            arr[i - fieldSize].classList.add('game-square-active');
        }
      
    }
}

/*-----------------------------------------field-swap-----------------------------------------*/

function fieldSwap(el) {

    let target = el.target;

    if (target.classList.contains('game-square-active')) {
        startTimerOnClick();
        audio.play();
        moveCounter++;

        let nextSibling = target.nextSibling;
        let conuntNext = 1;
        while(nextSibling && !nextSibling.classList.contains('game-square-empty')) {
            nextSibling = nextSibling.nextSibling;
            conuntNext++;
        }

        let prevSibling = target.previousSibling;
        let conuntPrev = 1;
        while(prevSibling && !prevSibling.classList.contains('game-square-empty')) {
            prevSibling = prevSibling.previousSibling;
            conuntPrev++;
        }

        let controlSet = document.querySelectorAll('.game-square');

        if (conuntNext === fieldSize && !(target === controlSet[controlSet.length - fieldSize])) {

            target.classList.add('square-move-down');

            let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
            }


            target.addEventListener('animationend', () => {
                

                target.classList.remove('square-move-down');

                document.querySelector('.game-square-empty').textContent = target.textContent;
                document.querySelector('.game-square-empty').classList.remove('game-square-empty');

                target.textContent = '';
                target.classList.add('game-square-empty');
                target.classList.remove('game-square-active');

                movesCount.textContent = moveCounter;

                let recentField = document.querySelectorAll('.game-square');
                setField(recentField, fieldSize);

            });

        } else if (conuntPrev === fieldSize && conuntPrev === fieldSize) {

            target.classList.add('square-move-up');

            let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
            }

            target.addEventListener('animationend', () => {
                

                target.classList.remove('square-move-up');

                document.querySelector('.game-square-empty').textContent = target.textContent;
                document.querySelector('.game-square-empty').classList.remove('game-square-empty');

                target.textContent = '';
                target.classList.add('game-square-empty');
                target.classList.remove('game-square-active');

                movesCount.textContent = moveCounter;

                let recentField = document.querySelectorAll('.game-square');
                setField(recentField, fieldSize);

            });

        } else if (conuntPrev === fieldSize) {

            target.classList.add('square-move-up');

            let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
            }

            target.addEventListener('animationend', () => {
                

                target.classList.remove('square-move-up');

                document.querySelector('.game-square-empty').textContent = target.textContent;
                document.querySelector('.game-square-empty').classList.remove('game-square-empty');

                target.textContent = '';
                target.classList.add('game-square-empty');
                target.classList.remove('game-square-active');

                movesCount.textContent = moveCounter;

                let recentField = document.querySelectorAll('.game-square');
                setField(recentField, fieldSize);

            });

        }


        if (conuntPrev === 1 && target.previousSibling) {

            target.classList.add('square-move-left');

            let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
            }

            target.addEventListener('animationend', () => {
                

                target.classList.remove('square-move-left');

                document.querySelector('.game-square-empty').textContent = target.textContent;
                document.querySelector('.game-square-empty').classList.remove('game-square-empty');

                target.textContent = '';
                target.classList.add('game-square-empty');
                target.classList.remove('game-square-active');

                movesCount.textContent = moveCounter;

                let recentField = document.querySelectorAll('.game-square');
                setField(recentField, fieldSize);

            });

        } 
        
        if (conuntNext === 1 && target.nextSibling) {

            target.classList.add('square-move-right');

            let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
            }

            target.addEventListener('animationend', () => {
                

                target.classList.remove('square-move-right');

                document.querySelector('.game-square-empty').textContent = target.textContent;
                document.querySelector('.game-square-empty').classList.remove('game-square-empty');

                target.textContent = '';
                target.classList.add('game-square-empty');
                target.classList.remove('game-square-active');

                movesCount.textContent = moveCounter;

                let recentField = document.querySelectorAll('.game-square');
                setField(recentField, fieldSize);

            });

        }

    }
    
    document.addEventListener('animationend', checkSolution);
    
}

/*-----------------------------------------drag-n-drop-----------------------------------------*/

function dragBNDrop() {
    setField(startField, fieldSize);
    let dragged;

    document.addEventListener('dragstart', evt => {
        dragged = evt.target;
        dragged.style.opacity = 0.5;
    })

    document.addEventListener('dragover', evt => {

        let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
        }

        evt.preventDefault();
        dragged.style.opacity = 0;
    });

    document.addEventListener('drop', evt => {
        
        evt.preventDefault();

        if (evt.target.classList.contains('game-square-empty')) {
            startTimerOnClick();
            audio.play();
            moveCounter++; 

            document.querySelector('.game-square-empty').textContent = dragged.textContent;
            document.querySelector('.game-square-empty').style.opacity = ``;
            document.querySelector('.game-square-empty').classList.remove('game-square-empty');

            dragged.textContent = '';
            dragged.classList.add('game-square-empty');
            dragged.classList.remove('game-square-active');

            movesCount.textContent = moveCounter;

            if (checkSolution() !== true) {
                let recentField = document.querySelectorAll('.game-square');
                setTimeout(() => setField(recentField, fieldSize), 300);
            } else {
                checkSolution()
            }

        } else {
            let recentField = document.querySelectorAll('.game-square');

            setField(recentField, fieldSize);
        }
    })

    document.addEventListener('dragend', evt => {
        evt.target.style.opacity = '';
    })

    document.addEventListener('touchend', (evt) => {
        evt.target.style.opacity = '';
    })

}

/*-----------------------------------------add-score-----------------------------------------*/

function addScore() {
    
    let scoreString = document.createElement('div');
    scoreString.classList.add('score-string');

    let scoreFieldSize = document.createElement('span');
    let scoreMoves = document.createElement('span');
    let scoreTime = document.createElement('span');
    scoreFieldSize.textContent = `${fieldSize}/${fieldSize}`;
    scoreMoves.textContent = moveCounter;
    scoreTime.textContent = timerCount.textContent;

    scoreString.append(scoreFieldSize, scoreMoves, scoreTime);

    let currentList = document.querySelectorAll('.score-string');

    if (currentList.length) {

        for (let i = 0; i < currentList.length; i++) {

            if (scoreString.firstChild.textContent === currentList[i].firstChild.textContent) {

                if (scoreString.lastChild.textContent < currentList[i].lastChild.textContent) {

                    currentList[i].before(scoreString);
                    i = currentList.length;

                } else if (scoreString.lastChild.textContent > currentList[i].lastChild.textContent) {

                    currentList[i].after(scoreString);

                } else if (scoreString.lastChild.textContent === currentList[i].lastChild.textContent) {

                    if (scoreString.firstChild.nextSibling.textContent < currentList[i].firstChild.nextSibling.textContent) {

                        currentList[i].before(scoreString);
                        i = currentList.length;
    
                    } else if (scoreString.firstChild.nextSibling.textContent > currentList[i].firstChild.nextSibling.textContent) {
    
                        currentList[i].after(scoreString);
    
                    } else {
    
                        currentList[i].after(scoreString);
                        i = currentList.length;
    
                    }

                } else {

                    currentList[i].after(scoreString);
                    i = currentList.length;

                }

                
            } else if (currentList.length && scoreString.firstChild.textContent > currentList[i].firstChild.textContent) {
                currentList[i].before(scoreString);
                i = currentList.length;
            }

        }

        
    } else {
        scoreList.append(scoreString)
    }

    currentList = document.querySelectorAll('.score-string');
    
    if (currentList.length > 10) {
        scoreList.lastChild.remove();
    }

    
}

/*-----------------------------------------check-solution-----------------------------------------*/

function checkSolution() {
    let currentField = gameField.querySelectorAll('.game-square');
    let answer = [];
    let result = [];
    let solved = false;


    for (let i = 1; i <= fieldSize * fieldSize - 1; i++) {
        answer.push(i);
    }

    for (let i = 0; i < currentField.length - 1; i++) {
        result.push(Number(currentField[i].textContent));
    }

    if (!winBox.classList.contains('win-box-show')) {
        if (JSON.stringify(result) === JSON.stringify(answer)) {
            stopTimer();

            let currentField = document.querySelectorAll('.game-square');
            for (let item of currentField) {
                item.classList.remove('game-square-active');
            }

            startBtn.setAttribute('disabled', 'disabled');
            saveBtn.setAttribute('disabled', 'disabled');
            resultsBtn.removeAttribute('disabled', 'disabled');

            addScore();

            bodyFader.classList.add('body-fader-show');
            winBox.classList.add('win-box-show');
            winBoxP.textContent = `You solved the puzzle in ${timerCount.textContent} and ${moveCounter} moves!`;

            localStorage.setItem('gameScore', JSON.stringify(scoreList.innerHTML));
            solved = true;
        } else {
            winBox.classList.remove('win-box-show');
        }
    }
    
    return solved;
}

/*-----------------------------------------show-results-----------------------------------------*/

function showResults() {
    if (localStorage.getItem('gameScore') && !scoreBox.classList.contains('results-box-show')) {
        resultsBtn.removeAttribute('disabled', 'disabled');
        bodyFader.classList.add('body-fader-show');
        scoreBox.classList.add('results-box-show');
    }
}

/*-----------------------------------------event-listeners-----------------------------------------*/


setField(startField, fieldSize);
dragBNDrop();
document.addEventListener('click', (el) => fieldSwap(el));
document.addEventListener('click', (el) => closePopup(el, bodyFader, winBox, `body-fader-show` , `win-box-show`));
document.addEventListener('click', (el) => closePopup(el, bodyFader, scoreBox, `body-fader-show`, `results-box-show`));

restartBtn.addEventListener('click', () => {
    clearLocalStorage();
    restartTimer();

    gameField.innerHTML = '';
    getGameField();

    let startField = gameField.querySelectorAll('div');

    moveCounter = 0;
    movesCount.textContent = moveCounter;

    setField(startField, fieldSize);
    startBtn.removeAttribute('disabled', 'disabled');
    saveBtn.classList.remove('button-saved');
    saveBtn.removeAttribute('disabled', 'disabled');
    pauseBtn.setAttribute('disabled', 'disabled');
})

muteBtn.addEventListener('click', () => {
    mute(muteBtn, 'button-muted')
});
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', stopTimer);
resultsBtn.addEventListener('click', showResults);

size3Btn.addEventListener('click', () => {
    if (!size3Btn.classList.contains('button-checked')) {
    
        size3Btn.classList.add('button-checked');
        size4Btn.classList.remove('button-checked');
        size5Btn.classList.remove('button-checked');
        size6Btn.classList.remove('button-checked');
        size7Btn.classList.remove('button-checked');
        size8Btn.classList.remove('button-checked');

        
        restartTimer()
        fieldSize = getFieldSize();

        gameField.innerHTML = '';
        getGameField();

        let startField = gameField.querySelectorAll('div');

        moveCounter = 0;
        movesCount.textContent = moveCounter;

        startBtn.removeAttribute('disabled', 'disabled');
        saveBtn.removeAttribute('disabled', 'disabled');

        setField(startField, fieldSize);
    }
})

size4Btn.addEventListener('click', () => {
    if (!size4Btn.classList.contains('button-checked')) {

        size4Btn.classList.add('button-checked');
        size3Btn.classList.remove('button-checked');
        size5Btn.classList.remove('button-checked');
        size6Btn.classList.remove('button-checked');
        size7Btn.classList.remove('button-checked');
        size8Btn.classList.remove('button-checked');

        
        restartTimer()
        fieldSize = getFieldSize();

        gameField.innerHTML = '';
        getGameField();

        let startField = gameField.querySelectorAll('div');

        moveCounter = 0;
        movesCount.textContent = moveCounter;

        startBtn.removeAttribute('disabled', 'disabled');
        saveBtn.removeAttribute('disabled', 'disabled');

        setField(startField, fieldSize);
    }
})

size5Btn.addEventListener('click', () => {
    if (!size5Btn.classList.contains('button-checked')) {

        size5Btn.classList.add('button-checked');
        size3Btn.classList.remove('button-checked');
        size4Btn.classList.remove('button-checked');
        size6Btn.classList.remove('button-checked');
        size7Btn.classList.remove('button-checked');
        size8Btn.classList.remove('button-checked');

        
        restartTimer()
        fieldSize = getFieldSize();

        gameField.innerHTML = '';
        getGameField();

        let startField = gameField.querySelectorAll('div');

        moveCounter = 0;
        movesCount.textContent = moveCounter;

        startBtn.removeAttribute('disabled', 'disabled');
        saveBtn.removeAttribute('disabled', 'disabled');

        setField(startField, fieldSize);
    }
})

size6Btn.addEventListener('click', () => {
    if (!size6Btn.classList.contains('button-checked')) {

        size6Btn.classList.add('button-checked');
        size3Btn.classList.remove('button-checked');
        size4Btn.classList.remove('button-checked');
        size5Btn.classList.remove('button-checked');
        size7Btn.classList.remove('button-checked');
        size8Btn.classList.remove('button-checked');

        
        restartTimer()
        fieldSize = getFieldSize();

        gameField.innerHTML = '';
        getGameField();

        let startField = gameField.querySelectorAll('div');

        moveCounter = 0;
        movesCount.textContent = moveCounter;

        startBtn.removeAttribute('disabled', 'disabled');
        saveBtn.removeAttribute('disabled', 'disabled');

        setField(startField, fieldSize);
    }
})

size7Btn.addEventListener('click', () => {
    if (!size7Btn.classList.contains('button-checked')) {

        size7Btn.classList.add('button-checked');
        size3Btn.classList.remove('button-checked');
        size4Btn.classList.remove('button-checked');
        size5Btn.classList.remove('button-checked');
        size6Btn.classList.remove('button-checked');
        size8Btn.classList.remove('button-checked');

        
        restartTimer()
        fieldSize = getFieldSize();

        gameField.innerHTML = '';
        getGameField();

        let startField = gameField.querySelectorAll('div');

        moveCounter = 0;
        movesCount.textContent = moveCounter;

        startBtn.removeAttribute('disabled', 'disabled');
        saveBtn.removeAttribute('disabled', 'disabled');

        setField(startField, fieldSize);
    }
})

size8Btn.addEventListener('click', () => {
    if (!size8Btn.classList.contains('button-checked')) {

        size8Btn.classList.add('button-checked');
        size3Btn.classList.remove('button-checked');
        size4Btn.classList.remove('button-checked');
        size5Btn.classList.remove('button-checked');
        size6Btn.classList.remove('button-checked');
        size7Btn.classList.remove('button-checked');
        

        
        restartTimer()
        fieldSize = getFieldSize();

        gameField.innerHTML = '';
        getGameField();

        let startField = gameField.querySelectorAll('div');

        moveCounter = 0;
        movesCount.textContent = moveCounter;

        startBtn.removeAttribute('disabled', 'disabled');
        saveBtn.removeAttribute('disabled', 'disabled');

        setField(startField, fieldSize);
    }
})

/*-----------------------------------------local-storage-----------------------------------------*/

function setLocalStorage() {
    saveBtn.classList.add('button-saved');

    localStorage.setItem('btnSaved', saveBtn.classList.contains('button-saved'));

    let timerValues = time.innerHTML.split(':').map(el => Number(el));

    localStorage.setItem('hms', timerValues);
    localStorage.setItem('timer', time.innerHTML);

    localStorage.setItem('moveCounts', moveCounter);

    localStorage.setItem('btn3', size3Btn.classList.contains('button-checked'));
    localStorage.setItem('btn4', size4Btn.classList.contains('button-checked'));
    localStorage.setItem('btn5', size5Btn.classList.contains('button-checked'));
    localStorage.setItem('btn6', size6Btn.classList.contains('button-checked'));
    localStorage.setItem('btn7', size7Btn.classList.contains('button-checked'));
    localStorage.setItem('btn8', size8Btn.classList.contains('button-checked'));

    localStorage.setItem('gameSize', fieldSize);
    localStorage.setItem('gameField', JSON.stringify(gameField.innerHTML));
    
}

function getLocalStorage() {

    if(localStorage.getItem('btnSaved') === 'true') {
        saveBtn.classList.add('button-saved');
    }

    if(localStorage.getItem('timer')) {
        time.innerHTML = localStorage.getItem('timer');
    }
    if(localStorage.getItem('hms')) {
        [seconds,minutes,hours] = [localStorage.getItem('hms').split(',').map(el => Number(el))[2], localStorage.getItem('hms').split(',').map(el => Number(el))[1], localStorage.getItem('hms').split(',').map(el => Number(el))[0]];
    }

    if(localStorage.getItem('moveCounts')) {
        movesCount.textContent = localStorage.getItem('moveCounts');
        moveCounter = Number(localStorage.getItem('moveCounts'));
    } 

    
    if(localStorage.getItem('gameField')) {
        gameField.innerHTML = '';
        gameField.innerHTML = JSON.parse(localStorage.getItem('gameField'));

        if(localStorage.getItem('btn3') === 'true') {
            size3Btn.classList.add('button-checked');
            size4Btn.classList.remove('button-checked');
            size5Btn.classList.remove('button-checked');
            size6Btn.classList.remove('button-checked');
            size7Btn.classList.remove('button-checked');
            size8Btn.classList.remove('button-checked');
            fieldSize = getFieldSize()
        } 
        if(localStorage.getItem('btn4') === 'true') {
            size4Btn.classList.add('button-checked');
            size3Btn.classList.remove('button-checked');
            size5Btn.classList.remove('button-checked');
            size6Btn.classList.remove('button-checked');
            size7Btn.classList.remove('button-checked');
            size8Btn.classList.remove('button-checked');
            fieldSize = getFieldSize()
        } 
        if(localStorage.getItem('btn5') === 'true') {
            size5Btn.classList.add('button-checked');
            size3Btn.classList.remove('button-checked');
            size4Btn.classList.remove('button-checked');
            size6Btn.classList.remove('button-checked');
            size7Btn.classList.remove('button-checked');
            size8Btn.classList.remove('button-checked');
            fieldSize = getFieldSize()
        }
        if(localStorage.getItem('btn6') === 'true') {
            size6Btn.classList.add('button-checked');
            size3Btn.classList.remove('button-checked');
            size4Btn.classList.remove('button-checked');
            size5Btn.classList.remove('button-checked');
            size7Btn.classList.remove('button-checked');
            size8Btn.classList.remove('button-checked');
            fieldSize = getFieldSize()
        }
        if(localStorage.getItem('btn7') === 'true') {
            size7Btn.classList.add('button-checked');
            size3Btn.classList.remove('button-checked');
            size4Btn.classList.remove('button-checked');
            size5Btn.classList.remove('button-checked');
            size6Btn.classList.remove('button-checked');
            size8Btn.classList.remove('button-checked');
            fieldSize = getFieldSize()
        }
        if(localStorage.getItem('btn8') === 'true') {
            size8Btn.classList.add('button-checked');
            size3Btn.classList.remove('button-checked');
            size4Btn.classList.remove('button-checked');
            size5Btn.classList.remove('button-checked');
            size6Btn.classList.remove('button-checked');
            size7Btn.classList.remove('button-checked');
            fieldSize = getFieldSize()
        }
    

        let startField = gameField.querySelectorAll('div');
        moveCounter = Number(localStorage.getItem('moveCounts'));

        if(localStorage.getItem('gameSize')) {
            setField(startField, Number(localStorage.getItem('gameSize')));
        }
    }

    if(localStorage.getItem('audioVol')) {
        audio.volume = localStorage.getItem('audioVol');
    }

    if (localStorage.getItem('audioVol') === `0`) {
        muteBtn.classList.add('button-muted');
    } else {
        muteBtn.classList.remove('button-muted');
    }

    if (localStorage.getItem('gameScore')) {
        scoreList.innerHTML = JSON.parse(localStorage.getItem('gameScore'));
    }

}

function clearLocalStorage() {
    localStorage.removeItem('button-saved');
    localStorage.removeItem('hms');
    localStorage.removeItem('timer');
    localStorage.removeItem('moveCounts');
    localStorage.removeItem('btn3');
    localStorage.removeItem('btn4');
    localStorage.removeItem('btn5');
    localStorage.removeItem('btn6');
    localStorage.removeItem('btn7');
    localStorage.removeItem('btn8');
    localStorage.removeItem('gameSize');
    localStorage.removeItem('gameField');
}

/*-----------------------------------------global-listeners-----------------------------------------*/

saveBtn.addEventListener('click', setLocalStorage);
window.addEventListener('load', getLocalStorage);
window.addEventListener('load', () => {
    if (localStorage.getItem('gameScore')) {
        resultsBtn.removeAttribute('disabled', 'disabled');
    }
});