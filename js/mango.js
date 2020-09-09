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
    new Question(" 1. ENORMOUS= Antonym ?", ["Soft", "Average","Tiny", "Weak"], "Tiny"),
    new Question(" 2. Look at this series:1.5,2.3,3.1,3.9,......", ["4.2", "4.4", "4.7", "5.1"], "4.7"),
    new Question(" 3. If A is the brother of B;B is the sister of C;and C is the father of D,how D is related to A?", ["Brother", "Sister","Nephew", "Cannot be determined"], "Cannot be determined"),
    new Question(" 4. Which one of the following is always found in 'bravery'?", ["Experience", "Power", "Courage", "Knowledge"], "Courage"),
    new Question(" 5. Cup is to coffee as bowl is to ", ["Dish", "Soup", "Spoon", "Food"], "Soup")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
populate();