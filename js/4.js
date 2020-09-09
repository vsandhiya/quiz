function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
 
 
function populate() {
    if(quiz.isEnded()) {
        showScores();
    }
    else {
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};
 
// create questions here
var questions = [
    new Question(" 1. How long is an IPv6 address?", ["32 bits", "128 bits","64 bits", "128 bits"], "128 bits"),
    new Question(" 2. Which command would you place on interface on a private network?", ["ip nat inside", "ip nat outside", "ip outside global", "ip inside local"], "ip nat inside"),
    new Question(" 3. Which WAN encapsulations can be configured on an asynchronous serial connection?", ["PPP and ATM", "ATM and SDLC","SDLC and Frame Relay", "HDLC and SDLC"], "PPP and ATM"),
    new Question(" 4. Segmentation of a data stream happens at which layer of the OSI model ?", ["Physical", "Data link", "Net work", "Transport"], "Transport"),
    new Question(" 5. Which method bypasses the CPU for certain types of data transfer?", ["Software interrupts", "Interrupt-driven I/O", "Polled I/O", "Direct memory access"], "Direct memory access")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();