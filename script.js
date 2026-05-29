'use strict';
// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

const thresholds = [
  { min: 100, text: "Perfect! You're a genius!" },
  { min: 80, text: "Great job! You know your stuff!" },
  { min: 60, text: "Good effort! Keep learning!" },
  { min: 40, text: "Not bad! Try again to improve!" },
  { min: 0, text: "Keep studying! You'll get better!" }
];

// QUIZ STATE VARM
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

//event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  switchScreen(startScreen, quizScreen)

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex]

  currentQuestionSpan.textContent = currentQuestionIndex + 1

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  // todo: explain this in a second
  answersContainer.innerHTML = ""

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // it's a property of the button element thst allow you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });

}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  //todo: explain this in a sec
  Array.from(answersContainer.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct")
    } else if (button === selectedButton) {
      button.classList.add("incorrect")
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score
  }

  setTimeout(() => {
    currentQuestionIndex++

    // check if there are more questions or if the quix id over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion()
    } else {
      showResults()
    }
  }, 1000);
}

function showResults() {
  switchScreen(quizScreen, resultScreen)

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions, length * 100)

  const matched = thresholds.find(t => percentage >= t.min);
  resultMessage.textContent = matched.text;
}

function switchScreen(hideScreen, showScreen) {
  hideScreen.classList.remove("active");
  showScreen.classList.add("active");
}


function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}