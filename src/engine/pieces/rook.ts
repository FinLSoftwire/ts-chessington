import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        let rowIndex = piecePosition.row-1;
        while (rowIndex >= 0) {
            let newMove = new Square(rowIndex, piecePosition.col);
            if (typeof board.getPiece(newMove) !== 'undefined') {
                if (board.getPiece(newMove)?.player !== this.player)
                    possibleMoves.push(newMove);
                break;
            }
            possibleMoves.push(newMove);
            rowIndex--;
        }
        let colIndex = piecePosition.col-1;
        while (colIndex >= 0) {
            let newMove = new Square(piecePosition.row, colIndex);
            if (typeof board.getPiece(newMove) !== 'undefined') {
                if (board.getPiece(newMove)?.player !== this.player)
                    possibleMoves.push(newMove);
                break;
            }
            possibleMoves.push(newMove);
            colIndex--;
        }
        rowIndex = piecePosition.row+1;
        while (rowIndex < GameSettings.BOARD_SIZE) {
            let newMove = new Square(rowIndex, piecePosition.col);
            if (typeof board.getPiece(newMove) !== 'undefined') {
                if (board.getPiece(newMove)?.player !== this.player)
                    possibleMoves.push(newMove);
                break;
            }
            possibleMoves.push(newMove);
            rowIndex++;
        }
        colIndex = piecePosition.col+1;
        while (colIndex < GameSettings.BOARD_SIZE) {
            let newMove = new Square(piecePosition.row, colIndex);
            if (typeof board.getPiece(newMove) !== 'undefined') {
                if (board.getPiece(newMove)?.player !== this.player)
                    possibleMoves.push(newMove);
                break;
            }
            possibleMoves.push(newMove);
            colIndex++;
        }
        return possibleMoves;
    }
}
