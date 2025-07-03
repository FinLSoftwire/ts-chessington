import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        // Stores if each diagonal has been blocked yet
        let unBlocked: boolean[] = [true, true, true, true, true, true, true, true];
        for (let i = 1; i < GameSettings.BOARD_SIZE; i++) {
            for (let j = 0; j < 4; j++) {
                // Check for unblocked diagonals
                if (unBlocked[j*2]) {
                    let Pos1 = new Square(piecePosition.row + i * (2 * (j % 2) - 1), piecePosition.col + i * (2 * Math.floor(j / 2) - 1));
                    if (!Pos1.checkInRange() || board.getPiece(Pos1) !== undefined) {
                        unBlocked[j*2] = false;
                    } else {
                        possibleMoves.push(Pos1);
                    }
                }
                // Check for unblocked laterals
                if (unBlocked[j*2+1]) {
                    let Pos1;
                    if (j % 2 === 0) {
                        Pos1 = new Square(piecePosition.row, piecePosition.col + i * (2 * Math.floor(j / 2) - 1));
                    } else {
                        Pos1 = new Square(piecePosition.row + i * (2 * Math.floor(j / 2) - 1), piecePosition.col);
                    }
                    if (!Pos1.checkInRange() || board.getPiece(Pos1) !== undefined) {
                        unBlocked[j*2+1] = false;
                    } else {
                        possibleMoves.push(Pos1);
                    }
                }
            }
        }
        return possibleMoves;
    }
}
