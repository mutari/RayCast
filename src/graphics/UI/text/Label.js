import {UIElement} from "../UIElement.js";

export class Label extends UIElement {

    text;

    /**
     * @param {string} text
     */
    constructor(text) {
        super();
        this.text = text;
    }

    /**
     * @param {string} text
     */
    setText(text) {
        this.text = text;
    }

    draw(graphics) {
        graphics.fillText(this.text, this.position.x, this.position.y);
    }

}