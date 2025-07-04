import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Pawn from "./pieces/pawn";
import King from "./pieces/king";
import Queen from "./pieces/queen";

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];
    private lastMovedPiece: (Piece | undefined);
    private previousPosition: (Square | undefined);

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        const movingPiece = this.getPiece(fromSquare);        
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            if (movingPiece instanceof Pawn) {
                let playerDirection: number = (this.currentPlayer == Player.WHITE? 1 : -1);
                let expectedPawnSquare = Square.at(toSquare.row - playerDirection, toSquare.col);
                let expectedPawnPiece = this.getPiece(expectedPawnSquare);
                let squareTwoBehind = Square.at(toSquare.row + playerDirection, toSquare.col);
                if (expectedPawnPiece instanceof Pawn && this.lastMovedPiece === expectedPawnPiece && squareTwoBehind.equals(this.previousPosition)) {
                    this.setPiece(expectedPawnSquare, undefined);
                }
                if (toSquare.row === (this.currentPlayer === Player.BLACK? 0:7)) {
                    this.setPiece(toSquare, new Queen(this.currentPlayer));
                }

            }
            else if (movingPiece instanceof King) {
                let colDelta = toSquare.col - fromSquare.col;
                if (Math.abs(colDelta) == 2) {
                    let colDeltaSign = (colDelta > 0) ? 1 : -1;
                    let oldRookCol = (colDelta > 0) ? 7 : 0;
                    let oldRookSquare = Square.at(fromSquare.row, oldRookCol);
                    let oldRook = this.getPiece(oldRookSquare);
                    let newRookSquare = Square.at(toSquare.row, toSquare.col - colDeltaSign);
                    this.setPiece(newRookSquare, oldRook);
                    this.setPiece(oldRookSquare, undefined);
                }
            }

            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);
            this.lastMovedPiece = movingPiece;
            this.previousPosition = fromSquare;
        }
    }

    public getLastPiece() {
        return this.lastMovedPiece;
    }

    public getLastPosition() {
        return this.previousPosition;
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
