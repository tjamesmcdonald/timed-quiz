// DEPENDENCIES

var buttonA = document.getElementById("buttonA");
var buttonB = document.getElementById("buttonB");
var buttonC = document.getElementById("buttonC");
var buttonD = document.getElementById("buttonD");
var timeEl = document.getElementById("time");
var mainEl = document.getElementById("main");
var startBTN = document.querySelector("#start");
var question = document.getElementById("question");
var highscoreList = document.getElementById("highscoreslist");
var highscoreBox = document.getElementById("scoresbox");


// DATA

var highScores = []
var timerInterval;
var secondsLeft;
var currentQuestion = 0;
var questionsList = [
    {
        question: "Who is the Primarch of the Blood Angels Legion?",
        answerA: "Horus",
        answerB: "Mortarion",
        answerC: "Sanguinius",
        answerD: "Malcador",
        correctAnswer: "Sanguinius"
    },
    {
        question: "Which temple of the Officio Assassinorum utilizes highly trained snipers?",
        answerA: "Culexus",
        answerB: "Vindicare",
        answerC: "Eversore",
        answerD: "Callidus",
        correctAnswer: "Vindicare"
    },
    {
        question: "How many origional Astarte Legions were there?",
        answerA: "18",
        answerB: "10",
        answerC: "12",
        answerD: "20",
        correctAnswer: "20"
    },
    {
        question: "Trazyn the Infinite is a member or which Necron dynasty?",
        answerA: "Nihilakh",
        answerB: "Mephrit",
        answerC: "Sautekh",
        answerD: "Szarekhan",
        correctAnswer: "Nihilakh"
    },
    {
      question: "What was the name of the genetically enhanced super soldiers that the Emperor created before the Adeptus Astartes?",
      answerA: "Thunder Warriors",
      answerB: "Immortals",
      answerC: "Death Korps of Krieg",
      answerD: "Fire Warriors",
      correctAnswer: "Thunder Warriors"
     },
     {
      question: "What was the name of the corrupt High Lord of Terra that ruled durring the age of Apostacy?",
      answerA: "Constatine Valdor",
      answerB: "Bellisarius Cawl",
      answerC: "Goge Vandire",
      answerD: "Saint Celestine",
      correctAnswer: "Goge Vandire"
     },
     {
      question: "Which weapon is not used by the Imperium of Man?",
      answerA: "Plasma Pistol",
      answerB: "Bolter",
      answerC: "Phase Blade",
      answerD: "Tesla Cannon",
      correctAnswer: "Tesla Cannon"
     },
     {
      question: "Which Space Marine Chapter was founded durring the Cursed Founding?",
      answerA: "Astral Claws",
      answerB: "Ultra Marines",
      answerC: "Retributors",
      answerD: "Black Dragons",
      correctAnswer: "Black Dragons"
     },
     {
      question: "Which Primarch did not join Horus durring the Horus Heresey?",
      answerA: "Rogal Dorn",
      answerB: "Mortarion",
      answerC: "Fulgrim",
      answerD: "Perturabo",
      correctAnswer: "Rogal Dorn"
     },
     {
      question: "Which Space Marine Chapter is not codex compliant?",
      answerA: "Lamenters",
      answerB: "Black Templars",
      answerC: "Salamanders",
      answerD: "White Scars",
      correctAnswer: "Black Templars"
     },
    {
      question: "The Emperor...",
      answerA: "Protects!",
      answerB: "Protects!",
      answerC: "Protects!",
      answerD: "Protects!",
      correctAnswer: "Protects!"
     }
]

// FUNCTIONS
function init() {
  var storedhighScores = JSON.parse(localStorage.getItem("highScores"));
  if (storedhighScores !== null) {
    highScores = storedhighScores;
  }

}

function renderhighScores() {
  highscoreList.innerHTML = ""
  highscoreBox.setAttribute("style", "display: block")
  for (var i = 0; i < highScores.length; i++) {
    var score = highScores[i];

    var li = document.createElement("li");
    li.textContent = "Name: " + highScores[i].name + "  " + "Score: " + highScores[i].scoreTime;
    li.setAttribute("data-index", i);
    highscoreList.appendChild(li);

  }

}
function nextQuestion() {
  question.textContent = questionsList[currentQuestion].question
  buttonA.textContent = questionsList[currentQuestion].answerA
  buttonB.textContent = questionsList[currentQuestion].answerB
  buttonC.textContent = questionsList[currentQuestion].answerC
  buttonD.textContent = questionsList[currentQuestion].answerD

}
function youWin() {
  alert("You Win!")
  var scoreObject = {
    name: prompt("Please enter your Name",),
    scoreTime: secondsLeft
  }
  highScores.push(scoreObject)
  localStorage.setItem("highScores", JSON.stringify(highScores))
  console.log(secondsLeft)
  clearInterval(timerInterval)
  question.textContent = ''
  buttonA.textContent = ''
  buttonB.textContent = ''
  buttonC.textContent = ''
  buttonD.textContent = ''
  buttonA.setAttribute("style", "display: none;")
  buttonB.setAttribute("style", "display: none;")
  buttonC.setAttribute("style", "display: none;")
  buttonD.setAttribute("style", "display: none;")
  renderhighScores();
  return;
}
function gameOver() {
  
  if (confirm("You Lose! Would you like to play again?") === true) {
    init();
  } else {
    alert("Thanks for playing!")
    timeEl.textContent = ""
    buttonA.setAttribute("style", "display: none;")
    buttonB.setAttribute("style", "display: none;")
    buttonC.setAttribute("style", "display: none;")
    buttonD.setAttribute("style", "display: none;")
    question.textContent = ''
    buttonA.textContent = ''
    buttonB.textContent = ''
    buttonC.textContent = ''
    buttonD.textContent = ''
    console.log(secondsLeft)
    return;
  }

}
function startQuiz() {
    secondsLeft = 60
    currentQuestion = 0
    highscoreBox.setAttribute("style", "display: none")
    timeEl.setAttribute("style", "display: block;")
    buttonA.setAttribute("style", "display: block;")
    buttonB.setAttribute("style", "display: block;")
    buttonC.setAttribute("style", "display: block;")
    buttonD.setAttribute("style", "display: block;")
    timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";

  
      if(secondsLeft <= 0) {
        clearInterval(timerInterval);
        gameOver();
      }
  
    }, 1000);
  nextQuestion();
}


// USER INTERACTIONS
startBTN.addEventListener("click", startQuiz);
buttonA.addEventListener("click", function () {
  if(buttonA.textContent != questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    secondsLeft = secondsLeft - 20;
    currentQuestion++
    nextQuestion();
    console.log("incorrect")
  } else if(buttonA.textContent = questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    currentQuestion++
    nextQuestion()
    console.log("correct")
  } else {
    youWin();

  }
  
})

buttonB.addEventListener("click", function () {
  if(buttonB.textContent != questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    secondsLeft = secondsLeft - 20;
    currentQuestion++
    nextQuestion();
    console.log("incorrect")
  } else if(buttonB.textContent = questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    currentQuestion++
    nextQuestion()
    console.log("correct")
  } else {
    youWin();

  }
  
})

buttonC.addEventListener("click", function () {
  if(buttonC.textContent != questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    secondsLeft = secondsLeft - 20;
    currentQuestion++
    nextQuestion();
    console.log("incorrect")
  } else if(buttonC.textContent = questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    currentQuestion++
    nextQuestion()
    console.log("correct")
  } else {
    youWin();

  }
  
})

buttonD.addEventListener("click", function () {
  if(buttonD.textContent != questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    secondsLeft = secondsLeft - 20;
    currentQuestion++
    nextQuestion();
    console.log("incorrect")
  } else if(buttonD.textContent = questionsList[currentQuestion].correctAnswer && currentQuestion < questionsList.length-1) {
    currentQuestion++
    nextQuestion()
    console.log("correct")
  } else {
    youWin();

  }
  
})

// INITIALIZATIONS

init();