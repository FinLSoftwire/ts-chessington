import 'chai/register-should';
import Board from '../../src/engine/board';
import Pawn from '../../src/engine/pieces/pawn';
import Player from '../../src/engine/player';
import Square from '../../src/engine/square';
import King from "../../src/engine/pieces/king";
import assert from "node:assert";

describe('Board', () => {

    describe('pawns', () => {

        let board : Board;
        beforeEach(() => { // Common code executed before each test.
            board = new Board();
        });

        it('can be added to the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(0, 0);

            // Act
            board.setPiece(square, pawn);

            // Assert
            const piece = board.getPiece(square);
            pawn.should.equal(piece); // Object equality: same object reference
        });

        it('can be found on the board', () => {
            // Arrange
            const pawn = new Pawn(Player.WHITE);
            const square = Square.at(6, 4);

            // Act
            board.setPiece(square, pawn);

            // Assert
            board.findPiece(pawn).should.eql(square); // Object equivalence: different objects, same data
        });

        it("can't move into check", () => {
            // Arrange
            const wKing = new King(Player.WHITE);
            const bPawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(3, 4), wKing);
            board.setPiece(Square.at(4, 4), bPawn);
            board.movePiece(Square.at(3,4), Square.at(3,3));
            assert.equal(board.getPiece(Square.at(3,4)),wKing);
            assert.equal(board.getPiece(Square.at(3,3)),undefined);
            assert.equal(board.currentPlayer, Player.WHITE);
        });

    });
});
