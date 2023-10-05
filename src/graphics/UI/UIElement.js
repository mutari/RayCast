export class UIElement {

    position;
    dimension;
    id;

    constructor() {}

    /**
     * @param {string} id
     */
    setId(id) {
        this.id = id;
    }

    /**
     * @param {Dimension} dimension
     */
    setDimension(dimension) {
        this.dimension = dimension;
    }

    /**
     * @param {Point} position
     */
    setPosition(position) {
        this.position = position;
    }

    /**
     * @param {CanvasRenderingContext2D} graphics
     * @return {void}
     */
    draw(graphics) {
        throw new Error('Not implemented');
    }

}