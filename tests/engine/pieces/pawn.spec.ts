import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import * as assert from "node:assert";

describe('Pawn', () => {

    let board: Board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {

        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('en passants', () => {
            const wPawn = new Pawn(Player.WHITE);
            const bPawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(3, 4), wPawn);
            board.setPiece(Square.at(6, 3), bPawn);
            wPawn.moveTo(board, Square.at(4,4));
            bPawn.moveTo(board, Square.at(4,3));

            const moves = wPawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('en passants only on first move', () => {
            const wPawn = new Pawn(Player.WHITE);
            const bPawn = new Pawn(Player.BLACK);
            const wPawn2 = new Pawn(Player.WHITE);
            const bPawn2 = new Pawn(Player.BLACK);
            board.setPiece(Square.at(3, 4), wPawn);
            board.setPiece(Square.at(6, 3), bPawn);
            board.setPiece(Square.at(1, 7), wPawn2);
            board.setPiece(Square.at(6, 7), bPawn2);

            wPawn.moveTo(board, Square.at(4,4));
            bPawn.moveTo(board, Square.at(4,3));

            wPawn2.moveTo(board, Square.at(2, 7));
            bPawn2.moveTo(board, Square.at(5, 7));

            const moves = wPawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('en passants only on a double move', () => {
            const wPawn = new Pawn(Player.WHITE);
            const bPawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(2, 4), wPawn);
            board.setPiece(Square.at(6, 3), bPawn);
            wPawn.moveTo(board, Square.at(3,4));
            bPawn.moveTo(board, Square.at(5,3));
            wPawn.moveTo(board, Square.at(4,4));
            bPawn.moveTo(board, Square.at(4,3));

            const moves = wPawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('en passant removes piece', () => {
            const wPawn = new Pawn(Player.WHITE);
            const bPawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(3, 4), wPawn);
            board.setPiece(Square.at(6, 3), bPawn);
            wPawn.moveTo(board, Square.at(4,4));
            bPawn.moveTo(board, Square.at(4,3));
            wPawn.moveTo(board, Square.at(5,3));
            assert.equal(board.getPiece(Square.at(4,3)), undefined);
        });
    });

    describe('black pawns', () => {

        let board: Board;
        beforeEach(() => board = new Board(Player.BLACK));

        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });
    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });

    it('en passants', () => {
        const wPawn = new Pawn(Player.WHITE);
        const bPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 4), wPawn);
        board.setPiece(Square.at(3, 3), bPawn);
        wPawn.moveTo(board, Square.at(3,4));

        const moves = bPawn.getAvailableMoves(board);

        moves.should.deep.include(Square.at(2, 4));
    });

    it('en passants only on first move', () => {
        const wPawn = new Pawn(Player.WHITE);
        const bPawn = new Pawn(Player.BLACK);
        const wPawn2 = new Pawn(Player.WHITE);
        const bPawn2 = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 4), wPawn);
        board.setPiece(Square.at(3, 3), bPawn);
        board.setPiece(Square.at(1, 7), wPawn2);
        board.setPiece(Square.at(6, 7), bPawn2);
        wPawn.moveTo(board, Square.at(3,4));
        bPawn2.moveTo(board, Square.at(5, 7));
        wPawn2.moveTo(board, Square.at(2, 7));

        const moves = bPawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(2, 4));
    });

    it('en passants only on a double ,move', () => {
        const wPawn = new Pawn(Player.WHITE);
        const bPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 4), wPawn);
        board.setPiece(Square.at(4, 3), bPawn);
        wPawn.moveTo(board, Square.at(2,4));
        bPawn.moveTo(board, Square.at(3,3));
        wPawn.moveTo(board, Square.at(3,4));

        const moves = bPawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(2, 4));
    });

    it('en passant removes piece', () => {
        const wPawn = new Pawn(Player.WHITE);
        const bPawn = new Pawn(Player.BLACK);
        board.setPiece(Square.at(1, 4), wPawn);
        board.setPiece(Square.at(3, 3), bPawn);
        wPawn.moveTo(board, Square.at(3,4));
        bPawn.moveTo(board, Square.at(2,4));
        assert.equal(board.getPiece(Square.at(3,4)),undefined);
    });
});