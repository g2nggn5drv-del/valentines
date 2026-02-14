// script.js 

// Greeting Stage
function greetingStage() {
    const greetingMessage = document.createElement('div');
    greetingMessage.innerText = "Happy Valentine's Day! Are you ready for a fun date?";
    document.body.appendChild(greetingMessage);

    setTimeout(() => {
        document.body.removeChild(greetingMessage);
        originalQuestionStage();
    }, 3000); // show greeting for 3 seconds
}

// Original Valentine's Question Stage
function originalQuestionStage() {
    const questionDiv = document.createElement('div');
    questionDiv.innerText = "Will you be my Valentine?";
    
    const noButton = document.createElement('button');
    noButton.innerText = "No!";
    noButton.style.position = 'absolute';
    moveButton(noButton, questionDiv);
    
    questionDiv.appendChild(noButton);
    document.body.appendChild(questionDiv);
}

// Function to move button across page
function moveButton(button, questionDiv) {
    let direction = 1; // 1 for right, -1 for left
    const moveInterval = setInterval(() => {
        if (button.offsetLeft > window.innerWidth - button.offsetWidth || button.offsetLeft < 0) {
            direction *= -1; // change direction
        }
        button.style.left = (button.offsetLeft + 5 * direction) + 'px';
    }, 50);
    
    button.onclick = () => {
        clearInterval(moveInterval);
        document.body.removeChild(questionDiv);
        transitionStage();
    };
}

// Transition Stage
function transitionStage() {
    const transitionMessage = document.createElement('div');
    transitionMessage.innerText = "Great! Let's see how well you know me!";
    document.body.appendChild(transitionMessage);

    setTimeout(() => {
        document.body.removeChild(transitionMessage);
        virtualDateQuestionStage();
    }, 3000); // show transition for 3 seconds
}

// Virtual Date Question Stage
function virtualDateQuestionStage() {
    const dateQuestion = document.createElement('div');
    dateQuestion.innerText = "What would be your ideal date?";

    const options = ["Dinner", "Movie", "Walk in the park", "Home Cooked Meal"];
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => {
            alert(`You selected: ${option}`);
            document.body.removeChild(dateQuestion);
        };
        dateQuestion.appendChild(button);
    });

    document.body.appendChild(dateQuestion);
}

// Start the interactive experience
greetingStage();