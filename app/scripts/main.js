var totalScore = 0;
var questionCounter = 0;
var countdownTimer = 6;
var questionTimer;

var startBtn = document.getElementById('startBtn');
var resetBtn = document.getElementById('resetBtn');
var questionCounterUi = document.getElementById('questionCounterUi');

var boxQuestion = document.getElementById('boxQuestion');
var question = document.getElementById('question');
var answerField = document.getElementById('answer');
var questionCountdown = document.getElementById('countdown');

var uiFeedback = document.getElementById('uiFeedback');

var userAnswer = '';
var responseAfterCheck = '';

var timesArray = [3, 4, 5, 6, 7, 8, 9, 11, 12];
var times;
var numberToMult;

/**
 * Events
 */

startBtn.addEventListener('click', function() {
  startQuiz();
});

resetBtn.addEventListener('click', function() {
  startQuiz();
});

/**
 * Functions
 */

function appTimer() {
  countdownTimer = countdownTimer - 1;
  if (countdownTimer <= 0) {
    clearInterval(questionTimer);
    checkAnswer();
    questionCountdown.innerHTML = '';
    return;
  }
  questionCountdown.innerHTML = countdownTimer + ' seconds';
  //console.log(countdownTimer);
}

function startQuiz() {
  uiFeedback.innerHTML = '';
  questionCounter = 1;
  totalScore = 0;
  answer.value = '';
  answer.focus();
  responseAfterCheck = '';
  questionCounterUi.innerHTML = questionCounter + '/30';
  countdownTimer = 6;
  displayQuestion();
  startBtn.className = ' hide';
  boxQuestion.className += ' show';
}

function displayQuestion() {
  answerField.value = '';
  questionCounterUi.innerHTML = questionCounter + '/30';
  times = timesArray[Math.floor(Math.random() * timesArray.length)];
  numberToMult = Math.floor(Math.random() * 10) + 3;
  question.innerHTML = times + ' x ' + numberToMult + ' ?';
  countdownTimer = 6;
  questionTimer = setInterval(appTimer, 1000);
}

function checkAnswer() {
  var responseContent;
  var userInput = answerField.value;

  userAnswer = parseInt(userInput);

  if (userAnswer === times * Number(numberToMult)) {
    totalScore++;
    questionCounter++;

    responseContent =
      '<span class=\'correct\'><h3>That\'s awesome!</h3><br><span> ' +
      times +
      ' x ' +
      numberToMult +
      ' = ' +
      userAnswer +
      '!</span></span>';

    if (questionCounter === 31) {
      questionCounter -= 1;
      showFinalResults();
      return;
    } else {
      //wait for 3s and display new question
      setTimeout(function() {
        displayQuestion();
        uiFeedback.innerHTML = '';
      }, 3000);
    }
  } else if (userAnswer !== times * Number(numberToMult) || isNaN(userAnswer)) {
    resetBtn.className += ' show';
    if (isNaN(userAnswer)) {
      userAnswer = 'empty';
    }

    responseContent =
      '<span class=\'wrong\'><h3>Sorry, you failed!</h3><br><span>That\'s wrong: ' +
      times +
      ' x ' +
      numberToMult +
      ' it is not ' +
      userAnswer +
      '.<br>The right anwser is ' +
      times * numberToMult +
      '</span></span>';
  }

  responseAfterCheck = responseContent;
  uiFeedback.innerHTML = responseAfterCheck;
  answer.value = '';
}

function showFinalResults() {
  var finalResultOutput =
    '<span class=\'correct\'><h3>Good work, you\'ve passed the test!</h3><br><span>Score: ' +
    totalScore +
    ' out of ' +
    questionCounter +
    '</span></span>';

  uiFeedback.innerHTML = finalResultOutput;
}
