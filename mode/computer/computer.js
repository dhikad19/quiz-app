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
        question: "Mengapa kita perlu melakukan upgrade komputer?",
        choice1: "Agar selalu update program ",
        choice2: "Agar komputer dapat menjalankan aplikasi-aplikasi terbaru",
        choice3: "Agar komputer kita terlihat keren",
        choice4: "Agar proses kinerja komputer menjadi lebih baik untuk menjalankan beberapa program",
        answer: 4,
    },
    {
        question: "Distro Ubuntu berasal dari sistem operasi?",
        choice1: "Linux",
        choice2: "Microsoft",
        choice3: "Windows",
        choice4: "MacOS",
        answer: 1,
    },
    {
        question: "Dibawah ini yang termasuk dalam fungsi protokol adalah?",
        choice1: "Connection control",
        choice2: "Input/Output Control",
        choice3: "Input dan Circuit Switching",
        choice4: "Encaptulation",
        answer: 2,
    },
    {
        question: "Jelaskan fungsi dari Site Manager?",
        choice1: "Mengizinkan pengguna untuk membuat daftar situs FTP beserta data koneksinya",
        choice2: "Mengelola file yang di sharing pada FTP dan mengeditnya",
        choice3: "Menampilkan status real-time setiap antrian atau transfer file yang aktif",
        choice4: "Menampilkan Output Console yang menunjukkan perintah yang dikirim oleh FileZilla dan respon yang diterima dari Server",
        answer: 1,
    },
    {
        question: "Siapakah yang pertama kali menciptakan sistem operasi Linux?",
        choice1: "Andrew Tanen-Baum",
        choice2: "Bill Gates",
        choice3: "Linus Torvalds",
        choice4: "Tim Berners Lee",
        answer: 3,
    },
    {
        question: "Dua hal yang penting dalam FTP adalah?",
        choice1: "FTP server dan FTP Client",
        choice2: "FTP srver dan DNS client",
        choice3: "FTP server dan DHCP Client",
        choice4: "DHCP server dan IP Address",
        answer: 1,
    },
    {
        question: "Alamat IP 200.100.50.25/28 mempunyai netmask?",
        choice1: "255.255.255.192",
        choice2: "255.255.255.0",
        choice3: "255.255.255.240",
        choice4: "255.255.255.225",
        answer: 3,
    },
    {
        question: "Perintah dasar linux yang digunakan untuk menghapus direktori adalah?",
        choice1: "rm",
        choice2: "cp",
        choice3: "copy",
        choice4: "rmdel",
        answer: 1,
    },
    {
        question: "Sistem operasi Linux mempunyai dua jenis ...",
        choice1: "Mode Grafik dan juga Mode Text",
        choice2: "Mode Text saja",
        choice3: "Mode Grafik Saja",
        choice4: "Unix dan Mode Text",
        answer: 1,
    },
    {
        question: "Memori yang berfungsi untuk tempat penyimpanan data sementara disebut?",
        choice1: "RAM",
        choice2: "VGA",
        choice3: "ROM",
        choice4: "Processor",
        answer: 1,
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