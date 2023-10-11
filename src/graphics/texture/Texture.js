import {Print} from "../../utility/Print.js";
import {Pixel} from "./Pixel.js";

export class Texture {

    /**
     * @type {Pixel[][]}
     */
    texture_lg;
    /**
     * @type {Pixel[][]}
     */
    texture;
    /**
     * @type {Pixel[][]}
     */
    texture_sm;

    /**
     * @param {Pixel[][]} texture
     */
    constructor(texture) {
        this.texture = texture;
        this.texture_sm = Texture.downSample(texture, 2);
        this.texture_lg = Texture.downSample(texture,1);
    }

    /**
     * @param {Point} point
     * @param {"md"|"lg"|"sm"} size
     * @return {Pixel}
     */
    getPixel(point, size = 'md') {
        const image = size === 'lg' ? this.texture_lg : size === 'md' ? this.texture : this.texture_sm;
        const xLength = image[0].length;
        const yLength = image.length;
        return image[Math.abs(point.y % yLength)][Math.abs(point.x % xLength)];
    }

    static downSample(image, scale_factor) {
        const newHeight = Math.floor(image.length / scale_factor);
        const newWidth = Math.floor(image[0].length / scale_factor);
        let newImage = new Array(newHeight).fill(null).map(() => new Array(newWidth).fill(null));
        for (let i = 0; i < newHeight; i++) {
            for (let j = 0; j < newWidth; j++) {
                let pixelBlock = [];

                for (let x = 0; x < scale_factor; x++) {
                    for (let y = 0; y < scale_factor; y++) {
                        pixelBlock.push(image[i * scale_factor + x][j * scale_factor + y]);
                    }
                }

                newImage[i][j] = Pixel.average(pixelBlock);
            }
        }

        return newImage;
    }

}