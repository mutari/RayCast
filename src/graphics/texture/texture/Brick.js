import {Texture} from "../Texture.js";
import {Pixel} from "../Pixel.js";
import {Color} from "../../../utility/Color.js";

export class Brick extends Texture {

    constructor() {
        let light = new Pixel(new Color(217, 162, 144)); //color: #d9a290
        let normal = new Pixel(new Color(201, 79, 45)); //color: #c94f2d
        let dark = new Pixel(new Color(87, 28, 24)); //color: #571c18

        super([
            [light, light, light, light, light, dark, light, light],
            [normal, normal, normal, normal, normal, dark, normal, normal],
            [normal, normal, normal, normal, normal, dark, normal, normal],
            [normal, normal, normal, normal, normal, dark, normal, normal],
            [dark, dark, dark, dark, dark, dark, dark, dark],
            [light, light, light, dark, light, light, light, light],
            [normal, normal, normal, dark, normal, normal, normal, normal],
            [normal, normal, normal, dark, normal, normal, normal, normal],
            [normal, normal, normal, dark, normal, normal, normal, normal],
            [dark, dark, dark, dark, dark, dark, dark, dark],
        ]);
    }

}