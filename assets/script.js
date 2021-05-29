//starts score to 0
var score = 0
//starts at the first question on index
var questionIndex=0;

//variables for elements by ID name
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn');
var questionsDiv = document.querySelector('#questions');

//start time
var timeRemaining = 60;
var holdInterval = 0;
//pentalty time for getting wrong answer
var penaltyTime = 5

var createUL = document.createElement("ul")

//start countdown time
startBtn.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeRemaining--;
            timer.textContent = "Time Remaining : " + timeRemaining; 
            if (timeRemaining === 0) {
                clearInterval(holdInterval); 
                finish(); 
                timer.textContent = "Time's Up!" 
            }
        }, 1000);
    }
    //renders next question based on index
    render(questionIndex);
});

//add questions to the page
function render(questionIndex) {
    //to clear values
    questionsDiv.innerHTML ="";
    createUL.innerHTML ="";

    //for loop to go through the question array
    for(var i =0; i <questionArr.length; i++) {
        //creates an element for the question to each index to be used
        var userQuestion =questionArr[questionIndex].title;
        //creates an element for the choices the user can choose to be used
        var userChoices = questionArr[questionIndex].choices;
        // renders the question at the questionsDiv
        questionsDiv.textContent=userQuestion;
    }

    // loop to create a list item for each possible answer
    userChoices.forEach(function(newItem) {
        var listItem = document.createElement('li');
        listItem.textContent = newItem;
        //tracks possible answer to the ?s
        questionsDiv.appendChild(listItem);
        //checks user response against answer
        listItem.addEventListener('click', (checkAnswer));

    })



}

function checkAnswer(event) {
    var response =event.target;

    if(response.matches('li')) {
        //create a new div to determine if answer is right/wrong
        var newDiv = document.createElement('div');
        // set the id of newDiv to  newDiv
        newDiv.setAttribute('id', 'newDiv');
        //checks response against answer
        if (response.textContent == questionArr[questionIndex].answer) {
            score++;
            newDiv.textContent = 'Correct!';

        } else {
            timeRemaining= timeRemaining - penaltyTime;
            newDiv.textContent = "Wrong! The Correct answer is: " + questionArr[questionIndex].answer;
        }

    }
}














// array of questions
var questionArr = [
    {
        title:"What will print to the console from this statement?: console.log('Hi!'.length)",
        choices: ["Hi!", "3", "1", "Hi!.length"],
        answer: "3"
    },

   
    {
        title: " HTML stands for ___ ___ ___ ",
        choices: ["HyperText Markdown Language", "HyperTransfer Markup Language","HyperText Markup Language", "HyperTransfer Markdown Language" ],
        answer: "HyperText Markup Language"
    }, 
    {
        title: "Which symbol is required to target an id element in CSS?",
        choices: ["#", "*", ".", "/"], 
        answer: "#"
    }, 
    {
        title: "Which of the following is not a coding language?", 
        choices: ["Javascript", "goat yoga", "Jquery", "HTML/CSS"],
        answer: "goat yoga"
    }, 
    {
        title: "Strings are enclosed in ___",
        choices: ["parenthesis", "curly brackets", "a circle", "quotation marks"],
        answer: "quotation marks"
    }
] 