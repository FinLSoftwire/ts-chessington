import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public static findMoves(board: Board, player: Player, piecePosition: Square) {
        let possibleMoves: Square[] = [];
        // Stores if each diagonal has been blocked yet
        let unBlocked: boolean[] = [true, true, true, true];
        for (let i = 1; i < GameSettings.BOARD_SIZE; i++) {
            for (let j = 0; j < 4; j++) {
                if (unBlocked[j]) {
                    let Pos1;
                    if (j % 2 === 0) {
                        Pos1 = new Square(piecePosition.row, piecePosition.col + i * (2 * Math.floor(j / 2) - 1));
                    } else {
                        Pos1 = new Square(piecePosition.row + i * (2 * Math.floor(j / 2) - 1), piecePosition.col);
                    }
                    if (!Pos1.checkInRange()) {
                        unBlocked[j] = false;
                        continue;
                    }
                    if (typeof board.getPiece(Pos1) !== 'undefined') {
                        if (board.getPiece(Pos1)?.player !== player && !(board.getPiece(Pos1) instanceof King))
                            possibleMoves.push(Pos1);
                        unBlocked[j] = false;
                        continue;
                    }
                    possibleMoves.push(Pos1);
                }
            }
        }
        return possibleMoves;
    }

    public getAvailableMoves(board: Board) {
        return Rook.findMoves(board, this.player, board.findPiece(this));
    }
}
