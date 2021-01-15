const computerChoice = () => {
    let choices = ["R", "P", "S"]
    return choices[Math.floor(Math.random() * choices.length)]
}

const updateScoreAndImage = (won) => {
    let humanScore = document.querySelector("#human-scores")
    let computerScore = document.querySelector("#computer-scores")
    let event;
    let humanIcon;
    let computerIcon;
    if (won.winner[0] == "human") {
        humanScore.innerText = parseInt(humanScore.innerText) + 1
        event  = "Human Won the Game"
        computerIcon = won.loser[1]
        humanIcon = won.winner[1]
    } else if (won.winner[0] == "both") {
        humanScore.innerText = parseInt(humanScore.innerText) + 1
        computerScore.innerText = parseInt(computerScore.innerText) + 1
        event  = "It's a Tie"
        computerIcon = won.winner[1]
        humanIcon = won.winner[1]
    } else if (won.winner[0] == "computer") {
        computerScore.innerText = parseInt(computerScore.innerText) + 1
        event  = "Computer Won the Game"
        computerIcon = won.winner[1]
        humanIcon = won.loser[1]
    }
    document.getElementById("event").textContent = event
    document.getElementById("computer-icon").src = computerIcon
    document.getElementById("human-icon").src = humanIcon
}

const compareChoice = (human, computer) => {
    let templates = [
        {
            i: "R",
            src: "assets/img/Rock.png",
            beat: "S",
        },
        {
            i: "P",
            src: "assets/img/Paper.png",
            beat: "R",
        },
        {
            i: "S",
            src: "assets/img/Scissors.png",
            beat: "P",
        }
    ]
    let choiceOne = templates.find(template => template.i == human)
    let choiceTwo = templates.find(template => template.i == computer)
    if(computer == choiceOne.beat) {
        updateScoreAndImage({winner: ["human", choiceOne.src], loser: ["computer", choiceTwo.src]})
    } else if (human == computer) {
        updateScoreAndImage({winner: ["both", choiceOne.src]})
    } else {
        updateScoreAndImage({winner: ["computer", choiceTwo.src], loser: ["human", choiceOne.src]})
    }
}

const gameOver = () => {
    let humanScore = document.querySelector("#human-scores").innerText
    let computerScore = document.querySelector("#computer-scores").innerText
    
    let gameOver = document.getElementById("main-container")
    gameOver.remove()
    
    let mainBody = document.querySelector("body")
    
    let mainDiv = document.createElement("div")
    mainDiv.classList.add("backdrop")
    mainBody.appendChild(mainDiv)
    
    let message = document.createElement("h1")
    message.textContent = "GAME OVER"
    message.classList.add("game-over-message")
    mainDiv.appendChild(message)
    
    let whoWon = document.createElement("h1")
    let winner;
    if(humanScore > computerScore) {
        winner = "YOU WON"
    } else if(humanScore == computerScore) {
        winner = "IT'S A TIE"
    } else {
        winner = "COMPUTER WON"
    }
    whoWon.textContent = winner
    whoWon.classList.add("won")
    mainDiv.appendChild(whoWon)

    let restartBtn = document.createElement("button")
    restartBtn.classList.add("main-btn")
    restartBtn.textContent = "Play Again!"
    mainDiv.appendChild(restartBtn)
    restartGame()
}

const restartGame = () => {
    let restartBtn = document.querySelector(".main-btn")
    restartBtn.addEventListener("click", e => {
        location.reload()
    })
}

const main = () => {
    let totalRounds = document.querySelector("#round")
    let options = document.querySelectorAll("[data-selection]")
        options.forEach(option => {
            option.addEventListener("click", e => {
                const choice = option.dataset.selection.replace("option-", "")
                totalRounds.innerText = parseInt(totalRounds.innerText) + 1
                if(totalRounds.innerText == 5) {
                    gameOver()
                } else {
                    compareChoice(choice, computerChoice())
                }
        })
    })
}

main()
