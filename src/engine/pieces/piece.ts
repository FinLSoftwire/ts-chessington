import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    protected moved: boolean = false;
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
        this.moved = false;
    }

    public hasMoved() {
        return this.moved;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        this.moved = true;
    }
}
