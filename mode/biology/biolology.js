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
        question: "Ruang lingkup biologi yang dalam pengkajiannya memerlukan alat bantu mikroskop, misalnya?",
        choice1: "Organ dan sistem organ",
        choice2: "Bioma dan biosfer",
        choice3: "Organel, sel dan jaringan",
        choice4: "Atom dan molekul",
        answer: 4,
    },
    {
        question: "Kejadian berikut yang bukan merupakan objek kajian biologi adalah?",
        choice1: "Pembuatan tempe dengan memanfaatkan bioteknologi konvensional",
        choice2: "Kandungan mineral sulfur pada batuan sekitar gunung berapi",
        choice3: "Bangkai tikus yang membusuk setelah dibiarkan beberapa hari",
        choice4: "Pengamatan air kolam dengan mikroskop dan menemukan benda bergerak",
        answer: 2,
    },
    {
        question: "Objek dan kajian biologi yang diperlukan untuk mengembangkan obat penyakit flu burung (SARS) adalah?",
        choice1: "Bakteri",
        choice2: "Sanitasi",
        choice3: "Virus",
        choice4: "Epidemiologi",
        answer: 3,
    },
    {
        question: "Sebelum melakukan penelitian ilmiah, peneliti harus mempersiapkan hal-hal berikut, kecuali?",
        choice1: "Alat dan bahan",
        choice2: "Metode penelitian",
        choice3: "Objek penelitian",
        choice4: "Latar belakang",
        answer: 4,
    },
    {
        question: "Di suatu tempat terdapat kumpulan kelompok belalang,kelompok semut dan kelompok rumput. Kumpulan kelompok tersebut akan membentuk?",
        choice1: "Ekosistem",
        choice2: "Komunitas",
        choice3: "Bioma",
        choice4: "Lingkungan",
        answer: 2,
    },
    {
        question: "Skifistoma merupakan bagian dari siklus hidup Aurelia, di mana skifistoma ...",
        choice1: "Merupakan pertumbuhan lebih lanjut dari larva",
        choice2: "Dapat menghasilkan sperma",
        choice3: "Berupa larva yang berenang",
        choice4: "Mempunyai alat berupa tantakel",
        answer: 1,
    },
    {
        question: "Berdasarkan ciri morfologinya, anggota spermatophyta termasuk?",
        choice1: "Gymnospermae",
        choice2: "Angiospermae",
        choice3: "Anthophyta",
        choice4: "Monocotyledonae",
        answer: 3,
    },
    {
        question: "Cacing yang parasit pada hati manusia adalah?",
        choice1: "Oxyuris vemicularis",
        choice2: "Taenia saginata",
        choice3: "Filaria Bancrofti",
        choice4: "Fasciola Hrpatica",
        answer: 4,
    },
    {
        question: "Kulit pada katak hiujau (Rana pipiens) mudah dilepas dari tubuhnya, karena?",
        choice1: "Adanya cairan limfe di bawah kulit",
        choice2: "Kulitnya tebal",
        choice3: "Antara otot dan kulit terpisah",
        choice4: "Sel-sel kulitnya mati",
        answer: 3,
    },
    {
        question: "Diantara fenomena berikut yang menunjukkan adanya variasi pada makhluk hidup adalah?",
        choice1: "Padi berakar serabut dan kacang berakar tunggang",
        choice2: "Buah polong pada kacang ada yang berbiji dua dan ada yang berbiji tiga",
        choice3: "Kaktus dan cocor bebek berdaun tebal",
        choice4: "Akar tanaman jagung tanaman jagung menuju bawah",
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