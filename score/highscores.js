const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
highScoresList.innerHTML =
    highScores.map(score => {
        return `<ul class="high-score">${score.name} - ${score.score}</ul>`
    }).join('')