import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Knight extends Piece {
    private DELTAS: number[][] = [];
    public constructor(player: Player) {
        super(player);
        for (let i = -2; i < 3; i += 4) {
            for (let j = -1; j < 2; j += 2) {
                this.DELTAS.push([i,j]);
                this.DELTAS.push([j,i]);
            }
        }
    }

    public getAvailableMoves(board: Board) {
        let possibleMoves: Square[] = [];
        let piecePosition: Square = board.findPiece(this);
        let currentPlayer = this.player; // Dealing with scope within the foreach function
        this.DELTAS.forEach(function (value) {
            let newPos = new Square(piecePosition.row + value[0], piecePosition.col + value[1]);
            if (newPos.checkInRange()) {
                let newPosPiece = board.getPiece(newPos);
                if (typeof newPosPiece === 'undefined' || (newPosPiece.player !== currentPlayer && !(newPosPiece instanceof King)))
                    possibleMoves.push(newPos);
            }
        });
        return possibleMoves;
    }
}
