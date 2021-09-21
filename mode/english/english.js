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
        question: "I and friends .. in the library. We read some books.",
        choice1: "Am",
        choice2: "Is",
        choice3: "Have",
        choice4: "Are",
        answer: 4,
    },
    {
        question: "I think .... come at the meeting tomorrow.",
        choice1: "I will",
        choice2: "I will to",
        choice3: "I will be going to",
        choice4: "I will to going to",
        answer: 1,
    },
    {
        question: "Alinna .. song every night.",
        choice1: "Sings",
        choice2: "Sing",
        choice3: "Is",
        choice4: "Does",
        answer: 1,
    },
    {
        question: "My father .. tea every morning.",
        choice1: "Drink",
        choice2: "Drinks",
        choice3: "Drinking",
        choice4: "Is",
        answer: 2,
    },
    {
        question: "Would you mind .. please?",
        choice1: "For answering the telephone",
        choice2: "To answer the telephone",
        choice3: "Answer the telephone",
        choice4: "Answering the telephone",
        answer: 4,
    },
    {
        question: "She is a student. She .. at school.",
        choice1: "Studying",
        choice2: "Study",
        choice3: "Studies",
        choice4: "Learn",
        answer: 3,
    },
    {
        question: "We .. soccer match.",
        choice1: "doing",
        choice2: "watching",
        choice3: "watches",
        choice4: "watch",
        answer: 4,
    },
    {
        question: "Gina cooks fried rice. It .. amazing",
        choice1: "Does",
        choice2: "Do",
        choice3: "Are",
        choice4: "Is",
        answer: 4,
    },
    {
        question: "I could have asked somebody else to carry that box” means ..",
        choice1: "I didn’t want to carry the box",
        choice2: "I carried the box",
        choice3: "I asked someone to carry the box",
        choice4: "I would ask someone to carry the box",
        answer: 3,
    },
    {
        question: "Ms. Jenifer .. a lot of novel since she was a teenager.",
        choice1: "Has being read",
        choice2: "Has read",
        choice3: "Has been read",
        choice4: "Has readed",
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