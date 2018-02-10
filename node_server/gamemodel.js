/*jshint esversion: 6 */
var shuffle = require('shuffle-array');
var Deck = require('card-deck');


class SuecaGame {
    constructor(ID, playerID, player1Name, socketID) {
        this.gameID = ID;
        this.gameEnded = false;
        this.gameStarted = false;
        this.winnerTeam = undefined;
        this.playerCount = undefined;
        this.playerTurn = undefined;
        this.trumpCard = undefined;
        this.timer = undefined;
        this.players = [];
        this.deck = new Deck();

        let player = {
            playerID: playerID,
            socketID: socketID,
            name: player1Name,
            score: 0,
            team: 1,
            hand: []

        }
        this.playerCount = this.players.push(player);
    }

    join(playerID, playerName, socketID) {

        if (this.playerCount < 4) {
            let teamNumber = undefined;
            if (this.playerCount % 2 != 0) {
                teamNumber = 1;
            } else {
                teamNumber = 2;
            }
            let player = {
                playerID: playerID,
                socketID: socketID,
                name: playerName,
                score: 0,
                team: teamNumber,
                hand: []
            }
            this.playerCount = this.players.push(player);
        }

    }

    startGame() {
        for (let i = 0; i < 40; i++) {
            this.deck.shuffle();
        }
        this.nextPlayer = Math.floor(Math.random() * 4)-1
        this.gameStarted = true;
        console.log("GAME STARTED");
        console.log("First Player: " +this.nextPlayer);
        console.log("Deck: " + this.deck);
    }




    createBoard(totCols, totLines, defaultSize) {
        /*  console.log("Default: " + defaultSize);
         console.log("totCols: " + totCols);
         console.log("totLines: " + totLines); */
        //Board 4 x 4
        //16 pieces
        if (defaultSize) {
            if (this.playerCount == 1 || this.playerCount == 2) {
                this.totCols = 4;
                this.totLines = 4;
            } else if (this.playerCount == 3) {
                this.totCols = 6;
                this.totLines = 4;
            } else if (this.playerCount == 4) {
                this.totCols = 6;
                this.totLines = 6;
            }
        } else {
            this.totCols = totCols;
            this.totLines = totLines;
        }
        this.totTiles = this.totCols * this.totLines;
        this.leftPieces = this.totTiles;
        for (let i = 1; i <= this.totTiles; i += 2) {
            let piece1 = this.getPiece();
            let piece2 = Object.assign({}, piece1); //Copy piece data 1 into piece 2           

            this.board.push(piece1);
            this.board.push(piece2);
        }

        for (var i = 0; i < 40; i++) {
            shuffle(this.board);
        }


    }
    getPiece() {
        var piece = {
            number: undefined,
            imageToShow: "hidden",
            flipped: false,
            removed: false
        };

        let pieceNumber;

        do {
            pieceNumber = Math.floor(Math.random() * 40);

        }
        while (!this.canBePushed(pieceNumber));
        piece.number = pieceNumber;
        return piece;
    }

    //Check for duplicates
    canBePushed(number) {
        if (this.board.lenght == 0) {
            return true;
        }

        for (var piece of this.board) {
            if (number == piece.number) {
                return false;
            }
        }
        return true;
    }

    play(playerNumber, index) {
        var piece = this.board[index];
        //console.log(this.gameStarted);
        //console.log("Player Turn: " + this.playerTurn);
        //console.log("Player Number: " + playerNumber);
        if (playerNumber != this.playerTurn) {
            return false;
        }
        if (!this.gameStarted || piece.flipped || piece.removed) return false;

        if (this.clickCounter == 0) {
            piece.flipped = true;
            piece.imageToShow = this.board[index].number;
            this.clickCounter = 1;
            this.firstPiece = this.board[index];
            return true;
        }
        //return true;
        else if (this.clickCounter == 1) {
            piece.flipped = true;
            piece.imageToShow = this.board[index].number;
            this.clickCounter = 2;
            this.secondPiece = this.board[index];
            //this.doMatch();
            return true;
        }
    }



    nextPlayer() {
        this.playerTurn++;

        if (this.playerTurn > this.playerCount) {
            this.playerTurn = 1;
        }
    }



    gameIsOver() {
        if (this.leftPieces == 0) return true;
        else return false;

    }



}

module.exports = SuecaGame;