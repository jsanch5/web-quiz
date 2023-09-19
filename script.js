

const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["a) strings", "b) booleans", "c) alerts"],
        correctAnswer: "b"
    },
    {
        question: "The condition if an if/else statement is enclosed within",
        choices: ["a) quotes", "b) curly brackets", "c) parentheses", "d) square brackets"],
        correctAnswer: "b"
    },
    {
        question: "Arrays in Javascript can be used to store",
        choices: ["a) numbers and strings", "b) other arrays", "c) booleans", "d) all the above"],
        correctAnswer: "c"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let countdown;
let timeRemaining = 60;
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const countdownElement = document.getElementById("countdown");
const initialsInput = document.getElementById("initials");
const submitScoreButton = document.getElementById("submit-score");

function startQuiz() {
    startButton.style.display = "none";
    countdown = setInterval(updateTimer, 1000);
    showQuestion(currentQuestionIndex);
}

function updateTimer() {
    if (timeRemaining > 0) {
        timeRemaining--;
        countdownElement.textContent = timeRemaining;
    } else {
        clearInterval(countdown);
        showResult();
    }
}

function showQuestion(questionIndex) {
    const question = questions[questionIndex];
    questionElement.textContent = question.question;

    choicesElement.innerHTML = "";
    question.choices.forEach((choice, index) => {
        const choiceElement = document.createElement("li");
        choiceElement.textContent = choice;
        choiceElement.addEventListener("click", () => checkAnswer(choice, question.correctAnswer));
        choicesElement.appendChild(choiceElement);
    });
}

function checkAnswer(selectedChoice, correctAnswer) {
    if (selectedChoice === correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect!";
        timeRemaining -= 10;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    } else {
        clearInterval(countdown);
        showResult();
    }
}

function showResult() {
    questionElement.textContent = `Quiz Complete! Your Score: ${score}/${questions.length}`;
    choicesElement.innerHTML = "";
    resultElement.textContent = "";
    initialsInput.style.display = "block";
    submitScoreButton.style.display = "block";
}

function saveHighScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        // Save the score and initials here
        alert(`Score: ${score}/${questions.length}, Initials: ${initials}`);
    }
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
    }
});

submitScoreButton.addEventListener("click", saveHighScore);