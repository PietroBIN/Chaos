
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
    question: "O que é um algoritmo?",
    answers: [
      { text: "Uma sequência de instruções finitas, ordenadas e não ambíguas para resolver um problema.", correct: true },
      { text: "Um programa de computador que executa tarefas complexas.", correct: false },
      { text: "Um conjunto de regras matemáticas para otimizar o desempenho de um código.", correct: false },
      { text: "Uma linguagem de programação de alto nível. ", correct: false },
    ],
  },
  {
    question: "Qual das seguintes opções NÃO é uma característica de um bom algoritmo?",
    answers: [
      { text: "Finitude", correct: false },
      { text: "Precisão", correct: false },
      { text: "Ambiguidades", correct: true },
      { text: "Eficiência ", correct: false },
    ],
  },
  {
    question: "O que é lógica de programação??",
    answers: [
      { text: "Uma linguagem de programação específica.", correct: false },
      { text: "Uma forma de organizar dados em um banco de dados.", correct: false },
      { text: "O processo de desenvolver algoritmos para resolver problemas de forma lógica.", correct: true },
      { text: "Uma técnica para otimizar o desempenho de hardware. ", correct: false },
    ],
  },
  {
    question: "Qual das seguintes opções NÃO é uma estrutura de controle em programação?",
    answers: [
      { text: "if(condicional)", correct: false },
      { text: "for(loop)", correct: false },
      { text: "while(loop)", correct: false },
      { text: "Variável", correct: true },
    ],
  },
  {
    question: "O que é uma variável em programação?",
    answers: [
      { text: "Um tipo de dado que armazena apenas valores numéricos.", correct: false },
      { text: "Uma função que realiza cálculos matemáticos. ", correct: false },
      { text: "Um local na memória do computador que armazena um valor, que pode ser alterado durante a execução do programa.", correct: true },
      { text: "Uma instrução que define a ordem de execução do código.", correct: false },
    ],
  },
  {
    question: "O que é compilação?",
    answers: [
      { text: "A execução de um programa passo a passo.", correct: false },
      { text: "O processo de traduzir o código fonte para linguagem binária da máquina.", correct: true },
      { text: "A criação de um banco de dados.", correct: false },
      { text: "A definição de variáveis em um programa.", correct: false },
    ],
  },
  {
    question: "Qual linguagem de programação é frequentemente usada para desenvolvimento web e inteligência artificial?",
    answers: [
      { text: " C++", correct: false },
      { text: "Python", correct: true },
      { text: "C#", correct: false },
      { text: "Java", correct: false },
    ],
  },
  {
    question: "O que é orientação a objetos?",
    answers: [
      { text: "Um paradigma de programação que se concentra em objetos e suas interações.", correct: true },
      { text: "Uma técnica para otimizar o desempenho de código.", correct: false },
      { text: "Uma forma de escrever código que é fácil de ler e entender.", correct: false },
      { text: "Uma linguagem de programação específica. ", correct: false },
    ],
  },
  {
    question: "O que é um loop em programação?",
    answers: [
      { text: "Uma variável que armazena um valor constante.", correct: false },
      { text: "Uma técnica para otimizar o desempenho de código.", correct: false },
      { text: "Uma função que retorna um valor específico.", correct: false },
      { text: "Uma estrutura que permite repetir um bloco de código várias vezes.", correct: true },
    ],
  },
  {
    question: "Qual a diferença entre linguagem de programação de alto nível e baixo nível?",
    answers: [
      { text: "Linguagens de baixo nível são mais fáceis de aprender e usar, enquanto linguagens de alto nível são mais próximas do hardware.", correct: false },
      { text: "Linguagens de alto nível são mais próximas do inglês, enquanto linguagens de baixo nível são mais próximas do código de máquina.", correct: true },
      { text: "Linguagens de alto nível são usadas para desenvolvimento web, enquanto linguagens de baixo nível são usadas para sistemas operacionais.", correct: false },
      { text: "Não há diferença significativa entre as duas. ", correct: false },
    ],
  }
];

// QUIZ STATE VARS
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  // reset vars
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  // reset state
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    // what is dataset? it's a property of the button element that allows you to store custom data
    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  // Here Array.from() is used to convert the NodeList returned by answersContainer.children into an array, this is because the NodeList is not an array and we need to use the forEach method
  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    // check if there are more questions or if the quiz is over
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 700);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "VOCÊ É DEDICADO!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "ÓTIMO TRABALHO!";
  } else if (percentage >= 60) {
    resultMessage.textContent = "NADA MAL!";
  } else if (percentage >= 40) {
    resultMessage.textContent = "VOCÊ CHEGA LÁ!";
  } else {
    resultMessage.textContent = "NÃO DESISTA!";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}
