export class GameMap {

    static #instance = null;
    #map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 4, 0, 0, 0, 0, 0, 4, 0, 1],
        [1, 0, 3, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1],
        [1, 0, 5, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 2, 0, 0, 0, 0, 0, 2, 0, 1],
        [1, 0, 3, 0, 0, 0, 0, 0, 3, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 4, 3, 4, 5, 2, 3, 4, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    static getInstance() {
        if(!this.#instance)
            this.#instance = new GameMap();
        return this.#instance;
    }

    getMap() {
        return this.#map;
    }

    /**
     * @param {Point} point
     * @return {number}
     */
    getPoint(point) {
        point = point.floor();
        return this.getMap()[point.y][point.x]
    }

    /**
     *
     * @param {Point} point
     * @return {boolean}
     */
    collision(point) {
        point = point.floor();
        if (point.x < 0 || point.x >= this.#map[0].length || point.y < 0 || point.y >= this.#map.length)
            return true; // Consider out-of-bounds
        return this.getPoint(point) !== 0;
    }

}