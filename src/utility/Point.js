/**
 * Some pointer math
 *
 * @property {number} x
 * @property {number} y
 */
export class Point {

    /**
     * @param {number} x
     * @param {number} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Point(this.x, this.y);
    }

    add(xd, yd) {
        this.set(this.x + xd, this.y + yd);
    }

    multiply(xd, yd) {
        this.set(this.x * xd, this.y * yd);
    }

    /**
     * @param {Point} point1
     * @param {Point} point2
     * @return {number}
     */
    static pythagoras(point1, point2) {
        return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
    }

    /**
     * @return {Point}
     */
    floor() {
        return new Point(Math.floor(this.x), Math.floor(this.y));
    }

    /**
     * @param {number} x
     * @param {number} y
     */
    set(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * @return {number}
     */
    getX() {
        return x;
    }

    /**
     * @param {number} x
     */
    setX(x) {
        this.x = x;
    }

    /**
     * @return {number}
     */
    getY() {
        return y;
    }

    /**
     * @param {number} y
     */
    setY(y) {
        this.y = y;
    }

}