const campos = $("[data-position]");
const escolha = $("[data-escolha]");
const players = [];
const movesFromPlayers = [[], []];
let countP1 = 0;
let countP2 = 0;
const playerChance = $("#player-chance");
const restartGame = $("#restartGame");
const changePlayer = $("#change-player");
const gameStart = $("#game-start");
const placar = $("#placar");
let finishGame = false;

function verificaWinner(arr){
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
        if(p1.includes(a) && p1.includes(b) && p1.includes(c)){
            finishGame = true;
            return ({
                vencedor: "PLAYER 1 VENCEU !!",
                casas: [a, b, c]
            })
        }
        if(p2.includes(a) && p2.includes(b) && p2.includes(c)) {
            finishGame = true;
            return ({
                vencedor: "PLAYER 2 VENCEU !!",
                casas: [a, b, c]
            })
        }
    }

    if(p1.length + p2.length === 9) {
        finishGame = true;
        return 'EMPATE';
    }
}

function countView(ganhador){
    const placar = $("#placar");
    const valuePlacar = $("[data-count]");
    if(ganhador === "PLAYER 1 VENCEU !!"){
        countP1++;
    } else {
        countP2++;
    }
    valuePlacar.each((index, el) => {
        el.dataset.count === "1" ? $(el).text(`PLAYER 1: ${countP1}`) : $(el).text(`PLAYER 2: ${countP2}`);
    })
}

$(document).ready(function() {
    iniciarJogo();

    $("#restartGame").click(iniciarJogo)
});

function iniciarJogo() {
    finishGame = false;
    movesFromPlayers.splice(0);
    players.splice(0);
    movesFromPlayers.push([]);
    movesFromPlayers.push([]);
    
    campos.each((index, el) => {
        $(el).text("");
        $(el).removeClass("winnerShow");
    });

    restartGame.addClass("displayOff");
    changePlayer.removeClass("displayOff");
    gameStart.addClass("displayOff");
    gameStart.text("O JOGO COMEÇOU");
    playerChance.text("VEZ DO PLAYER 1");

    escolha.each((index, el) => {
        $(el).on("click", function(ev) {
            let option = ev.target.dataset.escolha
            if(option === "X"){
                players.push(option);
                players.push("O");
            } else {
                players.push(option);
                players.push("X");
            }
            changePlayer.addClass("displayOff");
            gameStart.removeClass("displayOff");
            playerChance.removeClass("displayOff");
        })

    })

    campos.each((index, el) => {
        $(el).on("click", function(ev) {
            if(!finishGame){
                if(!verificaWinner(movesFromPlayers)){
                    if(players.length === 0){
                        return alert("SELECIONE O PLAYER 1")
                    }
                    if($(el).text() === ""){
                        if((movesFromPlayers[0].length + movesFromPlayers[1].length) % 2 === 0){
                            $(el).text(players[0]);
                            movesFromPlayers[0].push(parseInt(el.dataset.position));
                            playerChance.text("VEZ DO PLAYER 2");
                            console.log(movesFromPlayers)
                        } else {
                            $(el).text(players[1]);
                            movesFromPlayers[1].push(parseInt(el.dataset.position));
                            playerChance.text("VEZ DO PLAYER 1");
                        }
                    }
                }

                if(verificaWinner(movesFromPlayers)){
                    let winner = verificaWinner(movesFromPlayers);
                    let gameStats = $("game-start");
                    if(typeof winner === "object"){
                        gameStart.text(winner.vencedor);
                        let casas = winner.casas;
                        casas.forEach((el) => {
                            let casaWin1 = $(`[data-position="${el}"]`);
                            casaWin1.addClass("winnerShow");
                        });
                        
                        playerChance.addClass("displayOff");
                        restartGame.removeClass("displayOff");
                        placar.removeClass("placarOff");
                        countView(winner.vencedor);
                    } else {
                        gameStart.text(winner);
                        playerChance.addClass("displayOff");
                        restartGame.removeClass("displayOff");
                    }
                }
            }
        })
    });
}

