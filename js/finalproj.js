function hamburgerMenu(){
    console.log("Hamburger Menu Clicked");
    const x = document.querySelector("#navLinks");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    console.log("Hamburger Menu Clicked");
};

let musicalsData;
let currentScore = 0;
let currentRound = 1;
let guessesRemaining = 3;
let title;
let year;
let summary;
let roundIndex;
let finalScore
let finalScorePage;
console.log(localStorage)


fetch('./musicals.json')
  .then(response => response.json())
  .then(musicals => {
    musicalsData = musicals;
    console.log(musicalsData);
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
    console.log("Error loading data");
    });

function stripTitle(title){
     // used https://stackoverflow.com/questions/4328500/how-can-i-strip-all-punctuation-from-a-string-in-javascript-using-regex for code to strip input
    console.log("Stripping title");
    let titleOne = title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    console.log("Part one complete");
    let titleTwo = titleOne.replace(/\s{2,}/g," ");
    console.log("Part two complete");
    let strippedTitle = titleTwo.toLowerCase();
    console.log("Title stripped");
    return strippedTitle;
};

function generateNumbers(){
    console.log("Starting random number generation");
    let randomNumbers = [];
    while (randomNumbers.length < 10) {
        newNumber = Math.floor(Math.random() * musicalsData.length);
        if (randomNumbers.includes(newNumber) === false) {
            randomNumbers.push(newNumber);
        } else {
            continue;
        }};
    console.log(randomNumbers)
    return randomNumbers
};

function newRound(){
    console.log("New round started");
    roundIndex = randomMusicals[currentRound - 1]
    title = musicalsData[roundIndex]["Title"];
    console.log("Title retrieved");
    year = musicalsData[roundIndex]["Year"];
    summary = musicalsData[roundIndex]["Summary"];
    document.getElementById("yearOfNom").innerHTML = year;
    document.getElementById("musicalSummary").innerHTML = summary;
    guessesRemaining = 3;
    document.getElementById("round").innerHTML = currentRound;
    document.getElementById("remainingGuesses").innerHTML = guessesRemaining;
    document.getElementById("currentScore").innerHTML = currentScore;
};

document.querySelector("#startGame").addEventListener("click", function(){
    console.log("Game initiated");
    document.querySelector("#startGame").style.display = "none";
    document.querySelector("#gamePlay").style.display = "block";
    randomMusicals = generateNumbers();
    console.log(randomMusicals);
    document.getElementById("round").innerHTML = currentRound;
    document.getElementById("remainingGuesses").innerHTML = guessesRemaining;
    document.getElementById("currentScore").innerHTML = currentScore;
    console.log("Game started");
    newRound();
});

document.querySelector("#guessButton").addEventListener("click", function() {
    console.log("Checking answer");
    if (guessesRemaining === 3) {
        console.log("3 guesses remaining");
        if (stripTitle(title) === stripTitle(document.getElementById("guess").value)){
            currentScore += 3;
            document.getElementById("correct").innerHTML = "That's correct! The musical is " + title + "!";
            document.getElementById("correct").style.backgroundColor = "#4CBB17";
            document.getElementById("guessForm").reset();
            if (currentRound != 10) {
                document.querySelector("#nextRound").style.display = "block";
            } else {
                document.querySelector("#getFinalScore").style.display = "block"
            }
        } else {
            document.getElementById("correct").innerHTML = "Not quite...try again!";
            guessesRemaining -= 1;
            document.getElementById("remainingGuesses").innerHTML = guessesRemaining;
            document.getElementById("guessForm").reset();
        }
    } else if (guessesRemaining === 2) {
        if (stripTitle(title) === stripTitle(document.getElementById("guess").value)){
            currentScore += 2;
            document.getElementById("correct").innerHTML = "That's correct! The musical is " + title + "!";
            document.getElementById("correct").style.backgroundColor = "#4CBB17";
            document.getElementById("guessForm").reset();
            if (currentRound != 10) {
                document.querySelector("#nextRound").style.display = "block";
            } else {
                document.querySelector("#getFinalScore").style.display = "block"
            }
        } else {
            document.getElementById("correct").innerHTML = "Not quite...try one more time!";
            guessesRemaining -=1;
            document.getElementById("remainingGuesses").innerHTML = guessesRemaining;
            document.getElementById("guessForm").reset();
        }
    } else {
        if (stripTitle(title) === stripTitle(document.getElementById("guess").value)){
            currentScore += 1;
            document.getElementById("correct").innerHTML = "That's correct! The musical is " + title + "!";
            document.getElementById("correct").style.backgroundColor = "#4CBB17";
            document.getElementById("guessForm").reset();
            if (currentRound != 10) {
                document.querySelector("#nextRound").style.display = "block";
            } else {
                document.querySelector("#getFinalScore").style.display = "block"
            }
        } else {
            guessesRemaining -=1;
            document.getElementById("remainingGuesses").innerHTML = guessesRemaining;
            document.getElementById("correct").innerHTML = "Sorry, you didn't guess this one correctly. The musical was " + title + ".";
            document.getElementById("guessForm").reset();
            if (currentRound != 10) {
                document.querySelector("#nextRound").style.display = "block";
            } else {
                document.querySelector("#getFinalScore").style.display = "block"
            }
        }
    }
});

document.querySelector("#nextRound").addEventListener("click", function() {
    document.querySelector("#nextRound").style.display = "none";
    document.getElementById("correct").innerHTML = "";
    document.getElementById("correct").style.backgroundColor = "#F4F4F4"
    currentRound += 1;
    if (currentRound <= 10) {
        newRound();
}});

document.querySelector("#getFinalScore").addEventListener("click", function(){
    console.log(currentScore)
    finalScore = JSON.stringify(currentScore);
    console.log(finalScore);
    localStorage.setItem("totalScore", finalScore);
    console.log(localStorage.getItem("totalScore"))
    console.log(localStorage)
    console.log("Final score saved");
    goToFinalPage();
})

function goToFinalPage(){
    location.href = "finalscore.html";
    finalScorePage = JSON.parse(localStorage.getItem("totalScore"));
    console.log(finalScorePage);
    document.querySelector("#finalScore").innerHTML = finalScorePage;
    if (finalScorePage === 30) {
        document.querySelector("#finalMessage").innerHTML = "Wow, you got a perfect score! You're a Broadway expert!";
    } else if (23 <= finalScorePage < 30) {
        document.querySelector("#finalMessage").innerHTML = "Nice work! You're clearly a Broadway fan!";
    } else if (16 <= finalScorePage < 23) {
        document.querySelector("#finalMessage").innerHTML = "Not bad! You may want to brush up on your Broadway knowledge, but you're in a good spot!";
    } else if (9 <= finalScorePage < 16) {
        document.querySelector("#finalMessage").innerHTML = "You have some studying to do...";
    } else {
        document.querySelector("#finalMessage").innerHTML = "Do you even like Broadway? Why are you playing this game?";
    }
    localStorage.clear();
};
