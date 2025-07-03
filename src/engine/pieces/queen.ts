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
        // When moving diagonally, the difference and sum of the row and column remain the same
        let delta = piecePosition.row - piecePosition.col;
        let sum = piecePosition.row + piecePosition.col;
        for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
            if (i !== piecePosition.col) {
                possibleMoves.push(new Square(piecePosition.row, i));
                let Pos1 = new Square(i + delta, i);
                if (Pos1.row >= 0 && Pos1.row < GameSettings.BOARD_SIZE)
                    possibleMoves.push(Pos1);
                let Pos2 = new Square(sum - i, i);
                if (Pos2.row >= 0 && Pos2.row < GameSettings.BOARD_SIZE)
                    possibleMoves.push(Pos2);
            }
            if (i !== piecePosition.row)
                possibleMoves.push(new Square(i, piecePosition.col));
        }
        return possibleMoves;
    }
}
