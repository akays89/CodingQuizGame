// global variables
var highScores = document.querySelector("#highScores");
var goBack = document.querySelector("#goBack");
var reset = document.querySelector("#reset");

 // get scores from local storage
 var allScores = localStorage.getItem("allScores");
 //parses the calue into a string
 allScores = JSON.parse(allScores);

 if (allScores !== null) {
     for (var i=0; i<allScores.length; i++) {

        var newList = document.createElement("li");
        newList.textContent = allScores[i].initials + " - " + allScores[i].score;
        highScores.appendChild(newList);

     }
 }

 //clears localstorage
 reset.addEventListener("click", function () {
     localStorage.clear();
     location.reload();
 })

 goBack.addEventListener("click", function () {
     window.location.replace("./index.html");
 })