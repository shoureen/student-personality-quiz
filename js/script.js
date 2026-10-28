console.log("script.js connected!");
console.log("script.js connected!");


// Store the user's answers
const userAnswers = {};


// Select all quiz questions
const questionBlocks = document.querySelectorAll(".question-block");


// Select the result container
const resultContainer = document.getElementById("result-container");


// Select the result text
const resultText = document.getElementById("result-text");


// Add click events to every question
questionBlocks.forEach(function (questionBlock, index) {

    // Select the answer buttons inside this question
    const answerButtons = questionBlock.querySelectorAll(".answer-btn");


    // Add a click event to each answer button
    answerButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Remove selected styling from all answers
            answerButtons.forEach(function (answerButton) {

                answerButton.classList.remove("selected");

            });


            // Highlight the selected answer
            button.classList.add("selected");


            // Store the selected answer
            userAnswers[index] = button.dataset.answer;


            // Display the selected answers in the console
            console.log("User answers:", userAnswers);

        });

    });

});


// Function to display the personality result
function displayResult() {

    // Check if all questions have been answered
    if (Object.keys(userAnswers).length !== questionBlocks.length) {

        resultContainer.style.display = "block";

        resultText.textContent =
            "Please answer all 4 questions before seeing your result! 💗";

        return;

    }


    // Calculate the total score
    let totalScore = 0;


    // Loop through all the user's answers
    for (let question in userAnswers) {

        // A = 1 point, B = 2 points, C = 3 points, D = 4 points
        if (userAnswers[question] === "A") {

            totalScore += 1;

        }

        else if (userAnswers[question] === "B") {

            totalScore += 2;

        }

        else if (userAnswers[question] === "C") {

            totalScore += 3;

        }

        else if (userAnswers[question] === "D") {

            totalScore += 4;

        }

    }


    // Variables for the personality result
    let resultTitle = "";
    let resultDescription = "";


    // Determine the personality based on the total score
    if (totalScore >= 4 && totalScore <= 6) {

        resultTitle = "The Academic Achiever 📚";

        resultDescription =
            "You are organized, hardworking, and always prepared! " +
            "You take your education seriously and love being successful.";

    }

    else if (totalScore >= 7 && totalScore <= 10) {

        resultTitle = "The Creative Thinker 🎨";

        resultDescription =
            "You are imaginative, curious, and full of ideas! " +
            "You love finding creative ways to solve problems.";

    }

    else if (totalScore >= 11 && totalScore <= 13) {

        resultTitle = "The Social Butterfly 🦋";

        resultDescription =
            "You are friendly, outgoing, and love being around people! " +
            "College is all about making memories with your friends.";

    }

    else if (totalScore >= 14 && totalScore <= 16) {

        resultTitle = "The Chill Student ☕";

        resultDescription =
            "You are relaxed, easygoing, and know how to enjoy life! " +
            "You believe that a little balance and rest go a long way.";

    }


    // Display the result
    resultContainer.style.display = "block";


    resultText.innerHTML = `
        <h2>${resultTitle}</h2>

        <p>${resultDescription}</p>

        <p>
            <strong>Your total score: ${totalScore}</strong>
        </p>

        <button id="retake-quiz" class="btn btn-primary">
            Take the Quiz Again 💗
        </button>
    `;


    // Add functionality to the retake button
    document.getElementById("retake-quiz")
        .addEventListener("click", function () {

            // Clear all stored answers
            for (let question in userAnswers) {

                delete userAnswers[question];

            }


            // Remove selected styling from all answers
            questionBlocks.forEach(function (questionBlock) {

                const answerButtons =
                    questionBlock.querySelectorAll(".answer-btn");


                answerButtons.forEach(function (button) {

                    button.classList.remove("selected");

                });

            });


            // Hide the result
            resultContainer.style.display = "none";


            // Clear the result text
            resultText.textContent = "";


            // Scroll back to the top
            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

}


// Connect the Show Results button
document.getElementById("show-result")
    .addEventListener("click", displayResult);
