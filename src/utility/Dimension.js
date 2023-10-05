export class Dimension {

    /**
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    copy() {
        return new Dimension(this.width, this.height);
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    set(width, height) {
        this.width = width;
        this.height = height;
    }

    /**
     * @return {number}
     */
    getWidth() {
        return this.width;
    }

    /**
     * @param {number} width
     */
    setWidth(width) {
        this.width = width;
    }

    /**
     * @return {number}
     */
    getHeight() {
        return this.height;
    }

    /**
     * @param {number} height
     */
    setHeight(height) {
        this.height = height;
    }
}