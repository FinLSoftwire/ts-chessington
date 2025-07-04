import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";
import GameSettings from "../gameSettings";

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
                    let newPosPiece = board.getPiece(newPos);
                    if (typeof newPosPiece === 'undefined' || (newPosPiece.player !== this.player && !(newPosPiece instanceof King)))
                        possibleMoves.push(newPos);
                }
            }
        }
        let castleDec: Square = Square.at(piecePosition.row, piecePosition.col - 2);
        let castleInc: Square = Square.at(piecePosition.row, piecePosition.col + 2);
        let decRook = Square.at(piecePosition.row, 0);
        let incRook = Square.at(piecePosition.row, 0);
        if (castleDec.checkInRange() && board.getPiece(decRook) instanceof Rook && board.getPiece(decRook)?.player === this.player) {
            let blocked: boolean = false;
            for (let columnIndex = piecePosition.col - 1; columnIndex > 0; columnIndex--) {
                if (!!board.getPiece(Square.at(piecePosition.row, columnIndex))) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked)
                possibleMoves.push(castleDec);
        }
        if (castleInc.checkInRange() && board.getPiece(incRook) instanceof Rook && board.getPiece(incRook)?.player === this.player) {
            let blocked: boolean = false;
            for (let columnIndex = piecePosition.col + 1; columnIndex < GameSettings.BOARD_SIZE-1; columnIndex++) {
                if (!!board.getPiece(Square.at(piecePosition.row, columnIndex))) {
                    blocked = true;
                    break;
                }
            }
            if (!blocked)
                possibleMoves.push(castleInc);
        }
        return possibleMoves;
    }
}
