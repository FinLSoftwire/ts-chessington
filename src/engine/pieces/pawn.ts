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
        let playerDirection: number = (this.player == Player.WHITE? 1 : -1);
        let oneStep = new Square(piecePosition.row + playerDirection, piecePosition.col);
        if (!oneStep.checkInRange() || typeof board.getPiece(oneStep) !== 'undefined')
            return new Array(0);
        possibleMoves.push(oneStep);
        if (!this.moved) {
            let twoStep = new Square(piecePosition.row + 2 * playerDirection, piecePosition.col);
            if (!twoStep.checkInRange() || typeof board.getPiece(twoStep) === 'undefined')
                possibleMoves.push(twoStep);
        }
        return possibleMoves;
    }
}
