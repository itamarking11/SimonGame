var gamePattern = [];
var userClickedPattern = [];
//console.log(userClickedPattern);
var buttonColours = ["red", "blue", "green", "yellow"];

for (var i = 0; i < buttonColours.length; i++) {
  var element = document.querySelector("#" + buttonColours[i]);
  /**@todo Change the line below to add eventListener to all the buttons */
  element.addEventListener("click", check); //מקשיב לאיוונט קליק
}

var level = 0;

var press = false;

document.addEventListener("keypress", function (event) {
  console.log(event);
  if (event.key == "k" && press == false) {
    document.getElementById("level-title").innerHTML = "Level " + level;
    nextSequence();
    press = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  var randomSound = new Audio("sounds/" + randomChosenColour + ".mp3");
  level++;
  document.getElementById("level-title").innerHTML = "Level " + level;
  animatePress(randomChosenColour);
  gamePattern.push(randomChosenColour);
  randomSound.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
    console.log("Success");
  } else {
    var body = document.querySelector("body");
    var wrong = new Audio("sounds/wrong.mp3");
    console.log("Wrong");
    wrong.play();
    body.classList.add("game-over");
    setTimeout(function () {
      body.classList.remove("game-over");
    }, 200);
    document.getElementById("level-title").innerHTML = "Game over press k to start";
    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
press = false;
userClickedPattern = [];
}

function check(event) {
  var buttonPressed = event.target.id;
  userClickedPattern.push(buttonPressed);
  console.log(userClickedPattern);
  playsound(buttonPressed);
  animatePress(buttonPressed);
  checkAnswer(userClickedPattern.length - 1);
}

function playsound(color) {
  var randomSound = new Audio("sounds/" + color + ".mp3");
  randomSound.play();
}

function animatePress(currentColour) {
  var selectColour = document.querySelector("#" + currentColour);

  var delayInMilliseconds = 100;

  selectColour.classList.add("pressed");

  setTimeout(function () {
    selectColour.classList.remove("pressed");
  }, delayInMilliseconds);
}
