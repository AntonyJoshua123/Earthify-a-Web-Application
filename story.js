function checkAnswers() {
    // Get the answers from the form
    const q1Answer = document.getElementById("q1").value.trim().toLowerCase();
    const q2Answer = document.getElementById("q2").value.trim().toLowerCase();
    
    let resultMessage = "Here are your results: <br>";
    
    // Check the answers
    if (q1Answer === "pollution" || q1Answer === "plastic" || q1Answer === "deforestation") {
        resultMessage += "Q1: Correct! Pollution, plastic waste, and deforestation are major causes of pollution.<br>";
    } else {
        resultMessage += "Q1: Incorrect! The main causes of pollution include plastic waste, air pollution, and deforestation.<br>";
    }
    
        if (q2Answer === "reduce waste" || q2Answer === "recycle" ||)
        }
        