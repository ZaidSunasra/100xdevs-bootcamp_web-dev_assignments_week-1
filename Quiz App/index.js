import quizData from "./data.js";

const questionDiv = document.getElementById("question");
const timeLeft = document.getElementById("remaining-time")
let totalQuizLength = quizData.length;
let score = 0;
let time = 30;
let timeInterval;

initializeQuiz()

function initializeQuiz() {
    const currentQtn = genrateQuestion()
    printQuestion(currentQtn)
}

function genrateQuestion() {
    const index = Math.floor(Math.random() * quizData.length);
    const question = quizData[index];
    quizData.splice(index, 1);
    return question
}

function printQuestion(currentQtn) {

    if (timeInterval) {
        clearInterval(timeInterval);
    }

    questionDiv.innerHTML = ''

    const scoreDiv = document.createElement("div")
    scoreDiv.className = "flex justify-between lg:w-3/4"
    const scoreText = document.createElement("div");
    const timeText = document.createElement("div");
    scoreText.textContent = `Score : ${score.toFixed(2)}`;
    timeText.textContent = `Time: 30`;
    scoreDiv.appendChild(scoreText);
    scoreDiv.appendChild(timeText);

    timeLeft.style.transition = "width 1s linear";
    timeLeft.className = "h-4 bg-blue-400 absolute top-0 w-full"

    timeInterval = setInterval(() => {
        time--;
        timeLeft.style.width = `${((time - 1) / 30) * 100}%`;
        timeText.textContent = `Time: ${time}`;

        if (time <= 0) {
            clearInterval(timeInterval)
            questionDiv.innerHTML = ''
            questionDiv.className = "text-2xl font-semibold mx-auto text-red-600 text-center"
            questionDiv.innerHTML = "⏰ Time's Up! Game Over! <br>Refresh to play again"
        }
    }, 1000)
    
    questionDiv.appendChild(scoreDiv)

    const question = document.createElement("h3")
    question.className = "font-semibold text-2xl text-start"
    question.textContent = currentQtn.question
    questionDiv.appendChild(question);

    const optionDiv = document.createElement("div")
    optionDiv.className = "flex flex-col gap-2"
    for (let i = 97; i <= 100; i++) {
        const letter = String.fromCharCode(i);
        const optionRow = document.createElement("div");
        optionRow.innerHTML = `
            <input type="radio" name="question" id="${letter}" value="${letter}">
            <label for="${letter}"></label>
        `
        optionRow.querySelector("label").textContent = `${currentQtn[letter]}`;
        optionRow.className = "flex gap-4"
        optionDiv.appendChild(optionRow)
    }

    questionDiv.appendChild(optionDiv)

    const submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit"
    submitButton.className = "px-4 py-2 rounded shadow-md bg-blue-400 text-white w-2/5 mx-auto"
    questionDiv.appendChild(submitButton)
    submitButton.addEventListener('click', function () {
        checkAnswer(currentQtn)
    })

}

function checkAnswer(question) {
    const selected = document.querySelector('input[name="question"]:checked');
    if (selected == null) {
        alert("Please select an option")
    }
    if (selected.value == question.correct) {
        clearInterval(timeInterval)
        score += time / 30 * 1;
        time = 30;
        totalQuizLength--;
        if (totalQuizLength == 0) {
            questionDiv.innerHTML = ''
            questionDiv.className = "text-2xl font-semibold mx-auto"
            questionDiv.innerHTML = "🎉Congratulations 🎉! You have answered all the questions in the quiz."
            return;
        }
        initializeQuiz()
    }
    if (selected.value != question.correct) {
        clearInterval(timeInterval)
        questionDiv.className = "text-2xl font-semibold mx-auto text-red-600 text-center"
        questionDiv.innerHTML = "❌ Oops! Wrong Answer! The correct answer is: <strong>" + question[question.correct] + "</strong>.<br>Refresh to play again"
    }
}