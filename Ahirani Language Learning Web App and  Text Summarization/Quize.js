document.addEventListener('DOMContentLoaded', function () {
    const quizData = [
        {
            question: "What is the Ahirani translation for 'Hello'?",
            options: ["Namaste", "Jai Maharashtra", "Ram Ram", "Kem Cho"],
            correct: "Ram Ram",
        },
        {
            question: "How do you say 'Good Morning' in Ahirani?",
            options: ["Shubh Sakal", "Kasa Aahe", "Ram Ram Sakal", "Suprabhat"],
            correct: "Ram Ram Sakal",
        },
        {
            question: "What does 'Dada' mean in Ahirani?",
            options: ["Brother", "Uncle", "Friend", "Father"],
            correct: "Brother",
        },
        {
            question: "What does 'Come in' mean in Ahirani?",
            options: ["Ikade ye", "Aatha ye", "Idar aao", "come"],
            correct: "Aatha ye",
        },
        {
            question: "What does 'GO there' mean in Ahirani?",
            options: ["Ikade ye", "Aatha ye", "Tatha jaay", "udar jao"],
            correct: "Tatha jaay",
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let userName = "";
    const userResponses = [];

    const quizContainer = document.querySelector('.leftSection');

    function startQuiz() {
        quizContainer.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2 id="question"></h2>
                </div>
                <div class="quiz-options" id="options"></div>
                <button class="submit-btn" id="submit">Submit</button>
            </div>
        `;
        loadQuestion();
        attachSubmitListener();
    }

    function loadInitialScreen() {
        quizContainer.innerHTML = `
            <div id="name-input-container">
                <h2>Enter your name to start the quiz:</h2>
                <input type="text" id="name-input" placeholder="Your Name" />
                <button id="start-quiz-btn">Start Quiz</button>
            </div>
        `;

        document.getElementById('start-quiz-btn').addEventListener('click', function () {
            const nameInput = document.getElementById('name-input').value.trim();
            if (!nameInput) {
                alert("Please enter your name!");
                return;
            }
            userName = nameInput;
            startQuiz();
        });
    }

    function loadQuestion() {
        const currentQuestion = quizData[currentQuestionIndex];
        const questionEl = document.getElementById('question');
        const optionsEl = document.getElementById('options');

        questionEl.innerText = currentQuestion.question;

        optionsEl.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const optionHTML = `
                <label>
                    <input type="radio" name="option" value="${option}" />
                    ${option}
                </label>
            `;
            optionsEl.innerHTML += optionHTML;
        });
    }

    function getSelectedOption() {
        const options = document.querySelectorAll('input[name="option"]');
        let selected = null;
        options.forEach(option => {
            if (option.checked) {
                selected = option.value;
            }
        });
        return selected;
    }

    function attachSubmitListener() {
        const submitBtn = document.getElementById('submit');
        submitBtn.addEventListener('click', function () {
            const selectedOption = getSelectedOption();

            if (!selectedOption) {
                alert("Please select an option!");
                return;
            }

            userResponses.push({
                question: quizData[currentQuestionIndex].question,
                selected: selectedOption,
                correct: quizData[currentQuestionIndex].correct,
            });

            if (selectedOption === quizData[currentQuestionIndex].correct) {
                score++;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                showReview();
            }
        });
    }

    function showReview() {
        quizContainer.innerHTML = `
            <div class="quiz-container">
                <div class="quiz-header">
                    <h2>Thank you, ${userName}!</h2>
                    <h3>Your Score: ${score}/${quizData.length}</h3>
                </div>
                <div id="review-section"></div>
                <button class="submit-btn" onclick="location.reload()">Restart</button>
            </div>
        `;

        const reviewSection = document.getElementById('review-section');
        userResponses.forEach((response, index) => {
            const reviewHTML = `
                <p><strong>Q${index + 1}: ${response.question}</strong></p>
                <p>Your Answer: ${response.selected}</p>
                <p>Correct Answer: ${response.correct}</p>
                <hr />
            `;
            reviewSection.innerHTML += reviewHTML;
        });
    }

    loadInitialScreen();
});
