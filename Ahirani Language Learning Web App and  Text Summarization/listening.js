let answers = {
    1: "ti",
    2: "chaalna",
    3: "tumna nav kay she?",
    4: "tya mandirma gayat",
    5: "to safarchand khai rahina"
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
        const userAnswer = document.getElementById(`answer-${i}`).value.trim().toLowerCase();
        userResponses[i] = userAnswer;

        if (userAnswer === answers[i]) {
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
