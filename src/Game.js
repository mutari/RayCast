import {Window} from "./Window.js";
import {Player} from "./Player.js";
import {GameMap} from "./map/GameMap.js";
import {Point} from "./utility/Point.js";
import {Renderer} from "./graphics/Renderer.js";
import {MiniMap} from "./graphics/UI/MiniMap.js";
import {Dimension} from "./utility/Dimension.js";
import {UIManager} from "./graphics/UI/UIManager.js";
import {Label} from "./graphics/UI/text/Label.js";

export class Game {

    window;
    player;
    gameMap;
    fpsLabel;

    constructor() {
        this.window = Window.getInstance();
        this.gameMap = GameMap.getInstance();
        this.player = new Player();

        let dimension = new Dimension(100, 100);
        this.miniMap = new MiniMap(new Point(this.window.getWidth() - dimension.getWidth(), 0), dimension);
        this.miniMap.setPlayer(this.player);
        UIManager.add(this.miniMap);

        this.fpsLabel = new Label('fps: 0');
        this.fpsLabel.setPosition(new Point(10, 15));
        UIManager.add(this.fpsLabel)

        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoop();

        document.addEventListener('keydown', function (event) {
            if(event.key === 'k') {
                this.draw = !this.draw;
                console.log(this.draw ? 'unpause' : 'pause');
            }
        }.bind(this));
    }

    draw = true;
    times = [];
    fps;

    gameLoop() {
        const now = performance.now();
        while (this.times.length > 0 && this.times[0] <= now - 1000) {
            this.times.shift();
        }
        this.times.push(now);
        this.fps = this.times.length;
        this.fpsLabel.setText(`fps: ${this.fps}`);

        if(this.draw) {
            this.window.clear();

            if(this.window.isFocused()) this.player.update();

            Renderer.draw(this.window.getContext());
            Renderer.raycast(this.window.getContext(), this.player.getPosition(), this.player.fov, this.player.angle);
            UIManager.draw(this.window.getContext());
        }

        requestAnimationFrame(this.gameLoop)
    }

}