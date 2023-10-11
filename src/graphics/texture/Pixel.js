import {Color} from "../../utility/Color.js";

export class Pixel {

    #color

    /**
     * @param {Color} color
     */
    constructor(color) {
        this.#color = color;
    }

    getColor() {
        return this.#color;
    }

    static average(pixels) {
        let totalR = 0, totalG = 0, totalB = 0, count = 0;

        for (const pixel of pixels) {
            const rgb = pixel.getColor();
            totalR += rgb.r;
            totalG += rgb.g;
            totalB += rgb.b;
            count++;
        }

        const avgR = Math.floor(totalR / count);
        const avgG = Math.floor(totalG / count);
        const avgB = Math.floor(totalB / count);

        return new Pixel(new Color(avgR, avgG, avgB));
    }

}