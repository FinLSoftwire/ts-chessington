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
        let previousMovedPiece = board.getLastPiece();
        let previousMovedPosition= board.getLastPosition();
        if (takeDecreasedCol.checkInRange()) {
            let decPosPiece = board.getPiece(takeDecreasedCol);
            // en passant
            if (typeof decPosPiece === 'undefined') {
                let decreasedColAdjacent = new Square(piecePosition.row, piecePosition.col - 1);
                let adjPieceDec = board.getPiece(decreasedColAdjacent);
                let expectedPos = Square.at(decreasedColAdjacent.row + 2 * playerDirection, decreasedColAdjacent.col);
                if (adjPieceDec instanceof Pawn && adjPieceDec.player !== this.player && adjPieceDec === previousMovedPiece && previousMovedPosition?.equals(expectedPos))
                    possibleMoves.push(takeDecreasedCol);
            }
            else if (decPosPiece?.player !== this.player && !(decPosPiece instanceof King))
                possibleMoves.push(takeDecreasedCol);
        }
        if (takeIncreasedCol.checkInRange()) {
            let incPosPiece = board.getPiece(takeIncreasedCol);
            // en passant
            if (typeof incPosPiece === 'undefined') {
                let increasedColAdjacent = new Square(piecePosition.row, piecePosition.col + 1);
                let adjPieceInc = board.getPiece(increasedColAdjacent);
                let expectedPos = Square.at(increasedColAdjacent.row + 2 * playerDirection, increasedColAdjacent.col);
                if (adjPieceInc instanceof Pawn && adjPieceInc.player !== this.player && adjPieceInc === previousMovedPiece && previousMovedPosition?.equals(expectedPos))
                    possibleMoves.push(takeIncreasedCol);
            }
            else if (incPosPiece?.player !== this.player && !(incPosPiece instanceof King))
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
