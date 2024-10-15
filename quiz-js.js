function startJsQuiz(quizType) {
    quizType= quizType ="JavaScript"
    alert(`Starting ${quizType.charAt(0).toUpperCase() + quizType.slice(1)} Quiz!`);
    
    // Redirecting to the corresponding quiz page based on the selected type
    window.location.href = `./JavaScriptQuiz/${quizType}-js-quiz.html`; // Assumes pages are named quiz-java.html, quiz-python.html, etc.
    
}