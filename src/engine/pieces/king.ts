import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        for (let rowDelta = -1; rowDelta < 2; rowDelta++) {
            for (let colDelta = -1; colDelta < 2; colDelta++) {
                if (colDelta === 0 && rowDelta === 0)
                    continue;
                let newPos = new Square(piecePosition.row + rowDelta, piecePosition.col + colDelta);
                if (newPos.checkInRange()) {
                    possibleMoves.push(newPos);
                }
            }
        }
        return possibleMoves;
    }
}
