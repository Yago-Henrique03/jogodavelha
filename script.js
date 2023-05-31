const campos = document.querySelectorAll("[data-position]")
const escolha = document.querySelectorAll("[data-escolha]")
const players = []
const movesFromPlayers = [[], []]
let countP1 = 0
let countP2 = 0 
const playerChance = document.querySelector("#player-chance")
const restartGame = document.querySelector("#restartGame")
const changePlayer = document.querySelector("#change-player")
const gameStart = document.querySelector("#game-start")
let finishGame = false

iniciarJogo();


restartGame.addEventListener("click", iniciarJogo);

function iniciarJogo(){
    finishGame = false
    movesFromPlayers.splice(0);
    players.splice(0);
    movesFromPlayers.push([])
    movesFromPlayers.push([])

    campos.forEach((el) => {
        el.textContent = "";
        el.classList.remove("winnerShow");
    });

    restartGame.classList.add("displayOff");
    changePlayer.classList.remove("displayOff");
    gameStart.classList.add("displayOff");
    gameStart.textContent = 'O JOGO COMEÇOU !';
    playerChance.textContent = "Vez do player 1";

    escolha.forEach((el) => {
        el.addEventListener("click", (ev) => {
            let option = ev.target.dataset.escolha
            if(option === "X"){
                players.push("X")
                players.push("O")
            }else{
                players.push("O")
                players.push("X")
            }
            ev.target.parentNode.parentNode.classList.add("displayOff")
            ev.target.parentNode.parentNode.parentNode.querySelector("#game-start").classList.remove("displayOff")
            ev.target.parentNode.parentNode.parentNode.querySelector("#player-chance").classList.remove("displayOff")
        } )
    })
    
    campos.forEach((el) => {
        el.addEventListener("click", (ev) => {
            if(!finishGame){
                if(!verificaWinner(movesFromPlayers)){
                    if(players.length === 0){
                        return alert("Selecione o player 1")
                    }
                    if(el.textContent === ""){
                        if((movesFromPlayers[0].length + movesFromPlayers[1].length) % 2 === 0){
                            el.textContent = players[0]
                            movesFromPlayers[0].push(parseInt(el.dataset.position))
                            playerChance.textContent = "Vez do player 2"
                        } else {
                            el.textContent = players[1]
                            movesFromPlayers[1].push(parseInt(el.dataset.position))
                            playerChance.textContent = "Vez do player 1"
                        }
                    }
                }
    
                if(verificaWinner(movesFromPlayers)){
                    let winner = verificaWinner(movesFromPlayers)
                    let gameStats = document.querySelector("#game-start")
                    if(typeof winner === "object"){
                        gameStats.textContent =`${winner.vencedor}`
                        let casas = winner.casas
                        casas.forEach((el) => {
                            let casaWin1 = document.querySelector(`[data-position="${el}"]`)
                            casaWin1.classList.add("winnerShow")
                        })
                        playerChance.classList.add("displayOff")
                        restartGame.classList.remove("displayOff")
                        placar.classList.remove("placarOff")
                        countView(winner.vencedor)
                    }else {
                        gameStats.textContent = `${winner}`
                        playerChance.classList.add("displayOff")
                        restartGame.classList.remove("displayOff")
                    }
                }
            }
        })
    })
}

function verificaWinner(arr){
    
    let winner = ""
    const winConditions = [
        [1, 2, 3], // Linha superior
        [4, 5, 6], // Linha do meio
        [7, 8, 9], // Linha inferior
        [1, 4, 7], // Coluna esquerda
        [2, 5, 8], // Coluna do meio
        [3, 6, 9], // Coluna direita
        [1, 5, 9], // Diagonal esquerda para direita
        [3, 5, 7], // Diagonal direita para esquerda
    ];
    
    let p1 = arr[0];
    let p2 = arr[1];
    
    for(let [a, b, c] of winConditions) {
    
        if (p1.includes(a) && p1.includes(b) && p1.includes(c)) {
            finishGame = true
            return ({
                vencedor: "Player 1 Venceu !!",
                casas: [a, b, c]
                            
            })
        }
        if (p2.includes(a) && p2.includes(b) && p2.includes(c)) {
            finishGame = true
            return ({
                vencedor: "Player 2 Venceu !!",
                casas: [a, b, c]
            })
        }
    }
    
    if (p1.length + p2.length === 9) {
        finishGame = true
        return 'Empate!'
    }
}

function countView(ganhador){
    const placar = document.querySelector("#placar")
    const valuePlacar = document.querySelectorAll("[data-count]")
    if(ganhador === "Player 1 Venceu !!"){
        countP1++
    }else{
        countP2++
    }
    valuePlacar.forEach((el) => {
        el.dataset.count === "1" ? el.textContent = `Player 1: ${countP1}` : el.textContent = `Player 2: ${countP2}`
    })
}