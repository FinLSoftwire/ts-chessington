import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

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
        let takeDec = new Square(piecePosition.row + playerDirection, piecePosition.col - 1);
        let takeInc = new Square(piecePosition.row + playerDirection, piecePosition.col + 1);
        if (takeDec.checkInRange()) {
            let decPosPiece = board.getPiece(takeDec);
            if (typeof decPosPiece !== 'undefined' && decPosPiece?.player !== this.player && !(decPosPiece instanceof King))
                possibleMoves.push(takeDec);
        }
        if (takeInc.checkInRange()) {
            let incPosPiece = board.getPiece(takeInc);
            if (typeof incPosPiece !== 'undefined' && incPosPiece?.player !== this.player && !(incPosPiece instanceof King))
                possibleMoves.push(takeInc);
        }
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
