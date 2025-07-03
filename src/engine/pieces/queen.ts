import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Bishop from "./bishop";
import Rook from "./rook";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let piecePosition: Square = board.findPiece(this);
        return Rook.findMoves(board, this.player, piecePosition).concat(Bishop.findMoves(board, this.player, piecePosition));
    }
}
