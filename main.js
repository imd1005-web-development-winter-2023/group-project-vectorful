//letters 
const letters ="abcdefghijklmnopqrstuvwxyz";

//get array from letters 
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

//generate letters 
lettersArray.forEach(letter => {
 
    //create span
    let span = document.createElement("span");

    // create letters text node 
    let theLetter = document.createTextNode(letter);

    //append the letter to span
    span.appendChild(theLetter);

    // add class on span
    span.className="letter-box";

    // append doan to the letters container
    lettersContainer.appendChild(span);
});


//object of words and themes
const words ={
    movies:["Titanic", "Inception", "Up", "Tangled", "Whiplash"],
    countries:["Canada", "Libya", "Turkey", "Egypt", "France", "Jamaica", "China"],
    superheros:["Superman","Spider man", "Batman"],
    bands:["band one", "band two"]
};

//get random word or property 

let allKeys = Object.keys(words);

//random number depending on keys length
let randomPropNum = Math.floor(Math.random() * allKeys.length)//0, 1, 2 or 3

//allKeys[0]=movies
//allKeys[1]=countries
//allKeys[2]=superheros
//allKeys[3]=bands

// theme
let randomPropName = allKeys[randomPropNum];

// theme words
let randomPropValue = words[randomPropName];

// random number depending on words
let randomValueNum = Math.floor(Math.random() * randomPropValue.length);

// the chosen word
let randomValueValue = randomPropValue[randomValueNum];

//set theme info
document.querySelector(".game-info .theme span"). innerHTML = ' '+ randomPropName + ' '+randomValueValue;

//select letters guess element or container
let lettersGuessContainer = document.querySelector(".letters-guess");

//convert chosen word to array of characters/letters
let letterAndSpace = Array.from(randomValueValue);

// create spans depending on word
letterAndSpace.forEach(letter => {

    // create empty span 
    let emptySpan = document.createElement("span");

    //if letter is space
    if (letter === ' '){

        //add class to the span
        emptySpan.className ='with-space';

    }

    // append spans to the letters guess container
    lettersGuessContainer.appendChild(emptySpan);


});

// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span")


// set lives left
let livesLeft = 10;

// set correct attempts
let correctAttempts = 0;


//select the draw element
let theDrawing = document.querySelector(".hangman-draw");


// handles clicking on letters 
document.addEventListener("click", (e) =>{

    // set the choice status
    let theStatus = false;
   
    if(e.target.className === 'letter-box'){

        e.target.classList.add("clicked");

        // get clicked letter 
        let clickedLetter = e.target.innerHTML.toLowerCase();

        // the chosen word 
        let chosenWord = Array.from(randomValueValue.toLowerCase());

        // chosen word length
        let chosenWordLength = chosenWord.length;


        // chosen word length with space
        for ( let i = 0; i < chosenWord.length; i++ ){

            if ( chosenWord[i] === ' ' ){
                chosenWordLength--;
            }
        }


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
            document.querySelector(".game-info .lives-left"). innerHTML = "Lives remaining: "+livesLeft;
      
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
            let failSnd = document.getElementById("fail");
            failSnd.currentTime = 0.001;
            failSnd.play();

            if (livesLeft === 0) {

                loseImg();
                endGame();

                lettersContainer.classList.add("finished");

            }

        } else {

            // play success sound
            let successSnd = document.getElementById("success");
            successSnd.currentTime = 0.001;
            successSnd.play();

            // increment correct attempts by 1
            correctAttempts++;

            // filter out duplicate letters
            let uniqueChars = chosenWord.filter((c, index)=> {
                return chosenWord.indexOf(c)===index;
            });

            if (correctAttempts === uniqueChars.length){
                
                winImg();
                winGame();
            }
        }
    }

});

// end game function 

function endGame(){

    //play game over audio
    document.getElementById("game-over").play();

    // create popup div
    let div = document.createElement("div");

    // create text 
    let divText = document.createTextNode(`Game over! The word was ${randomValueValue}`);

    // append text to div
    div.appendChild(divText);

    // add class on div
    div.className = 'popup';

    //append to the body
    document.body.appendChild(div);

}

function winGame(){

    //play winning audio
    document.getElementById("win").play();

    // create popup div
    let div = document.createElement("div");

    // create text 
    let divText = document.createTextNode(`You won! The word was ${randomValueValue}`);

    // append text to div
    div.appendChild(divText);

    // add class on div
    div.className = 'popup';

    //append to the body
    document.body.appendChild(div);

}

function wrongAttemptImg1() {
    document.getElementById("manny-start").src="images/Mannie_2.png";
  }

  function wrongAttemptImg2() {
    document.getElementById("manny-start").src="images/Mannie_3.png";
  }

  function winImg() {
    document.getElementById("manny-start").src="images/Mannie_Win.png";
  }

  function loseImg() {
    document.getElementById("manny-start").src="images/Mannie_4..Lose.png";
  }
