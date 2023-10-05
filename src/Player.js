import {Point} from "./utility/Point.js";
import {GameMap} from "./map/GameMap.js";
import {Settings} from "./Settings.js";

/**
 * @property {Point} position
 * @property {number} angle
 * @property {number} fov
 */
export class Player {

    #keyState = {};

    constructor() {
        this.position = Settings.startPosition;
        this.angle = Settings.angle;
        this.fov = Settings.fov
        this.speed = Settings.speed;
        this.angularSpeed = Settings.speed;
        this.init();
    }

    getPosition() {
        return this.position;
    }

    init() {
        document.addEventListener('keydown', function (event) {
            this.#keyState[event.code] = true;
        }.bind(this));

        document.addEventListener('keyup', function (event) {
            this.#keyState[event.code] = false;
        }.bind(this));
    }

    update() {
        const oldX = this.getPosition().x;
        const oldY = this.getPosition().y;

        if (this.#keyState["KeyW"]) {
            this.getPosition().x += Math.cos(this.angle) * this.speed;
            this.getPosition().y += Math.sin(this.angle) * this.speed;
        }
        if (this.#keyState["KeyS"]) {
            this.getPosition().x -= Math.cos(this.angle) * this.speed;
            this.getPosition().y -= Math.sin(this.angle) * this.speed;
        }
        if (this.#keyState["KeyA"]) {
            this.angle -= this.angularSpeed;
        }
        if (this.#keyState["KeyD"]) {
            this.angle += this.angularSpeed;
        }

        // Keep the angle between 0 and 2*PI
        if (this.angle < 0) this.angle += 2 * Math.PI;
        if (this.angle >= 2 * Math.PI) this.angle -= 2 * Math.PI;

        if (GameMap.getInstance().collision(this.getPosition())) {
            this.getPosition().set(oldX, oldY)
        }
    }

}