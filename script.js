'use strict';

//selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice')
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector('.btn--hold');

//setting initial consitions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");

const scores = [0,0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function(){
    document.getElementById('current--'+activePlayer).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
// Rolling dice functionality
btnRoll.addEventListener('click',() => {
    if(playing){
    // 1.generating a random number for dice
    const dice = Math.trunc(Math.random()*6)+1;

    //2.display the dice
    diceEl.classList.remove('hidden');
    diceEl.src = "dice-"+dice+".png";

    // 3. check if rolled 1
    if(dice !== 1){
        //display current score
        currentScore += dice;
        document.getElementById('current--'+activePlayer).textContent = currentScore;
    }
    else{
        //Switch to next Player
       switchPlayer();
    }
    }
});


btnHold.addEventListener('click', ()=>{
    // 1. add current score to active player
    // 2. check if score > = 100
    //switch to next player
if(playing){
    scores[activePlayer] += currentScore;
    
    document.getElementById('current--'+activePlayer).textContent = 0;
    
    document.getElementById('score--'+activePlayer).textContent = scores[activePlayer];

    if(scores[activePlayer]>=10){
        playing = false;
        document.querySelector('.player--'+activePlayer).classList.add('player--winner');
        document.querySelector('.player--'+activePlayer).classList.remove('player--active');
        diceEl.classList.add('hidden');        

    }
    else{
        switchPlayer();
    }
}

});

btnNew.addEventListener("click", ()=>{
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active")
    scores[0] = 0;
    scores[1] = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
});