//letters 
const letters ="abcdefghijklmnopqrstuvwxyz";

let lettersArray;
let lettersContainer;
let allKeys;
let randomPropNum;

//object of words and themes
const words ={
    movies:["Titanic", "Inception", "Up", "Tangled", "Whiplash", "Star Wars", "The Matrix", "Interstellar", "Terminator", "Gladiator", "Toy Story", "Avengers", "Jurassic Park", "John Wick", "Harry Potter", "Mad Max", "Monsters Inc", "Jaws", "Ratatouille", "Frozen", "Avatar", "Logan"],
    countries:["Canada", "Libya", "Turkey", "Egypt", "France", "Jamaica", "China", "India", "Brazil", "Russia", "Japan", "Egypt", "Thailand", "Germany", "Kenya", "Poland", "Madagascar", "Italy", "Nigeria", "France", "Argentina", "Morocco", "Peru", "Australia", "Netherlands", "Monaco", "Iceland"],
    superheros:["Superman","Spider Man", "Batman", "Captain America", "Iron Man", "The Flash", "Moon Knight", "Blue Beetle", "Daredevil", "Dr Strange", "Robin", "Ant Man", "Hulk", "Wolverine", "Aquaman", "Hawkeye", "Cyborg", "Beast Boy", "Deadpool", "Shazam", "Starfire", "Raven", "Supergirl"]
};

let bgMusic;
let propName;
let propValue;
let randomValueNum;
let randomValueValue;
let correctAttempts;
let livesLeft;
let span;
let theLetter;
let lettersGuessContainer;
let letterAndSpace;
let guessSpans;
let theDrawing;
let theStatus;
let clickedLetter;
let chosenWord;
let failSnd;
let successSnd;
let uniqueChars;
let i;
let div;
let divText;
let restartButton;
let popup;
 
// call initialize to start the game
initialize();


function initialize(){

    // set lives left
    livesLeft = 10;

    // display lives left
    document.querySelector(".game-info .lives-left"). innerHTML = "Lives left: "+ livesLeft;

    // set img shown to default img
    startImg();
    
    //get array from letters 
    lettersArray = Array.from(letters);

    // select letters container
    lettersContainer = document.querySelector(".letters");

    //remove finished class from letters container
    lettersContainer.classList.remove("finished");

    //get property 
    allKeys = Object.keys(words);

    // number depending on keys length
    let PropNum = Math.floor(2* allKeys.length)//0, 1, 2 or 3

    //allKeys[0]=movies
    //allKeys[1]=countries
    //allKeys[2]=superheros

    // theme
    propName = allKeys[2];

    // theme words
    propValue = words[propName];

    // random number depending on words
    randomValueNum = Math.floor(Math.random() * propValue.length);

    // the chosen word
    randomValueValue = propValue[randomValueNum];

    // set correct attempts
    correctAttempts = 0;



    lettersArray.forEach(letter => {
 
        //create span
        span = document.createElement("span");

        // create letters text node 
        theLetter = document.createTextNode(letter);

        //append the letter to span
        span.appendChild(theLetter);

        // add class on span
        span.className="letter-box";

        // append span to the letters container
        lettersContainer.appendChild(span);
    });

    // set theme info
    document.querySelector(".game-info .theme span"). innerHTML = ' '+ propName;

    // select letters guess element or container
    lettersGuessContainer = document.querySelector(".letters-guess");

    // convert chosen word to array of characters/letters
    letterAndSpace = Array.from(randomValueValue);

    // create spans depending on word
    letterAndSpace.forEach(letter => {

        // create empty span 
        emptySpan = document.createElement("span");

        //if letter is space
        if (letter === ' '){

            //add class to the span
            emptySpan.className ='with-space';

        }

        // append spans to the letters guess container
        lettersGuessContainer.appendChild(emptySpan);

    });

    // select guess spans
    guessSpans = document.querySelectorAll(".letters-guess span");

    // select the draw element
    theDrawing = document.querySelector(".hangman-draw");
    
}



// handles clicking on letters 
document.addEventListener("click", (e) =>{

    // set the choice status
    theStatus = false;
   
    if(e.target.className === 'letter-box'){

        e.target.classList.add("clicked");

        // get clicked letter 
        clickedLetter = e.target.innerHTML.toLowerCase();

        // the chosen word 
        chosenWord = Array.from(randomValueValue.toLowerCase());

        chosenWord.forEach((wordLetter, wordIndex) =>{

            // if clicked letter equals to one of the chosen word's letter

            if (clickedLetter === wordLetter) {

                // set status to correct
                theStatus=true;

                // loop on all guess spans
                guessSpans.forEach((span, spanIndex) => {


                    if (wordIndex === spanIndex){

                        span.innerHTML = clickedLetter;
                    }
                });

            }
        }); 

        //outside of loop
        
        // if letter is wrong 
        if (theStatus !== true){

            // decrement lives left by 1
            livesLeft--;

            // display lives left
            document.querySelector(".game-info .lives-left"). innerHTML = "Lives left: "+ livesLeft;
      
            if (livesLeft === 7){

                //change shown img
                wrongAttemptImg1();
            }

            if (livesLeft === 4){

                //change shown img
                wrongAttemptImg2();
            }

            // add class wrong on the drawing element
            theDrawing.classList.add(`wrong-${livesLeft}`);
       
            //play fail sound
            failSnd = document.getElementById("fail");
            failSnd.currentTime = 0.001;
            failSnd.play();

            // if no lives are left user 
            if (livesLeft === 0) {

                loseImg();
                endGame();

            }

        } else {

            // play success sound
            successSnd = document.getElementById("success");
            successSnd.currentTime = 0.001;
            successSnd.play();

            // increment correct attempts by 1
            correctAttempts++;

            // filter out duplicate letters from chosen word
            uniqueChars = chosenWord.filter((c, index)=> {
                return chosenWord.indexOf(c)===index;
            });

            // remove space from chosen word
            for ( i = 0; i < uniqueChars.length; i++ ){

                if ( uniqueChars[i] === ' ' ){
                    uniqueChars.length--;
                }
            }

            // 
            if (correctAttempts === uniqueChars.length){
                
                winImg();
                winGame();
                
            }
        }
    }

});

// end game function 
function endGame(){

    //display finished lettersContainer
    lettersContainer.classList.add("finished");

    //play winning audio
    document.getElementById("game-over").play();

    // create popup div
    div = document.createElement("div");

    // create text 
    divText = document.createTextNode(`Game over! The word was ${randomValueValue}`);

    // append text to div
    div.appendChild(divText);

    // add class on div
    div.className = 'popup';

    // create restart button
    restartButton = document.createElement("button");

    // add inner text to button
    restartButton.innerText= 'Play Again';

    // append restartButton to div
    div.appendChild(restartButton);

    // append div to the body
    document.body.appendChild(div);


    // run initialize and removeStuff when button is clicked
    restartButton.addEventListener('click',() => {    
        removeStuff();
        initialize();   
   });

}

function winGame(){

    //display finished lettersContainer
    lettersContainer.classList.add("finished");

    //play winning audio
    document.getElementById("win").play();

    // create popup div
    div = document.createElement("div");

    // create text 
    divText = document.createTextNode(`You won! The word was ${randomValueValue}`);

    // append text to div
    div.appendChild(divText);

    // add class on div
    div.className = 'popup';

    // create restart button
    restartButton = document.createElement("button");

    // add inner text to button
    restartButton.innerText= 'Play Again';

    // append restartButton to div
    div.appendChild(restartButton);

    // append div to the body
    document.body.appendChild(div);


    // run initialize and removeStuff when button is clicked
    restartButton.addEventListener('click',() => {    
        removeStuff();
        initialize();   
   });

}

function removeStuff(){

    // remove popup
    popup = document.querySelector(".popup");
    popup.remove();

    // remove lettersContainer children
    while (lettersContainer.firstChild) {
        lettersContainer.removeChild(lettersContainer.firstChild);
      }

    // remove lettersGuessContainer children
    while(lettersGuessContainer.firstChild){
        lettersGuessContainer.removeChild(lettersGuessContainer.firstChild);
    }
    

}

function startImg() {
    document.getElementById("manny-start").src="images/Super-Manny_1.png";
  }

function wrongAttemptImg1() {
    document.getElementById("manny-start").src="images/Super-Manny_2.png";
  }

  function wrongAttemptImg2() {
    document.getElementById("manny-start").src="images/Super-Manny_3.png";
  }

  function winImg() {
    document.getElementById("manny-start").src="images/Super-Manny_Win.png";
  }

  function loseImg() {
    document.getElementById("manny-start").src="images/Super-Manny_4.png";
  }
