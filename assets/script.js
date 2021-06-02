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


//starts score to 0
var score = 0
//starts at the first question on index
var questionIndex=0;

//variables for elements by ID name
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn');
var questionsDiv = document.querySelector('#questions');
var wrapper = document.querySelector('#wrapper')

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

    //to move to the next question
    questionIndex++;

    //ensures that once all questions have been rendered, the game ends
    if (questionIndex >= questionArr.length) {
        finish(); 
        newDiv.textContent ="You got " + score + "/" + questionArr.length + " correct!";
    } else {
        //renders next question
        render(questionIndex); 
    }
    //appends new div to questionsdiv
    questionsDiv.appendChild(newDiv); 
    }
    
    function finish() {
        //clears values
        questionsDiv.innerHTML = "";
        timeRemaining.innerHTML = "";
    
    //dynamically creates h1 tag with an id of create H1
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Game Over!"
    
     //appends "All Done" to the page
     questionsDiv.appendChild(createH1);
    
     //creates a paragraph tag with id createP
      var createP = document.createElement("p");
      createP.setAttribute("id", "createP");
    
    //appends new paragraph tag
      questionsDiv.appendChild(createP);
    
    
    if (timeRemaining >= 0) {
        //if time left on timer, assigns value to remaining
        var remainingTime =timeRemaining; 
        //creates new paragraph element
        var createP2 =document.createElement("p");
        //clears timer counting
        clearInterval(holdInterval); 
        //renders final score to page
        createP.textContent ="Your score is: " + remainingTime; 
        //appends new paragraph tag to questionsDiv
        questionsDiv.appendChild(createP2); 
    }

    //create new element
var getInitials =document.createElement("label"); 
//gives element an id of initials
getInitials.setAttribute("id", "getInitials");
//assigns text content to getInitials 
getInitials.textContent = "Enter your initials"; 
questionsDiv.appendChild(getInitials); 

//creates an input element
var initialInput =document.createElement("input"); 
//sets input type to text
initialInput.setAttribute("type", "text"); 
//gives var an id of initials
initialInput.setAttribute("id", "initials"); 
//sets initials to be an empty string
initialInput.textContent=""; 
//appends input to div
questionsDiv.appendChild(initialInput); 

var submitBtn =document.createElement("button"); 
//sets button type to be submit
submitBtn.setAttribute("type", "submit"); 
//asigns id value of submit
submitBtn.setAttribute("id", "submit"); 
//button text
submitBtn.textContent ="Submit"; 
//appends button to div
questionsDiv.appendChild(submitBtn); 

submitBtn.addEventListener("click", function () {
//assigns initials to a variable
    var initials=initialInput.value; 

//ensures initials not blank
if (initials===null) {
    alert("No value entered"); 
} else {
    //stores score with initials in var
    var finalScore = {
        initials: initials, 
        score: remainingTime
    }
//retrieves all scores from localstorage
    var allScores =localStorage.getItem("allScores");
    
    //if empty, then the allscores val is an empty array(not null)
    if (allScores===null) {
        allScores=[]; 
    } else {
        //parses from JSON values
        allScores =JSON.parse(allScores); 
    }
    //pushes finalscore values to array
   allScores.push(finalScore);  
    //var parses scores into JSON
   var JSONScores=JSON.stringify(allScores); 
//sets stringified values into localstorage
localStorage.setItem("allScores", JSONScores); 
//moves window to highscores page
window.location.replace("./highScores.html"); 

}


});

}

