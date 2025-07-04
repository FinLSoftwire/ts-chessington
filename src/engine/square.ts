import GameSettings from "./gameSettings";

export default class Square {
    public row: number;
    public col: number;

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    public static at(row: number, col: number) {
        return new Square(row, col);
    }

    public equals(otherSquare: Square | undefined) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }

    public checkInRange(): boolean {
        return this.row >= 0 && this.row < GameSettings.BOARD_SIZE && this.col >= 0 && this.col < GameSettings.BOARD_SIZE;
    }
}
