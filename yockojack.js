const fetch = require("node-fetch");

module.exports = {

    init,
    loadTestDataEc,
    demoData,
    logResults
}

let cardSetArry = [
    { key: "J", value: 10 },
    { key: "Q", value: 10 },
    { key: "K", value: 10 },
    { key: "2", value: 2 },
    { key: "3", value: 3 },
    { key: "4", value: 4 },
    { key: "5", value: 5 },
    { key: "6", value: 6 },
    { key: "7", value: 7 },
    { key: "8", value: 8 },
    { key: "9", value: 9 },
    { key: "S", value: 0 },
    { key: "C", value: 0 },
    { key: "D", value: 0 }
]


function init() {
    console.log("hello world")
}

let highestSingleCardAtHand = null;
let highestInTotal = null;

let demoGame = {
    playerA: ["9S", "2S"],
    playerB: ["5D", "7C"],
    playerAWins: false
}

let playerNewObject = { card: null, totalQuantityOfCards: null, quantity: 0 };

let gameInProgress = {
    playerResultB: [],
    playerResultA: []
}

function demoData(cardsOfUsers) {
    let gamePlayStore = demoGame
    for (let player in gamePlayStore) {

        if (!gamePlayStore[player]) break;

        gamePlayStore[player].forEach((card) => {

            if (player == "playerA") {
                let cardTotalA = 0
                let cardSystem = Object.assign({}, playerNewObject);
                cardSystem.card = card;
                let returnTotals = lookUpStrings(card);
                cardTotalA += returnTotals;
                cardSystem.totalQuantityOfCards = returnTotals;
                cardSystem.quantity = cardTotalA;
                gameInProgress.playerResultA.push(cardSystem);
            }


            if (player == "playerB") {
                let cardTotalB = 0;
                let cardSystem = Object.assign({}, playerNewObject);
                cardSystem.card = card;
                let returnTotals = lookUpStrings(card);
                cardTotalB += returnTotals;
                cardSystem.totalQuantityOfCards = returnTotals;
                cardSystem.quantity = cardTotalB;
                gameInProgress.playerResultB.push(cardSystem);
            }
        });
    }

    addUpQuantity();
}

function lookUpStrings(value) {
    let cardsToSplit = value;
    let holdCount = 0;
    let singleCardTotal = cardsToSplit.split("");

    for (let key in singleCardTotal) {
        cardSetArry.find(obj => {
            if (obj.key == singleCardTotal[key]) {
                holdCount += obj.value;
            }
        });
    }
    return holdCount;
}

function addUpQuantity() {

    for (var game in gameInProgress) {
        var quantityOfCards = 0;
        for (var player in gameInProgress[game]) {
            quantityOfCards += gameInProgress[game][player].quantity;

        }
        gameInProgress[game].totalQuantityOfCards = quantityOfCards;

    }
    updateGameObject();
}


function updateGameObject() {
    for (var winner in gameInProgress) {
        if (gameInProgress['playerResultB'].totalQuantityOfCards > gameInProgress['playerResultA'].totalQuantityOfCards) {
            demoGame.playerAWins = false;
        }
        else {
            demoGame.playerAWins = true;
        }
    }
    logResults();
}

function logResults() {
    console.log(demoGame);
    return demoGame;
}

function loadTestDataEc() {
    fetch('https://s3-eu-west-1.amazonaws.com/yoco-testing/tests.json')
        .then(res => res.json())
        .then(json => {

            for (var games in json) {
                demoGame = json[games];

            }

        })
    demoData();

}
