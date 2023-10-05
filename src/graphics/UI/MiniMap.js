import {Point} from "../../utility/Point.js";
import {UIElement} from "./UIElement.js";
import {GameMap} from "../../map/GameMap.js";
import {Dimension} from "../../utility/Dimension.js";

export class MiniMap extends UIElement {

    player;

    /**
     * @param {Point} position
     * @param dimension
     */
    constructor(position, dimension) {
        super();
        this.setId('MiniMap');
        this.setPosition(position);
        this.setDimension(dimension);
    }

    setPlayer(player) {
        this.player = player;
    }

    draw(graphics) {
        const visibleCells = 7; // How much area around the player to show

        const playerCellX = Math.floor(this.player.getPosition().x);
        const playerCellY = Math.floor(this.player.getPosition().y);

        const xStart = Math.max(0, playerCellX - Math.floor(visibleCells / 2));
        const xEnd = Math.min(GameMap.getInstance().getMap()[0].length, playerCellX + Math.ceil(visibleCells / 2));
        const yStart = Math.max(0, playerCellY - Math.floor(visibleCells / 2));
        const yEnd = Math.min(GameMap.getInstance().getMap().length, playerCellY + Math.ceil(visibleCells / 2));

        const windowWidth = xEnd - xStart;
        const windowHeight = yEnd - yStart;

        const miniMapScaleX = this.dimension.width / windowWidth;
        const miniMapScaleY = this.dimension.height / windowHeight;

        // Draw the map
        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const wall = GameMap.getInstance().getPoint(new Point(x, y));
                graphics.fillStyle = wall ? 'rgb(255,0,255)' : 'rgb(0, 0, 0)';
                graphics.fillRect((x - xStart) * miniMapScaleX + this.position.x, (y - yStart) * miniMapScaleY + this.position.y, miniMapScaleX, miniMapScaleY);
            }
        }

        // Draw the player
        const playerMapX = this.player.getPosition().x - xStart;
        const playerMapY = this.player.getPosition().y - yStart;
        graphics.fillStyle = 'rgb(200, 200, 200)';
        graphics.beginPath();
        graphics.arc(playerMapX * miniMapScaleX + this.position.x, playerMapY * miniMapScaleY + this.position.y, miniMapScaleX / 2, 0, Math.PI * 2);
        graphics.fill();

        // Draw a line indicating the player's direction
        const dirLength = 2;
        const dirX = Math.cos(this.player.angle) * dirLength;
        const dirY = Math.sin(this.player.angle) * dirLength;
        graphics.strokeStyle = 'rgb(200, 200, 200)';
        graphics.lineWidth = 1;
        graphics.beginPath();
        graphics.moveTo(playerMapX * miniMapScaleX + this.position.x, playerMapY * miniMapScaleY + this.position.y);
        graphics.lineTo((playerMapX + dirX) * miniMapScaleX + this.position.x, (playerMapY + dirY) * miniMapScaleY + this.position.y);
        graphics.stroke();
    }

}