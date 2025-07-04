import King from '../../../src/engine/pieces/king';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Pawn from '../../../src/engine/pieces/pawn';
import Rook from "../../../src/engine/pieces/rook";
import Bishop from "../../../src/engine/pieces/bishop";
import assert from "node:assert";

describe('King', () => {
    let board: Board;
    beforeEach(() => board = new Board());

    it('can move to adjacent squares', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [
            Square.at(2, 3), Square.at(2, 4), Square.at(2, 5), Square.at(3, 5),
            Square.at(4, 5), Square.at(4, 4), Square.at(4, 3), Square.at(3, 3)
        ];

        moves.should.deep.include.members(expectedMoves);
    });

    it('cannot make any other moves', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(3, 4), king);

        const moves = king.getAvailableMoves(board);

        moves.should.have.length(8);
    });

    it('cannot leave the board', () => {
        const king = new King(Player.WHITE);
        board.setPiece(Square.at(0, 0), king);

        const moves = king.getAvailableMoves(board);

        const expectedMoves = [Square.at(0, 1), Square.at(1, 1), Square.at(1, 0)];

        moves.should.have.deep.members(expectedMoves);
    });

    it('can take opposing pieces', () => {
        const king = new King(Player.WHITE);
        const opposingPiece = new Pawn(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(5, 5));
    });

    it('cannot take the opposing king', () => {
        const king = new King(Player.WHITE);
        const opposingKing = new King(Player.BLACK);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), opposingKing);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('cannot take friendly pieces', () => {
        const king = new King(Player.WHITE);
        const friendlyPiece = new Pawn(Player.WHITE);
        board.setPiece(Square.at(4, 4), king);
        board.setPiece(Square.at(5, 5), friendlyPiece);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(5, 5));
    });

    it('castling move available', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.WHITE);
        const rookRight = new Rook(Player.WHITE);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);

        const moves = king.getAvailableMoves(board);

        moves.should.deep.include(Square.at(0, 1));
        moves.should.deep.include(Square.at(0, 5));
    });

    it('castling only available for the same team', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.BLACK);
        const rookRight = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 1));
        moves.should.not.deep.include(Square.at(0, 5));
    });

    it('castling unavailable when blocked', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.WHITE);
        const rookRight = new Rook(Player.WHITE);
        const bishopLeft = new Bishop(Player.WHITE);
        const bishopRight = new Bishop(Player.WHITE);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);
        board.setPiece(Square.at(0, 1), bishopLeft);
        board.setPiece(Square.at(0, 6), bishopRight);

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 1));
        moves.should.not.deep.include(Square.at(0, 5));
    });

    it('castling unavailable after a king move', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.WHITE);
        const rookRight = new Rook(Player.WHITE);
        const pawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);
        board.setPiece(Square.at(7, 6), pawn);
        king.moveTo(board, Square.at(1,3));
        pawn.moveTo(board, Square.at(6,6));
        king.moveTo(board, Square.at(0,3));
        pawn.moveTo(board, Square.at(5,6));

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 1));
        moves.should.not.deep.include(Square.at(0, 5));
    });

    it('castling unavailable after a rook move', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.WHITE);
        const rookRight = new Rook(Player.WHITE);
        const rookBlack = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);
        board.setPiece(Square.at(7, 6), rookBlack);
        rookLeft.moveTo(board, Square.at(1,0));
        rookBlack.moveTo(board, Square.at(6,6));
        rookLeft.moveTo(board, Square.at(0,0));
        rookBlack.moveTo(board, Square.at(7,6));

        rookRight.moveTo(board, Square.at(0,6));
        rookBlack.moveTo(board, Square.at(6,6));
        rookRight.moveTo(board, Square.at(0,7));
        rookBlack.moveTo(board, Square.at(7,6));

        const moves = king.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(0, 1));
        moves.should.not.deep.include(Square.at(0, 5));
    });

    it('castling moves both pieces in decreasing direction', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.WHITE);
        const rookRight = new Rook(Player.WHITE);
        const rookBlack = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);
        board.setPiece(Square.at(6, 7), rookBlack);
        king.moveTo(board, Square.at(0,1));
        rookBlack.moveTo(board, Square.at(6,6));
        assert.equal(board.getPiece(Square.at(0,1)),king);
        assert.equal(board.getPiece(Square.at(0,2)),rookLeft);
    });

    it('castling moves both pieces in increasing direction', () => {
        const king = new King(Player.WHITE);
        const rookLeft = new Rook(Player.WHITE);
        const rookRight = new Rook(Player.WHITE);
        const rookBlack = new Rook(Player.BLACK);
        board.setPiece(Square.at(0, 3), king);
        board.setPiece(Square.at(0, 0), rookLeft);
        board.setPiece(Square.at(0, 7), rookRight);
        board.setPiece(Square.at(6, 7), rookBlack);
        king.moveTo(board, Square.at(0,5));
        rookBlack.moveTo(board, Square.at(6,6));
        assert.equal(board.getPiece(Square.at(0,5)),king);
        assert.equal(board.getPiece(Square.at(0,4)),rookRight);
    });
});
