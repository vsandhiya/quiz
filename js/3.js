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
    new Question(" 1. Which state government released first Marine Ambulance ?", ["Kerala", "Odisha", "Goa", "Assam"], "Kerala"),
    new Question(" 2. World Health Organization (WHO) declared which continent free of Wild Poliovirus ?", ["Africa", "Asia", "Europe", "Antarctica"], "Africa"),
    new Question(" 3. Who authored the book titled A bend in Time:Writings by children on the covid-19 pandemic ?", ["Kritika", "Bijal Vachharajani","Avni Doshi", "Rudyard Kipling"], "Bijal Vachharajani"),
    new Question(" 4. Who addressed the opening session of The Naval conference 2020 ? ", ["Narendra Modi", "Ramnath Kovind", "Amit Shah", "Rajnath Singh"], "Rajnath Singh"),
    new Question(" 5. Which association partnered with UNDP to set up help desk for MSME amid COVID-19", ["FCI", "CMIA", "DDA", "NABARD"], "CMIA")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();