const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Jika f (x) 2x + 4 dan g (x) = (x + 1), maka (nebula) adalah -1 (x)",
        choice1: "(2x + 4) / (2x + 2)",
        choice2: "(2x + 4) / (2x + 2)",
        choice3: "(x + 5) / (2)",
        choice4: "(x + 5) / (4)",
        answer: 3,
    },
    {
        question: "Persamaan garis sejajar dengan garis 2x + y = 2 = 0 dan melalui titik (−2.3) adalah?",
        choice1: "2x + y + 1 = 0",
        choice2: "2x + y – 1 = 0",
        choice3: "2x – y – 1 = 0",
        choice4: "−2x + y + 1 = 0",
        answer: 1,
    },
    {
        question: "Persamaan kuadrat melalui poin (-3, -1), (-1, -5) dan (2, 4) adalah",
        choice1: "y = x2 + 2x – 4",
        choice2: "y = x2 – 3x – 4",
        choice3: "y = 2×2 + 2x + 5",
        choice4: "y = x2 – 3x + 5",
        answer: 1,
    },
    {
        question: "Dalam ABCD cube EFGH, panjang tulang rusuk 8 cm, jarak dari titik E ke tingkat BDG",
        choice1: "1/3 √3 cm",
        choice2: "2/3 √3 cm",
        choice3: "4/3 √3 cm",
        choice4: "16/3 √3 cm",
        answer: 2,
    },
    {
        question: "5 x (10 + 25) - 240 : 12",
        choice1: "-14",
        choice2: "-6",
        choice3: "252",
        choice4: "155",
        answer: 4,
    },
    {
        question: "Hasil dari (‐ 550) + 320 : 80 ‐ (-35 x 6) adalah?",
        choice1: "336",
        choice2: "-243",
        choice3: "-336",
        choice4: "243",
        answer: 3,
    },
    {
        question: "Jika X/Y = 45, maka hasil dari 2X/3Y adalah",
        choice1: "25",
        choice2: "27",
        choice3: "29",
        choice4: "30",
        answer: 4,
    },
    {
        question: "Suatu bilangan jika dikalikan 11 hasilnya adalah 660. Jika bilangan yang sama dibagi 3, maka hasilnya adalah",
        choice1: "20",
        choice2: "30",
        choice3: "40",
        choice4: "50",
        answer: 1,
    },
    {
        question: "Hasil dari 50 - 51 + 52 - 53 + 54 - ... -99 adalah?",
        choice1: "-50",
        choice2: "-1",
        choice3: "-25",
        choice4: "50",
        answer: 1,
    },
    {
        question: "Area asal fungsi f (x) = 6 / (x -2) adalah",
        choice1: "{x | x ∊ R, x ≠ 2}",
        choice2: "{x | x ∊ R, x ≠ 2, x ≠ 4}",
        choice3: "{x | -3 2, x ∊ R}",
        choice4: "{x | x <-3 atau x> 3, x ∊ R}",
        answer: 2,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)

        return window.location.assign("/end/end.html")
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset["number"]
        choice.innerText = currentQuestion["choice" + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset["number"]

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" :
            "incorrect"

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()