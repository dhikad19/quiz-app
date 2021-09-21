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
        question: "Melakukan awalan dengan langkah ancang-ancang lebar dan datar merupakan salah satu cara melakukan?",
        choice1: "Pertahanan",
        choice2: "Menyerang",
        choice3: "Umpan",
        choice4: "Smash",
        answer: 4,
    },
    {
        question: "Tinggi net bola voli untuk putra adalah?",
        choice1: "3 meter",
        choice2: "2.43 meter",
        choice3: "1 meter",
        choice4: "2 meter",
        answer: 2,
    },
    {
        question: "Pukulan bola yang menukik ke arah lapangan lawan adalah?",
        choice1: "Servish",
        choice2: "Blok",
        choice3: "Smash",
        choice4: "Umpan",
        answer: 3,
    },
    {
        question: "Siasat yang dilakukan oleh pelari di base, yaitu?",
        choice1: "Single steal",
        choice2: "Double steal",
        choice3: "Hit and run",
        choice4: "The steal",
        answer: 4,
    },
    {
        question: "Lari jarak menengah adalah lari yang menempuh jarak?",
        choice1: "1100 meter",
        choice2: "800 meter",
        choice3: "700 meter",
        choice4: "1500 meter",
        answer: 2,
    },
    {
        question: "Bagian kaki yang mengenai tanah ketika melakukan lari adalah?",
        choice1: "Telapak kaki bagian depan",
        choice2: "Telapak kaki bagian belakang",
        choice3: "Telapak kaki bagian keduanya",
        choice4: "Seluruh telapak kaki",
        answer: 1,
    },
    {
        question: "Lebar lintasan awalan pada lompat jauh adalah?",
        choice1: "1.21 meter",
        choice2: "1.22 meter",
        choice3: "1.23 meter",
        choice4: "1.24 meter",
        answer: 2,
    },
    {
        question: "Dalam lari jarak menengah, start yang dipakai adalah start?",
        choice1: "Berdiri",
        choice2: "Jongkok",
        choice3: "Duduk",
        choice4: "Lari",
        answer: 1,
    },
    {
        question: "Memiliki daya tahan kardio respiratori yang baik dan lebih banyak merupakan ciri-ciri pelari jarak?",
        choice1: "Sedang",
        choice2: "Dekat",
        choice3: "Jauh",
        choice4: "Pendek",
        answer: 3,
    },
    {
        question: "Batas jarak awalan pada lompat jauh adalah?",
        choice1: "25-40 meter",
        choice2: "30-45 meter",
        choice3: "55-60 meter",
        choice4: "65-70 meter",
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