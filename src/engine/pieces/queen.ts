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
        for (let i = 0; i < GameSettings.BOARD_SIZE; i++) {
            if (i !== piecePosition.col)
                possibleMoves.push(new Square(piecePosition.row, i));
            if (i !== piecePosition.row)
                possibleMoves.push(new Square(i, piecePosition.col));
        }
        return possibleMoves;
    }
}
