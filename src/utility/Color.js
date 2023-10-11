export class Color {

    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toString() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }

    static hexToRgb(hex, text = true) {
        // Remove the leading '#' if it exists
        hex = hex.replace('#', '');

        // Ensure the string is 6 characters long
        if (hex.length !== 6) {
            return null;
        }

        // Parse each component
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);

        if (text) {
            return `rgb(${r}, ${g}, ${b})`;
        }

        return {
            r: r,
            g: g,
            b: b
        };
    }


    static rgbToHex(r, g, b) {
        return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
    }

}