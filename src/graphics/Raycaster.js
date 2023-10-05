import {Point} from "../utility/Point.js";
import {GameMap} from "../map/GameMap.js";

export class Ray {

    constructor() {}

    /**
     * @param {number} rayAngle
     * @param {Point} point
     * @param {number} TraysLength
     * @return {{hit: Point, distance: number}} trays travel distance
     */
    static cast(rayAngle, point, TraysLength = 400) {
        let startPoint = point.copy();
        let dx = Math.cos(rayAngle);
        let dy = Math.sin(rayAngle);

        // Increment x and y until we hit a wall
        let i = 0;
        while (GameMap.getInstance().getPoint(point) === 0) {
            point.add(dx * .1, dy * .1);
            i++;
            if (i > TraysLength) break;  // Prevent infinite loops
        }

        return {distance: Point.pythagoras(point, startPoint), hit: point};
    }

}