import {Pixel} from "../Pixel.js";
import {Color} from "../../../utility/Color.js";
import {Texture} from "../Texture.js";

export class Wood extends Texture {

    constructor() {
        const light = new Pixel(new Color(204,164,99));
        const dark = new Pixel(new Color(96,71,55));

        super([
            [dark, dark, dark, dark, dark, dark, dark, dark],
            [light, light, light, light, light, light, light, light],
            [light, light, dark, light, light, light, dark, light],
            [light, light, light, light, light, light, light, light],
            [dark, light, light, light, dark, light, light, light],
            [light, light, light, light, light, light, light, light],
            [dark, dark, dark, dark, dark, dark, dark, dark],
            [light, light, light, light, light, light, light, light],
            [light, light, dark, light, light, light, dark, light],
            [light, light, light, light, light, light, light, light],
            [dark, light, light, light, dark, light, light, light],
            [light, light, light, light, light, light, light, light],
        ]);
    }

}