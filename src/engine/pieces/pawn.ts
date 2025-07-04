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

    public hasMoved() {
        return this.moved;
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        let playerDirection: number = (this.player == Player.WHITE? 1 : -1);
        let takeDecreasedCol = new Square(piecePosition.row + playerDirection, piecePosition.col - 1);
        let takeIncreasedCol = new Square(piecePosition.row + playerDirection, piecePosition.col + 1);
        if (takeDecreasedCol.checkInRange()) {
            let decPosPiece = board.getPiece(takeDecreasedCol);
            // en passant
            let decreasedColAdjacent = new Square(piecePosition.row, piecePosition.col - 1);
            let adjPieceDec = board.getPiece(decreasedColAdjacent);
            if (typeof decPosPiece === 'undefined' && adjPieceDec instanceof Pawn && adjPieceDec.player !== this.player) {
                possibleMoves.push(takeDecreasedCol);
            }
            if (typeof decPosPiece !== 'undefined' && decPosPiece?.player !== this.player && !(decPosPiece instanceof King))
                possibleMoves.push(takeDecreasedCol);
        }
        if (takeIncreasedCol.checkInRange()) {
            let incPosPiece = board.getPiece(takeIncreasedCol);
            // en passant
            let increasedColAdjacent = new Square(piecePosition.row, piecePosition.col + 1);
            let adjPieceInc = board.getPiece(increasedColAdjacent);
            if (typeof incPosPiece === 'undefined' && adjPieceInc instanceof Pawn && adjPieceInc.player !== this.player) {
                possibleMoves.push(takeIncreasedCol);
            }
            if (typeof incPosPiece !== 'undefined' && incPosPiece?.player !== this.player && !(incPosPiece instanceof King))
                possibleMoves.push(takeIncreasedCol);
        }

        let oneStep = new Square(piecePosition.row + playerDirection, piecePosition.col);
        if (!oneStep.checkInRange() || typeof board.getPiece(oneStep) !== 'undefined')
            return possibleMoves;
        possibleMoves.push(oneStep);
        if (!this.moved) {
            let twoStep = new Square(piecePosition.row + 2 * playerDirection, piecePosition.col);
            if (!twoStep.checkInRange() || typeof board.getPiece(twoStep) === 'undefined')
                possibleMoves.push(twoStep);
        }
        return possibleMoves;
    }
}
