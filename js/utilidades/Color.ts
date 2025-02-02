export class Color {
    readonly r: number;
    readonly g: number;
    readonly b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    get rgb() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
}