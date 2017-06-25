/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying; //declare initial global variables
var storedScore = 0; // variable to store the score for challenge 1
/*
scores will hold the cumulative score
roundScore will hold the cumulative round score (becomes 0 if player rolls a 1)
activePlayer keeps track of the active player
gamePlaying is a boolean state variable to determine if the game is being played or a winner has been found
*/

init(); // call the init function to initialize a new game on page load

document.querySelector('.btn-roll').addEventListener('click' , function() { //anonymous function as argument
  if(gamePlaying) { //if the value of gamePlaying is true (default init value)
    // 1. Create a random number
       var dice = Math.floor(Math.random() * 6) + 1; //only need this variable within the function scope
    //2. Display the result
      var diceDOM = document.querySelector('.dice');//store the value of element in .dice class in a variable
      diceDOM.style.display = 'block'; //reveals dice previously hidden above
      diceDOM.src = 'dice-' + dice + '.png'; //replaces the image of the dice; note the filename
    //3. Update the round score IF the rolled number was NOT a 1
      if(dice !== 1) {
        //add to score
        roundScore += dice; //add the dice value to the roundScore value w incremental operator
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        //next player turn
        nextPlayer();
      }
      // Code for challenge 1
      if(dice === 6 && dice === storedScore) {
        console.log("Equal to 6"); //TEST USE ONLY
        storedScore = 0;
        document.querySelector('#score-' + activePlayer).textContent = 0;
        scores[activePlayer] = 0;
        nextPlayer();
      } else {
        console.log('The value of dice is ' + dice); //TEST USE ONLY
        console.log('The value of roundScore is ' + roundScore); //TEST USE ONLY
        console.log('The value of storedScore is ' + storedScore); //TEST USE ONLY
        console.log ("No match on " + storedScore); //TEST USE ONLY
        storedScore = dice;
        console.log(scores[activePlayer]);
      }
  }
}); //end of anonymous function on btn-roll event listener

document.querySelector('.btn-hold').addEventListener('click' , function() { //add event lister for hold button
 if(gamePlaying) {
   // Add current score to global score
   scores[activePlayer] += roundScore;
   // Update the UI
   document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   // Check if player won the game
   if(scores[activePlayer] >= 100) {
     document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
     document.querySelector('.dice').style.display = 'none';
     document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
     document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
     gamePlaying = false;
   } else {
     //Next player
     storedScore = 0;
     nextPlayer();
   }
 }
}); //end of anonymous function on btn-hold event listener

function nextPlayer() {
  //next player turn
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //change activePlayer using terneray operator instead of if statement
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';//set the value of the element back to zero for player 1
  document.getElementById('current-1').textContent = '0';//set the value of the element back to zero for player 2
  //change the class for the new activePlayer:
  document.querySelector('.player-0-panel').classList.toggle('active'); //toggle a class attribute for player 1
  document.querySelector('.player-1-panel').classList.toggle('active'); //toggle a class attribute for player 2
  //document.querySelector('.player-0-panel').classList.remove('active'); //for reference only to show removing class
  //document.querySelector('.player-1-panel').classList.add('active'); //ref only to show adding class
  document.querySelector('.dice').style.display ='none'; //hide the dice element
}

document.querySelector('.btn-new').addEventListener('click' , init); //start a new game by calling init function

function init() {
  scores = [0, 0]; // an array that sets initial scores of both players to 0
  activePlayer = 0; //set the active player using index of scores array
  roundScore = 0; //set the round score to zero
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none'; //hide the dice graphic in class .dice
  document.getElementById('score-0').textContent = '0'; //set initial value of player 1 score to 0
  document.getElementById('score-1').textContent = '0'; //set initial value of player 2 score to 0
  document.getElementById('current-0').textContent = '0'; //set initial value of player 1 roll value to 0
  document.getElementById('current-0').textContent = '0'; //set initial value of player 2 roll value to 0
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}



/* CHALLENGES

1. A player loses his ENTIRE score when he rolls two 6s in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
  Create a new variable to store the previous roll
  Compare the current roll value with the previous roll value
  If the previous roll value equals 6 and the current roll value equals 6, activePlayer scores equals 0





2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out!)

3. Add another die to the game, so that there are two die now. The player loses his current score when one of them is a 1. (Hint: you will need CSS to position the second die, so take a looks at the CSS code for the first one.)

*/


//This is added text to test branch merging//








//
