let currentQuestionIndex = 0;
let questions = [];
let correctAnswers = 0; // Variable to track the number of correct answers
let totalQuestions = 0; // This will be set dynamically based on the API response

// Function to fetch questions from the API
async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:8080/api/questions'); // API URL
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        questions = await response.json(); // Assume API returns an array of question objects

        // Limit to the first 5 questions
        questions = questions.slice(10, 20); // Take only the first 5 questions
        totalQuestions = questions.length; // Set totalQuestions based on fetched data
        document.getElementById('total-questions').textContent = totalQuestions; // Update the total questions in the HTML
        displayQuestion(); // Display the first question
    } catch (error) {
        console.error('Error fetching questions:', error);
        document.getElementById('question-text').textContent = "Failed to load questions. Please try again.";
    }
}

let time = 5 * 60;

        const countdown = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;

            const formattedTime = `${minutes}:${seconds < 5 ? '0' : ''}${seconds}`;
            document.getElementById("timer").textContent = formattedTime;

            if (time <= 0) {
                clearInterval(countdown);
                alert("Time's up!");
                window.location.href = 'py-result.html';
            }
            time--;
        }, 1000);

function displayQuestion() {
    if (questions.length === 0) return; // Check if there are questions available

    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.style.color = "green"; // Set the options container color
    const currentQuestion = questions[currentQuestionIndex]; // Get the current question using the index

    // Update the question text
    questionText.textContent = currentQuestion.questionText;
    optionsContainer.innerHTML = ''; // Clear previous options

    // Create buttons for each option
    for (let i = 0; i < currentQuestion.options.length; i++) {
        const option = currentQuestion.options[i];
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option); // Call checkAnswer on click
        optionsContainer.appendChild(button);
    }

    document.getElementById('current-question').textContent = currentQuestionIndex + 1; // Update the current question number
}

// Function to check the selected answer
function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex]; // Get the current question
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.getElementsByClassName('option');

    // Disable all buttons after an answer is selected
    for (let button of buttons) {
        button.disabled = true;
        if (button.textContent === currentQuestion.correctAnswer) {
            // Make the correct answer green
            button.style.backgroundColor = 'green';
            button.style.color = 'white';
        } else if (button.textContent === selectedOption) {
            // Make the selected wrong answer red
            button.style.backgroundColor = 'red';
            button.style.color = 'white';
        }
    }

    // Check if the selected answer is correct
    if (selectedOption === currentQuestion.correctAnswer) {
        correctAnswers++; // Increment score if the answer is correct
    }

}

// Function to go to the next question or finish the quiz
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++; // Increment the question index
        displayQuestion(); // Display the next question
    } else {
        // Quiz Completed: Save score and redirect to results page
        localStorage.setItem('quizScore', correctAnswers); // Save the score
        localStorage.setItem('totalQuestions', totalQuestions); // Save total questions
        window.location.href = 'py-result.html'; // Redirect to results page
    }
}

// Initialize the quiz by fetching questions
window.onload = fetchQuestions;
