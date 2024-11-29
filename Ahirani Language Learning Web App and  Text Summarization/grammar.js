// Correct answers for the Grammar Test
let answers = {
    1: "tatha jaay",
    2: "aatha ye",
    3: "khaay",
    4: "tuna naav kaay she",
    5: "tu kaay kari rahinas"
};

let userResponses = {};

function startTest() {
    const username = document.getElementById("username").value.trim();
    if (username === "") {
        alert("Please enter your name to start the test.");
        return;
    }
    document.getElementById("name-input").style.display = "none";
    document.getElementById("questions-section").style.display = "block";
    document.getElementById("start-test").style.display = "none";
}

function submitAnswers() {
    const username = document.getElementById("username").value;
    let score = 0;

    for (let i = 1; i <= 5; i++) {
        const userAnswer = document.getElementById(`answer-${i}`).value.trim();
        userResponses[i] = userAnswer;

        if (userAnswer.toLowerCase() === answers[i].toLowerCase()) {
            score++;
        }
    }

    let resultHTML = `<h2>Test Review for ${username}</h2>`;
    resultHTML += `<h3>Your Score: ${score}/5</h3>`;
    Object.keys(answers).forEach((qNum) => {
        const userAnswer = userResponses[qNum] || "No Answer";
        const correctAnswer = answers[qNum];
        resultHTML += `
            <p>Question ${qNum}: Your Answer: ${userAnswer} | Correct Answer: ${correctAnswer}</p>
        `;
    });

    const container = document.querySelector(".container");
    container.innerHTML = resultHTML;
}
