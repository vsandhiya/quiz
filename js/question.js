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
    new Question(" 1. (753*753+247*247-753*247)/(753*753*753+247*247*247) = ?", ["1/1000", "1/506","253/500", "None of these"], "1/1000"),
    new Question(" 2. How much time will it take for an amount of Rs.450 to yield Rs.81 as interest at 4.5% per annum of simple interest?", ["3.5 years", "4 years", "4.5 years", "5 years"], "4 years"),
    new Question(" 3. what will be the day of the week 15th August,2010?", ["Sunday", "Monday","Tuesday", "Friday"], "Sunday"),
    new Question(" 4. A batsman scored 110 runs which included 3 boundaries and 8 sixes.what percent of his total score did he make by running between the wickets?", ["45%", "45,5/11%", "54,6/11%", "55%"], "45,5/11%"),
    new Question(" 5. The sum of ages of 5 children born at the intervels of 3 years each in 50 years.what is the age of the youngest child?", ["4 years", "8 years", "10 years", "None of these"], "4 years")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();