// import BoxesClass from "./view/BoxesClass.js";

// new BoxesClass(
//     document.querySelector("boxesContainer")
// );

const roundScore = document.querySelector(".roundScore");
const pScore = document.querySelectorAll(".pScore");
const dice = document.querySelectorAll(".dice");
const diceSafe = document.querySelectorAll(".diceSafe");
const pName = document.querySelectorAll(".pName");
const rollBtn = document.querySelector(".rollBtn");
const stopBtn = document.querySelector(".stopBtn");
const resignBtn = document.querySelector(".resignBtn");
const restartBtn = document.querySelector(".restartBtn");
const exitBtn = document.querySelector(".exitBtn");
const endGame = document.querySelector(".endGame");
const whoWon = document.querySelector(".whoWon");

let whosRound;
let score;
let scoreTemp;
let scoreSum;
let scoreTooMuch;
let answer;
let noPoints;
let p1Moves;
let p2Moves;
let resultsCount;
let howManyDice; 
let diceClickCount;
let minToRoll;
let rollCount;

var pScoreE = new Array(2);
var pMoveFirst = new Array(2);
var diceArray = new Array(5);
var safeArray = new Array(5);

newGame();

async function toggleRound() {
    rollBtnDisable();
    stopBtnDisable();
    resignBtnDisable();
    diceClickDisable();
    rollCount++;

    //reset dice loop
    for (var i = 0; i < 5; i++) {
        dice[i].innerText = "?";   
    }    

    await sleep(200);

    //roll dice loop
    for (var i = 0; i < 5; i++) {
        if (!dice[i].classList.contains('diceDisplay')) {
            diceArray[i] = Math.floor(Math.random()*6+1);     //roll dice
            console.log(diceArray[i]);
            await sleep(300);
            dice[i].innerText = diceArray[i];                 //show dice
            safeArray[i] = diceArray[i];        
        }
    }

    checkPoints();                                            //checking if there are any points
    console.log("noPoints: " + noPoints);
    if (noPoints) {                                           //if noPoints end round else do continue
        checkSafe();
        if (noPoints) {
            diceColorRed();
            await sleep(500);
            scoreSum = 0;
            toggleStop();
            console.log("noPoints are true round stops!");
            return;
        }
    }
    
    if (diceClickCount >= 1 && rollCount < 3) {
        rollBtnEnable();
    }
    resignBtnEnable();
    diceClickEnable();
}

async function toggleStop() {
    console.log("Toggling Stop!");
    if (whosRound) {
        if (pMoveFirst[0] && score >= 50) {
            pMoveFirst[0] = false;
            console.log("pmove po 1 if: " + pMoveFirst[0]);
            whosRound = false;
            focusP2();

            roundScore.innerText = 0;
            scoreSum = 0;
            scoreTemp = 0;
            score = 0;
            diceClickCount = 0;
            rollCount = 0;

            resetDice();

            rollBtnDisable();
            stopBtnDisable();
            resignBtnDisable();
            await sleep(300);
            rollBtnEnable();
            resignBtnEnable();
            diceClickDisable();
            return;
        }

        scoreTooMuch = pScoreE[0] + scoreSum;
        console.log("scoretm: " + scoreTooMuch);

        if (scoreTooMuch <= 1000) {
            console.log("wszedlem w if <= 1000");
            if (!pMoveFirst[0]) {
                pScoreE[0] += scoreSum;
                pScore[0].innerText = pScoreE[0];
                console.log("scoreSum: " + scoreSum);
                console.log("pscoreE: " + pScoreE[0]);
            }
        }

        whosRound = false;
        focusP2();
    }

    else {
        if (pMoveFirst[1] && score >= 50) {
            pMoveFirst[1] = false;
            console.log("pmove po 1 if: " + pMoveFirst[1]);
            whosRound = true;
            focusP1();

            roundScore.innerText = 0;
            scoreSum = 0;
            scoreTemp = 0;
            score = 0;
            diceClickCount = 0;
            rollCount = 0;

            resetDice();

            rollBtnDisable();
            stopBtnDisable();
            resignBtnDisable();
            await sleep(300);
            rollBtnEnable();
            diceClickDisable();
            resignBtnEnable();
            return;
        }

        scoreTooMuch = pScoreE[1] + scoreSum;

        console.log("scoretm: " + scoreTooMuch);

        if (scoreTooMuch <= 1000) {     //zapis do pamieci nie zadzialal nie wyswietlil przynajmniej
            console.log("wszedlem w if <= 1000");
            if (!pMoveFirst[1]) {
                pScoreE[1] += scoreSum;
                pScore[1].innerText = pScoreE[1];
                console.log("scoreSum: " + scoreSum);
                console.log("pscoreE: " + pScoreE[1]);

            }
        }

        whosRound = true;
        focusP1();
    }

    checkWinner();

    roundScore.innerText = 0;
    scoreSum = 0;
    scoreTemp = 0;
    score = 0;
    diceClickCount = 0;
    rollCount = 0;

    resetDice();

    rollBtnDisable();
    stopBtnDisable();
    diceClickDisable();
    resignBtnDisable();
    await sleep(300);
    rollBtnEnable();
    resignBtnEnable();
}

function toggleResign() {
    console.log("Toggling Resign!");
    if (whosRound) {
        pScoreE[1] = 1000;
    }

    else {
        pScoreE[0] = 1000;
    }

    checkWinner();
}

//checking winner
function checkWinner() {
    if (pScoreE[0] == 1000) {
        whoWon.innerText = "Player 1";
        endGameOn();
    }

    else if (pScoreE[1] == 1000) {
        whoWon.innerText = "Player 2";
        endGameOn();
    }
}

//set everything to default
function newGame() {
    for (var i = 0; i < 5; i++) {
        dice[i].innerText = "?";
        diceSafe[i].classList.add('diceDisplay');
    }

    whosRound = true;
    score = 0;
    scoreTemp = 0;
    scoreSum = 0;
    scoreTooMuch = 0;
    answer = false;
    p1Moves = true;
    p2Moves = true;
    resultsCount = 0;
    diceClickCount = 0;
    minToRoll = 1;
    rollCount = 0;

    pScoreE[0] = 0;
    pScoreE[1] = 0;
    pMoveFirst[0] = true;
    pMoveFirst[1] = true;

    howManyDice = diceArray.length;

    roundScore.innerText = score;
    pScore[0].innerText = 0;
    pScore[1].innerText = 0;
    focusP1();

    diceClickDisable();
    endGameOff();
    stopBtnDisable();
    rollBtnEnable();
    resignBtnEnable();
}

//check points func
function checkPoints() {
    var counter = new Array(6);
    resultsCount = 0;
    
    //reset counter
    for (var i = 0; i < counter.length; i++) {
        counter[i] = 0;
    }

    noPoints = true;

    for (var i = 0; i < diceArray.length; i++) {
        if (!dice[i].classList.contains('diceDisplay')) {
            switch (diceArray[i]) {
                case 1: counter[0]++; break;
                case 2: counter[1]++; break;
                case 3: counter[2]++; break;
                case 4: counter[3]++; break;
                case 5: counter[4]++; break;
                case 6: counter[5]++; break;
                default: break;
            }
        }
    }

    //game points
    if (counter[0] == 5 || counter[1] == 5 || counter[2] == 5 || counter[3] == 5 || counter[4] == 5 || counter[5] == 5) {
        noPoints = false;
    }

    if ((counter[1] == 1 && counter[2] == 1 && counter[3] == 1 && counter[4] == 1 && counter[5] == 1) || (counter[1] == 1 && counter[2] == 1 && counter[3] == 1 && counter[4] == 1 && counter[0] == 1)) {
        noPoints = false;
    }

    if (counter[0] == 4) {
        noPoints = false;
    }

    if (counter[0] == 3) {
        noPoints = false;
    }

    if (counter[4] == 2 || counter[0] == 2) {
        if (counter[4] == 2) {
            noPoints = false;
        }
    
        if (counter[0] == 2) {
            noPoints = false;
        }
    }

    if (counter[4] == 1) {
        noPoints = false;
    }

    if (counter[0] == 1) {
        noPoints = false;
    }

    for (var i = 1; i < 6; i++) {
        if (counter[i] == 4) {
            noPoints = false;
        }
    }

    for (var i = 1; i < 6; i++) {
        if (counter[i] == 3) {
            score += ((i + 1) * 10);
            noPoints = false;
            
            if (resultsCount <= 2) {
                resultsCount += 3;
            }

            else {
                resultsCount = 5;
            }
        }
    }
}

//check points in safe func
function checkSafe() {
    var counter = new Array(6);
    resultsCount = 0;
    score = 0;    
    noPoints = true;

    //reset counter
    for (var i = 0; i < counter.length; i++) {
        counter[i] = 0;
    }

    for (var i = 0; i < safeArray.length; i++) {
        if (!diceSafe[i].classList.contains('diceDisplay')) {
            switch (safeArray[i]) {
                case 1: counter[0]++; break;
                case 2: counter[1]++; break;
                case 3: counter[2]++; break;
                case 4: counter[3]++; break;
                case 5: counter[4]++; break;
                case 6: counter[5]++; break;
                default: break;
            }
            //console.log("random array: " + diceArray[i]);
            //console.log("counter: " + counter[i]);
        }
    }

    //game points
    if (counter[0] == 5 || counter[1] == 5 || counter[2] == 5 || counter[3] == 5 || counter[4] == 5 || counter[5] == 5) {
        score += 1000;
        resultsCount += 5;
        noPoints = false;
    }

    if ((counter[1] == 1 && counter[2] == 1 && counter[3] == 1 && counter[4] == 1 && counter[5] == 1) || (counter[1] == 1 && counter[2] == 1 && counter[3] == 1 && counter[4] == 1 && counter[0] == 1)) {
        score += 150;
        resultsCount += 5;
        noPoints = false;
    }

    if (counter[0] == 4) {
        score += 200;
        resultsCount += 4;
        noPoints = false;
    }

    if (counter[0] == 3) {
        score += 100;
        resultsCount += 3;
        noPoints = false;
    }

    if (counter[4] == 2 || counter[0] == 2) {
        if (counter[4] == 2) {
            score += 10;
            resultsCount += 2;
            noPoints = false;
        }
    
        if (counter[0] == 2) {
            score += 20;
            resultsCount += 2;
            noPoints = false;
        }
    }

    if (counter[4] == 1) {
        score += 5;
        resultsCount += 1;
        noPoints = false;
    }

    if (counter[0] == 1) {
        score += 10;
        resultsCount += 1;
        noPoints = false;
    }

    for (var i = 1; i < 6; i++) {
        if (counter[i] == 4) {
            score += ((i + 1) * 20);
            noPoints = false;
            
            if (resultsCount <= 1) {
                resultsCount += 4;
            }

            else {
                resultsCount = 5;
            }
        }
    }

    for (var i = 1; i < 6; i++) {
        if (counter[i] == 3) {
            score += ((i + 1) * 10);
            noPoints = false;
            
            if (resultsCount <= 2) {
                resultsCount += 3;
            }

            else {
                resultsCount = 5;
            }
        }
    }
}

//sleep func
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//rollBtn enable
function rollBtnEnable() {
        rollBtn.classList.remove('btnDisabled');
        rollBtn.addEventListener('click', toggleRound);
}

//rollBtn disable
function rollBtnDisable() {
        rollBtn.classList.add('btnDisabled');
        rollBtn.removeEventListener('click', toggleRound);
}

//stopBtn enable
function stopBtnEnable() {
        stopBtn.classList.remove('btnDisabled');
        stopBtn.addEventListener('click', toggleStop);
}

//stopBtn disable
function stopBtnDisable() {
        stopBtn.classList.add('btnDisabled');
        stopBtn.removeEventListener('click', toggleStop);
}

//resignBtn enable
function resignBtnEnable() {
        resignBtn.classList.remove('btnDisabled');
        resignBtn.addEventListener('click', toggleResign);
}

//resignBtn disable
function resignBtnDisable() {
        resignBtn.classList.add('btnDisabled');
        resignBtn.removeEventListener('click', toggleResign);
}

//end game on func
function endGameOn() {
    endGame.classList.remove('endGameDisplay');
    restartBtn.addEventListener('click', newGame);
    exitBtn.addEventListener('click',  toggleExit);
}

//end game off func
function endGameOff() {
    endGame.classList.add('endGameDisplay');
}

//setting focus on p1
function focusP1() {
    pName[0].style.color = "#B7FF44";
    pName[1].style.color = "#eeeeee";
}
//setting focus on p2
function focusP2() {
    pName[1].style.color = "#B7FF44";
    pName[0].style.color = "#eeeeee";
}

function toggleExit() {
    location.href = "index.html";
}

//dice color red
async function diceColorRed() {
    dice.forEach(dice => dice.classList.add('diceColorRed'));
    await sleep(300);
    dice.forEach(dice => dice.classList.remove('diceColorRed'));
}





//enable dice swap
function diceClickEnable() {
    for (var i = 0; i < 5; i++) {
        dice[i].classList.add('diceClick');
        diceSafe[i].classList.add('diceClick');
    }

    //rolling dice
    dice[0].addEventListener('click', diceClick0);

    dice[1].addEventListener('click', diceClick1);

    dice[2].addEventListener('click', diceClick2);

    dice[3].addEventListener('click', diceClick3);

    dice[4].addEventListener('click', diceClick4);

    //safe dice
    diceSafe[0].addEventListener('click', diceSafeClick0);

    diceSafe[1].addEventListener('click', diceSafeClick1);

    diceSafe[2].addEventListener('click', diceSafeClick2);

    diceSafe[3].addEventListener('click', diceSafeClick3);

    diceSafe[4].addEventListener('click', diceSafeClick4);
}

//disable dice swap
function diceClickDisable() {
    dice[0].removeEventListener('click', diceClick0);
    diceSafe[0].removeEventListener('click', diceSafeClick0);
    dice[0].classList.remove('diceClick');
    diceSafe[0].classList.remove('diceClick');

    dice[1].removeEventListener('click', diceClick1);
    diceSafe[1].removeEventListener('click', diceSafeClick1);
    dice[1].classList.remove('diceClick');
    diceSafe[1].classList.remove('diceClick');

    dice[2].removeEventListener('click', diceClick2);
    diceSafe[2].removeEventListener('click', diceSafeClick2);
    dice[2].classList.remove('diceClick');
    diceSafe[2].classList.remove('diceClick');

    dice[3].removeEventListener('click', diceClick3);
    diceSafe[3].removeEventListener('click', diceSafeClick3);
    dice[3].classList.remove('diceClick');
    diceSafe[3].classList.remove('diceClick');

    dice[4].removeEventListener('click', diceClick4);
    diceSafe[4].removeEventListener('click', diceSafeClick4);
    dice[4].classList.remove('diceClick');
    diceSafe[4].classList.remove('diceClick');
}

// diceClick and diceSafeClick functions
function diceClick0() {
    safeArray[0] = diceArray[0];
    diceSafe[0].innerText = safeArray[0];
    diceSafe[0].classList.remove('diceDisplay');
    dice[0].classList.add('diceDisplay');
    diceClickCount++;

    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;

    first50();
    
    diceClickCountF();
}

function diceClick1() {
    safeArray[1] = diceArray[1];
    diceSafe[1].innerText = safeArray[1];
    diceSafe[1].classList.remove('diceDisplay');
    dice[1].classList.add('diceDisplay');
    diceClickCount++;

    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;

    first50();
    
    diceClickCountF();
}

function diceClick2() {
    safeArray[2] = diceArray[2];
    diceSafe[2].innerText = safeArray[2];
    diceSafe[2].classList.remove('diceDisplay');
    dice[2].classList.add('diceDisplay');
    diceClickCount++;

    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;

    first50();
    
    diceClickCountF();
}

function diceClick3() {
    safeArray[3] = diceArray[3];
    diceSafe[3].innerText = safeArray[3];
    diceSafe[3].classList.remove('diceDisplay');
    dice[3].classList.add('diceDisplay');
    diceClickCount++;

    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;

    first50();
    
    diceClickCountF();
}

function diceClick4() {
    safeArray[4] = diceArray[4];
    diceSafe[4].innerText = safeArray[4];
    diceSafe[4].classList.remove('diceDisplay');
    dice[4].classList.add('diceDisplay');
    diceClickCount++;

    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;

    first50();
    
    diceClickCountF();
}

function diceSafeClick0() {
    diceArray[0] = safeArray[0];
    dice[0].innerText = diceArray[0];
    dice[0].classList.remove('diceDisplay');
    diceSafe[0].classList.add('diceDisplay');
    diceClickCount--;
    
    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;
    
    first50Safe();

    // if (diceClickCount != 5) {
    //     rollBtnEnable();
    // }
}

function diceSafeClick1() {
    diceArray[1] = safeArray[1];
    dice[1].innerText = diceArray[1];
    dice[1].classList.remove('diceDisplay');
    diceSafe[1].classList.add('diceDisplay');
    diceClickCount--;
    
    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;
    
    first50Safe();

    // if (diceClickCount != 5) {
    //     rollBtnEnable();
    // }
}

function diceSafeClick2() {
    diceArray[2] = safeArray[2];
    dice[2].innerText = diceArray[2];
    dice[2].classList.remove('diceDisplay');
    diceSafe[2].classList.add('diceDisplay');
    diceClickCount--;
    
    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;
    
    first50Safe();

    // if (diceClickCount != 5) {
    //     rollBtnEnable();
    // }
}

function diceSafeClick3() {
    diceArray[3] = safeArray[3];
    dice[3].innerText = diceArray[3];
    dice[3].classList.remove('diceDisplay');
    diceSafe[3].classList.add('diceDisplay');
    diceClickCount--;
    
    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;
    
    first50Safe();
    
    // if (diceClickCount != 5) {
    //     rollBtnEnable();
    // }
}

function diceSafeClick4() {
    diceArray[4] = safeArray[4];
    dice[4].innerText = diceArray[4];
    dice[4].classList.remove('diceDisplay');
    diceSafe[4].classList.add('diceDisplay');
    diceClickCount--;
    
    checkSafe();
    scoreSum = scoreTemp + score;
    roundScore.innerText = scoreSum;
    
    first50Safe();
    
    // if (diceClickCount != 5) {
    //     rollBtnEnable();
    // }
}

//resetting dice back to roll
function resetDice() {
    diceSafeClick0();
    diceSafeClick1();
    diceSafeClick2();
    diceSafeClick3();
    diceSafeClick4();

    //reset dice loop
    for (var i = 0; i < 5; i++) {
        dice[i].innerText = "?";   
    } 
}

//diceClick first move 50pts validation and minimum to roll
function first50() {
    if (whosRound) {
        if (pMoveFirst[0] && scoreSum >= 50) {
            stopBtnEnable();
        }

        else if (!pMoveFirst[0]) {
            stopBtnEnable();
        }
    }
    
    else {
        if (pMoveFirst[1] && scoreSum >= 50) {
            stopBtnEnable();
        }

        else if (!pMoveFirst[1]) {
            stopBtnEnable();
        }
    }

    console.log("diceclickcount: " + diceClickCount);
    if (diceClickCount == 0) {
        rollBtnDisable();
    }

    if (diceClickCount >= 1 && rollCount < 3) {
        rollBtnEnable();
    }
}

//diceClickSafe first move 50pts validation and minimum to roll
function first50Safe() {
    if (whosRound) {
        if (pMoveFirst[0] && scoreSum < 50) {
            stopBtnDisable();
        }

        // else if (!pMoveFirst[0]) {
        //     stopBtnEnable();
        // }
    }
    
    else {
        console.log(scoreSum);
        if (pMoveFirst[1] && scoreSum < 50) {
            stopBtnDisable();
        }
        console.log(scoreSum);

        // else if (!pMoveFirst[1]) {
        //     stopBtnEnable();
        // }
    }

    // minToRoll--;
    // console.log("mintr: " +minToRoll);
    // if (minToRoll <= 1) {
    //     rollBtnDisable();
    // }
    console.log("diceclickcount: " + diceClickCount);
    if (diceClickCount == 0) {
        rollBtnDisable();
    }

    if (diceClickCount >= 1 && rollCount < 3) {
        rollBtnEnable();
    }
}

//diceClickCount 
function diceClickCountF() {
    if (diceClickCount == 5) {                          //if every dice is in Safe check for points and disable roll 
        rollBtnDisable();   
        console.log("result count: "+resultsCount);
        if (resultsCount == 5) {
            scoreTemp = scoreSum;
            rollCount = 0;
            resetDice();
        }
    }
}