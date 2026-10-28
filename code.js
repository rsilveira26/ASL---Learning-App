//import lists from dataset
var lettersList = getColumn("American Sign Language Alphabet", "Letter"); //letters of ASL Alphabet
var signsList = getColumn("American Sign Language Alphabet", "Image"); //images of ASL Alphabet

//initialize the variables
var percent = 0;
var correctLetter = "";
var guess = "";
var score = 0;
var step = 0;
var questionNumber = 5;

//create a list of indexes for the number of questions
var numbers = [];
for (var r = 0; r <= 25; r++) {
    numbers.push(r);
  }

shuffleArray(numbers); //create a randomized list of the indexes {questions}
var result = numbers.slice(0,5); //select 5 distinct questions

//Call to newQuestion() generates the first question
newQuestion();

//One onEvent for each answer button
onEvent("choice1Button", "click", function( ) {
	guess = getText("choice1Button");
	nextQuestion(guess, correctLetter);
});

onEvent("choice2Button", "click", function( ) {
	guess = getText("choice2Button");
	nextQuestion(guess, correctLetter);
});

onEvent("choice3Button", "click", function( ) {
	guess = getText("choice3Button");
	nextQuestion(guess, correctLetter);
});

onEvent("choice4Button", "click", function( ) {
	guess = getText("choice4Button");
	nextQuestion(guess, correctLetter);
});

//Resets the global variables and brings user back to the main screen
onEvent("playAgainButton", "click", function( ) {
	score = 0;
	step = 0;
	shuffleArray(numbers);
	result = numbers.slice(0,5);
	newQuestion();
	setScreen("quizScreen");
});


//Procedure 1: newQuestion function
//generate the next question on the randomized list
function newQuestion() {
 if (step < result.length) {
  var index = result[step];
  correctLetter = lettersList[index];
  setImageURL("signImage", signsList[index]);
 
 //Use the index to populate a random answer choice with the correct name
  fillAnswerButtons(index); //call selected Procedure 4 to fill the answer buttons
  } else {
    percent = (score/questionNumber) * 100; //calculate the answer score in percentage
    //output of code: if 100% congrats, if 60 or 80, they pass, if else fail
    if (percent == 100) {
      setText("scoreLabel", "Congratulations! You got a " + percent + "%!");
      setImageURL("congratsImage", "https://images.emojiterra.com/google/noto-emoji/unicode-15/color/512px/1f973.png");
    } else if (percent >= 60) {
      setText("scoreLabel", "Good job! You got a " + percent + "%!");
      setImageURL("congratsImage", "https://images.emojiterra.com/twitter/v14.0/1024px/1f44d.png");
    } else {
      setText("scoreLabel", "Keep trying! You got a " + percent + "%!");
      setImageURL("congratsImage", "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png");
    }
    setScreen("scoreScreen");
  }
} //end of procedure 1

//Procedure 2: nextQuestion function
//move to next question, grade previous question
//parameter: userChoice {string} - letter that the user selected
//parameter: correctAnswer {string} - correct letter for the question
function nextQuestion(userChoice, correctAnswer) {
	if (userChoice == correctAnswer) {
	   score = score + 1;
	 }
	step = step + 1;
	newQuestion();
 } //end of procedure 2

//Procedure 3: shuffleArray function
//Shuffle the array
//array {list} - list of numbers to shuffle
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = randomNumber(0, i);
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
} //end of procedure 3

//Procedure 4 {selected procedure}: fillAnswerButtons function
//fill the answer buttons randomly
//parameter: index {number} - the index of the correct answer
function fillAnswerButtons(index) {
  //select a random button {from the four options} for the correct answer
  var randAnswerChoice = randomNumber(1,4);
  setText("choice" + randAnswerChoice + "Button", lettersList[index]);
  
  //algorithm: fill the remaining answer buttons
  //select the location of the answer options
  //iterating through the four randomized answers and assign to buttons
  if (index < lettersList.length - 4) {
    for (var i = 0; i < 3; i++) {
      if(randAnswerChoice == 4){
        randAnswerChoice = 0;
      }
      randAnswerChoice = randAnswerChoice + 1;
      index = index + 1;
      setText("choice" + randAnswerChoice + "Button", lettersList[index]);
    }
  } else {
    for (var j = 0; j < 3; j++) {
      if(randAnswerChoice == 4){
        randAnswerChoice = 0;
      }
      randAnswerChoice = randAnswerChoice+1;
      index = index - 1;
      setText("choice" + randAnswerChoice + "Button", lettersList[index]);
    }
  }
} //end of procedure 4
