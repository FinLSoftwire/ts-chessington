import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    private moved: boolean = false;
    public constructor(player: Player) {
        super(player);
        this.moved = false;
    }

    public moveTo(board: Board, newSquare: Square) {
        super.moveTo(board, newSquare);
        this.moved = true;
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        if (this.player == Player.WHITE) {
            // Row number can increase
            possibleMoves.push(new Square(piecePosition.row + 1, piecePosition.col));
            if (!this.moved)
                possibleMoves.push(new Square(piecePosition.row + 2, piecePosition.col));
        } else {
            // Row number can decrease
            possibleMoves.push(new Square(piecePosition.row - 1, piecePosition.col));
            if (!this.moved)
                possibleMoves.push(new Square(piecePosition.row - 2, piecePosition.col));
        }
        return possibleMoves;
    }
}
