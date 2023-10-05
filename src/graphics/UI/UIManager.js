export class UIManager {

    /**
     * @var {UIElement[]} elements
     */
    static elements = [];

    /**
     * @param {UIElement} element
     */
    static add(element) {
        this.elements.push(element);
    }

    /**
     * @return {UIElement[]}
     */
    static getAll() {
        return this.elements;
    }

    /**
     * @param {CanvasRenderingContext2D} graphics
     * @return {void}
     */
    static draw(graphics) {
        for (const element of this.getAll()) {
            element.draw(graphics);
        }
    }

}