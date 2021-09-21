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
        question: "Keindahan terlihat dari objek yang dilihat adalah pandangan dari teori?",
        choice1: "Fanatik",
        choice2: "Subjektif",
        choice3: "Otentik",
        choice4: "Objektif",
        answer: 4,
    },
    {
        question: "Berdasarkan teori subjektif, keindahan dapat terlihat berdasarkan?",
        choice1: "Benda yang dilihat",
        choice2: "Diri yang melihat benda tersebut",
        choice3: "Teknik pembuatan benda tersebut",
        choice4: "Tingkat kerumitan dari benda tersebut",
        answer: 2,
    },
    {
        question: "Berikut ini yang tidak termasuk ke dalam bentuk-bentuk komposisi, yaitu ...",
        choice1: "Bentuk sentral",
        choice2: "Bentuk diagonal ekspresi",
        choice3: "Bentuk ortogonal",
        choice4: "Bentuk geometris",
        answer: 3,
    },
    {
        question: "Gagasan atau ide yang baru atau belum pernah ada sebelumnya disebut?",
        choice1: "Proporsi",
        choice2: "Ekspresi",
        choice3: "Kreativitas",
        choice4: "Kontras",
        answer: 3,
    },
    {
        question: "Seni rupa tradisional dilandasi pengaruh kuat dari?",
        choice1: "Tingkat pendidikan pembuatnya",
        choice2: "Adat dan budaya masyarakat setempat",
        choice3: "Tingkat ekonomi masyarakat setempat",
        choice4: "Aturan atau norma masyarakat setempat",
        answer: 2,
    },
    {
        question: "Berikut ni merupakan pembagian seni rupa pada zaman batu, kecuali ...",
        choice1: "Zaman paleolithikum",
        choice2: "Zaman meslithikum",
        choice3: "Zaman perundagian",
        choice4: "Zaman neolithikum",
        answer: 3,
    },
    {
        question: "Menhir adalah benda hasil seni rupa yang terbuat dari batu berfungsi sebagai?",
        choice1: "Tempat menyimpan makanan",
        choice2: "Tempat pemujaan",
        choice3: "Tempat memancangkan persembahan korban",
        choice4: "B dan C benar",
        answer: 3,
    },
    {
        question: "Berikut ini yang bukan termasuk tokoh seniman pada masa Indonesia Jelita adalah?",
        choice1: "Suharyo",
        choice2: "Soedjojono",
        choice3: "S. Tutur",
        choice4: "Abdullah Surio Subroto",
        answer: 3,
    },
    {
        question: "Periode Persagi menghendaki terwujudnya corak baru seni lukis Indonesia yang mempunyai?",
        choice1: "Nilai seni yang tinggi",
        choice2: "Identitas, ciri khas, dan kepribadian bangsa Indonesia",
        choice3: "Filosofis hidup yang mendalam",
        choice4: "ciri perubahan ke arah seni kontemporer",
        answer: 2,
    },
    {
        question: "Unsur fisik seni rupa yang merupakan gabungan titik-titik yang bersambung, yaitu?",
        choice1: "Warna",
        choice2: "Garis",
        choice3: "Volume",
        choice4: "Tekstur",
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