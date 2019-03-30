// Array of trivia questions
var triviaQuestions = [{
    question: "What is the state capital of Wyoming?",
    answerList: ["Cheyenne","Helena","Topeka","Bismark"],
    answer: 0
},{
    question: "What state does the capital Atlanta belong to?",
    answerList: ["Alabama","Tennessee","Georgia","Florida"],
    answer: 2
},{
    question: "What is the state capital of Kansas?",
    answerList: ["Helena","Topeka","Bismark","Cheyenne"],
    answer: 1
},{
    question: "What state does the capital Tallahassee belong to?",
    answerList: ["Tennessee","Alabama","Florida","South Carolina"],
    answer: 2
},{
    question: "What is the state capital of New York?",
    answerList: ["Hartford","Harrisburg","New York City","Albany"],
    answer: 3
},{
    question: "What state does the capital Pierre belong to?",
    answerList: ["South Dakota","North Dakota","Montana","Wisconsin"],
    answer: 0
},{
    question: "What is the state capital of Maine?",
    answerList: ["Portland","Bar Harbor","Augusta","Boston"],
    answer: 2
},{
    question: "What state does the capital Olympia belong to?",
    answerList: ["Oregon","Washington","Idaho","Montana"],
    answer: 1
},{
    question: "What is the state capital of Texas?",
    answerList: ["Austin","Houston","Dallas","El Paso"],
    answer: 0
},{
    question: "What state does the capital Montepelier belong to?",
    answerList: ["New Jersey","Deleware","New Hampshire","Vermont"],
    answer: 3
}]

// ----------------- VARIABLES
var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var percentCorrect;

// ----------------- FUNCTIONS

function newQuestion() {
    // resets everything
    $('#correct').hide();
    $('.correctMessage').hide();
    $('#incorrect').hide();
    $('.incorrectMessage').hide();
    $('#answerWas').hide();
    $('#endTime').hide();
    $('.endTimeMessage').hide();
    $('#finished').hide();
    $('#correctAnswer').empty();
    answered = true;

    // set up of new questions and their answers
    $('#currentQuestion').html('Question ' + (currentQuestion+1) + '/' + triviaQuestions.length);
    $('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>')
    for (var i = 0; i < 4; i++) {
        var choices = $('<div>');
        choices.text(triviaQuestions[currentQuestion].answerList[i])
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.answerList').append(choices);
    }

    countdown();
    $('.thisChoice').on('click', function() {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown() {
    seconds = 20;
    $('#timeLeft').html('<h3> Time Remaining: ' + seconds + ' seconds</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timeLeft').html('<h3> Time Remaining: ' + seconds + ' seconds</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage() { 
    
    // $('#correct').hide();
    // $('.correctMessage').hide();
    // $('#incorrect').hide();
    // $('.incorrectMessage').hide();
    // $('#answerWas').hide();
    // $('#endTime').hide();
    // $('.endTimeMessage').hide();
    // $('#finished').hide();
    
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
    var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

    if ((userSelect == rightAnswerIndex) && (answered == true)) {
        correctAnswer++;
        $('.correctMessage').show();
        $('#currentQuestion').show();
    } else if ((userSelect != rightAnswerIndex) && (answered == true)) {
        incorrectAnswer++;
        $('.incorrectMessage').show();
        $('#answerWas').show();
        $('#correctAnswer').html(rightAnswerText);
        $('#currentQuestion').show();
    } else {
        unanswered++;
        $('.endTimeMessage').show();
        $('#answerWas').show();
        $('#correctAnswer').html(rightAnswerText);
        $('#currentQuestion').show();
        answered = true;
    }

    if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard() {
    
    $('#correct').hide();
    $('.correctMessage').hide();
    $('#incorrect').hide();
    $('.incorrectMessage').hide();
    $('#answerWas').hide();
    $('#endTime').hide();
    $('.endTimeMessage').hide();
    $('#finished').hide();
    
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctAnswer').empty();

    var percentCorrect = Number(correctAnswer/triviaQuestions.length * 100);
    console.log("You got a : " + percentCorrect + "%")

    $('#finished').show();
    $('#percentage').show();
    $('#percentage').html(percentCorrect + "%");
    $('#correct').show();
    $('#incorrect').show();
    $('#endTime').show();
    $('#rightAnswers').html(correctAnswer);
    $('#wrongAnswers').html(incorrectAnswer);
    $('#unanswered').html(unanswered);
    $('#startOverButton').addClass('reset');
    $('#startOverButton').show();
    $('#startOverButton').html('Start Over?');
}

function newGame() {
    $('#initial-message').hide();
    $('#startButton').hide();
    $('#startOverButton').hide();
    // $('#correct').hide();
    // $('.correctMessage').hide();
    // $('#incorrect').hide();
    // $('.incorrectMessage').hide();
    // $('#answerWas').hide();
    // $('#endTime').hide();
    // $('.endTimeMessage').hide();
    // $('#finished').hide();
    $('#percentage').hide();

    $('#finalMessage').empty();
    $('#rightAnswers').empty();
    $('#wrongAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    unanswered = 0;
    newQuestion();
}

// jQuery logic for buttons
$('#startButton').on('click', function() {
    newGame();
})

$('#startOverButton').on('click', function() {
    newGame();
})