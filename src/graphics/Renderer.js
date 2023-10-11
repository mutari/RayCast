import {Window} from "../Window.js";
import {Ray} from "./Raycaster.js";
import {Settings} from "../Settings.js";
import {GameMap} from "../map/GameMap.js";
import {Point} from "../utility/Point.js";
import {Print} from "../utility/Print.js";
import {Brick} from "./texture/texture/Brick.js";
import {Wood} from "./texture/texture/Wood.js";

export class Renderer {

    static #instance;
    static #rand;

    static brick = new Brick();
    static wood = new Wood();

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

    static startOfWall = null;

    static drawWallSlice(graphics, i, distance, sliceWidth, point) {
        const wallHeight = Settings.wallHeight / distance;
        const ditherPatternSize = 15;
        const darknessFactor = 1 + (distance / 4);

        const wallPixels = wallHeight / sliceWidth;

        for(let j = 0; j < wallPixels; j++) {
            let yPosition = Math.floor((Window.getInstance().getHeight() / 2) - wallHeight / 2 + j * sliceWidth);

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
            else if(wallId === 4) {
                if(this.startOfWall === null)
                    this.startOfWall = i;
                let x = this.startOfWall > 0 ? i - this.startOfWall : this.startOfWall - i;
                const pixel = Renderer.brick.getPixel(new Point(x, j), distance > 5 ? 'sm' : 'md');
                Print.ones(wallHeight)
                graphics.fillStyle = pixel.getColor();
            }
            else if(wallId === 5) {
                if(this.startOfWall === null)
                    this.startOfWall = i;
                let x = this.startOfWall > 0 ? i - this.startOfWall : this.startOfWall - i;
                const pixel = Renderer.wood.getPixel(new Point(x, j), distance > 5 ? 'sm' : 'md');
                Print.ones(wallHeight)
                graphics.fillStyle = pixel.getColor();
            }
            graphics.fillRect(i * sliceWidth, yPosition, sliceWidth + 1, sliceWidth + 1);
        }
    }

    static #getRandomRgb() {
        const num = Math.round(0xffffff * this.#rand.getFloat());
        const r = num >> 16, g = num >> 8 & 255, b = num & 255;
        return `rgb(${r}, ${g}, ${b})`;
    }

    static #getRandomColor() {
        return `#${Math.floor(this.#rand.getFloat() * 16777215).toString(16)}`;
    }

}