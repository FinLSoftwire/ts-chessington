import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        // When moving diagonally, the difference and sum of the row and column remain the same
        let delta = piecePosition.row - piecePosition.col;
        let sum = piecePosition.row + piecePosition.col;
        for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
            if (i !== piecePosition.col) {
                let Pos1 = new Square(i + delta, i);
                if (Pos1.checkInRange())
                    possibleMoves.push(Pos1);
                let Pos2 = new Square(sum - i, i);
                if (Pos2.checkInRange())
                    possibleMoves.push(Pos2);
            }
        }
        return possibleMoves;
    }
}
