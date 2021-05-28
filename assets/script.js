//variables for elements by ID name
var timer = document.querySelector('#timer');
var startBtn = document.querySelector('#startBtn');

//start time
var timeRemaining = 60;
var holdInterval = 0;
//pentalty time for getting wrong answer
var penaltyTime = 5

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
});