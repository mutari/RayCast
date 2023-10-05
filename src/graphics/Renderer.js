import {Window} from "../Window.js";
import {Ray} from "./Raycaster.js";
import {Settings} from "../Settings.js";
import {GameMap} from "../map/GameMap.js";

export class Renderer {

    static #instance;

    constructor() {}

    static getInstance() {
        if(!this.#instance)
            this.#instance = new Renderer();
        return this.#instance;
    }

    /**
     * @param {CanvasRenderingContext2D} graphics
     */
    static draw(graphics) {
        // Sky
        graphics.fillStyle = `rgb(20, 0, 20)`;
        graphics.fillRect(0, 0, Window.getInstance().getWidth(), Window.getInstance().getHeight() / 2);

        // Floor
        graphics.fillStyle = `rgb(60, 0, 60)`;
        graphics.fillRect(0, Window.getInstance().getHeight() / 2, Window.getInstance().getWidth(), Window.getInstance().getHeight() / 2);
    }

    /**
     * @param {CanvasRenderingContext2D} graphics
     * @param {Point} point
     * @param {number} fov
     * @param {number} angle
     */
    static raycast(graphics, point, fov, angle) {
        const rays = Settings.wallCount;
        const sliceWidth = Window.getInstance().getWidth() / rays;
        const angleStep = fov / rays;

        // Walls
        for (let i = 0; i < rays; i++) {
            const rayAngle = angle - (fov / 2) + i * angleStep;
            const {distance, hit} = Ray.cast(rayAngle, point.copy());
            Renderer.drawWallSlice(graphics, i, distance, sliceWidth, hit);
        }
    }

    static drawWallSlice(graphics, i, distance, sliceWidth, point) {
        const wallHeight = Settings.wallHeight / distance;
        const ditherPatternSize = 15;
        const darknessFactor = 1 + (distance / 4);

        for(let j = 0; j < wallHeight; j++) {
            let yPosition = Math.floor((Window.getInstance().getHeight() / 2) - wallHeight / 2 + j);

            let dither = ((i + yPosition) % ditherPatternSize < ditherPatternSize / 2) ? 10 : 0;

            let baseColor = 180 + dither;
            let adjustedColor = Math.floor(baseColor / darknessFactor);

            let wallId = GameMap.getInstance().getPoint(point);

            if(wallId === 1)
                graphics.fillStyle = `rgb(${adjustedColor}, 0, ${adjustedColor})`;
            else if(wallId === 2)
                graphics.fillStyle = `rgb(0, ${adjustedColor}, 0)`;
            else if(wallId === 3)
                graphics.fillStyle = `rgb(0, 0, ${adjustedColor})`;
            else if(wallId === 4)
                graphics.fillStyle = `rgb(${adjustedColor}, 0, 0)`;
            graphics.fillRect(i * sliceWidth, yPosition, sliceWidth, 1);
        }
    }

}