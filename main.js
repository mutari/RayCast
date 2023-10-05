class Raycaster {

    constructor() {
        this.canvas = document.querySelector('canvas');
        this.canvas.tabIndex = 0;
        this.ctx = this.canvas.getContext('2d');
        this.height = 0;
        this.width = 0;
        this.wallHeight = 300;
        this.wallCount = 200;
        this.player = {
            x: 1,
            y: 1,
            angle: 1,
            fov: Math.PI / 4
        };
        this.keyState = {};
        this.map = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 1],
            [1, 0, 0, 1, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];

        this.setDimensions(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', event => {
            this.setDimensions(window.innerWidth, window.innerHeight);
        })

        document.addEventListener('keydown', function (event) {
            this.keyState[event.code] = true;
        }.bind(this));

        document.addEventListener('keyup', function (event) {
            this.keyState[event.code] = false;
        }.bind(this));

        this.canvas.addEventListener('focus', () => this.focused = true);
        this.canvas.addEventListener('blur', () => this.focused = false);

        this.gameLoop = this.gameLoop.bind(this);
        this.gameLoop();
    }

    setDimensions(width, height) {
        this.canvas.width = this.width = width;
        this.canvas.height = this.height = height;
    }

    castRay(rayAngle) {
        let x = this.player.x;
        let y = this.player.y;
        let dx = Math.cos(rayAngle);
        let dy = Math.sin(rayAngle);

        // Increment x and y until we hit a wall
        let i = 0;
        while (this.map[Math.floor(y)][Math.floor(x)] === 0) {
            x += dx * 0.1;
            y += dy * 0.1;
            i++;
            if (i > 400) break;  // Prevent infinite loops
        }

        const distance = Math.sqrt((x - this.player.x) ** 2 + (y - this.player.y) ** 2);
        const wallHeight = this.wallHeight/ distance;

        return { distance, wallHeight };
    }

    drawWallSlice(i, distance, wallHeight, sliceWidth) {
        const ditherPatternSize = 15;
        const darknessFactor = 1 + (distance / 4);

        for(let j = 0; j < wallHeight; j++) {
            let yPosition = Math.floor((this.height / 2) - wallHeight / 2 + j);

            let dither = ((i + yPosition) % ditherPatternSize < ditherPatternSize / 2) ? 10 : 0;

            let baseColor = 180 + dither;
            let adjustedColor = Math.floor(baseColor / darknessFactor);

            this.ctx.fillStyle = `rgb(${adjustedColor}, 0, ${adjustedColor})`;
            this.ctx.fillRect(i * sliceWidth, yPosition, sliceWidth, 1);
        }
    }

    raycast() {
        const rays = this.wallCount;
        const sliceWidth = this.width / rays;
        const angleStep = this.player.fov / rays;

        // Sky
        this.ctx.fillStyle = `rgb(20, 0, 20)`;
        this.ctx.fillRect(0, 0, this.width, this.height/2);

        // Floor
        this.ctx.fillStyle = `rgb(60, 0, 60)`;
        this.ctx.fillRect(0, this.height/2, this.width, this.height/2);

        // Walls
        for (let i = 0; i < rays; i++) {
            const rayAngle = this.player.angle - (this.player.fov / 2) + i * angleStep;
            const { distance, wallHeight } = this.castRay(rayAngle);
            this.drawWallSlice(i, distance, wallHeight, sliceWidth);
        }
    }

    isPlayerTouchingWall() {
        const floorX = Math.floor(this.player.x);
        const floorY = Math.floor(this.player.y);

        if (floorX < 0 || floorX >= this.map[0].length || floorY < 0 || floorY >= this.map.length)
            return true; // Consider out-of-bounds as 'wall'

        return this.map[floorY][floorX] !== 0;
    }

    updatePlayer() {
        const speed = 0.025;
        const angularSpeed = 0.025;
        const oldX = this.player.x; const oldY = this.player.y;

        if (this.keyState["KeyW"]) {
            this.player.x += Math.cos(this.player.angle) * speed;
            this.player.y += Math.sin(this.player.angle) * speed;
        }
        if (this.keyState["KeyS"]) {
            this.player.x -= Math.cos(this.player.angle) * speed;
            this.player.y -= Math.sin(this.player.angle) * speed;
        }
        if (this.keyState["KeyA"]) {
            this.player.angle -= angularSpeed;
        }
        if (this.keyState["KeyD"]) {
            this.player.angle += angularSpeed;
        }

        // Keep the angle between 0 and 2*PI
        if (this.player.angle < 0) this.player.angle += 2 * Math.PI;
        if (this.player.angle >= 2 * Math.PI) this.player.angle -= 2 * Math.PI;

        if (this.isPlayerTouchingWall()) {
            this.player.x = oldX;
            this.player.y = oldY;
        }
    };

    drawMiniMap() {
        const miniMapSize = 100;
        const offsetX = this.width - miniMapSize;
        const offsetY = 0;
        const visibleCells = 7; // How much area around the player to show

        const playerCellX = Math.floor(this.player.x);
        const playerCellY = Math.floor(this.player.y);

        const xStart = Math.max(0, playerCellX - Math.floor(visibleCells / 2));
        const xEnd = Math.min(this.map[0].length, playerCellX + Math.ceil(visibleCells / 2));
        const yStart = Math.max(0, playerCellY - Math.floor(visibleCells / 2));
        const yEnd = Math.min(this.map.length, playerCellY + Math.ceil(visibleCells / 2));

        const windowWidth = xEnd - xStart;
        const windowHeight = yEnd - yStart;

        const miniMapScaleX = miniMapSize / windowWidth;
        const miniMapScaleY = miniMapSize / windowHeight;

        // Draw the map
        for (let y = yStart; y < yEnd; y++) {
            for (let x = xStart; x < xEnd; x++) {
                const wall = this.map[y][x];
                this.ctx.fillStyle = wall ? 'rgb(255,0,255)' : 'rgb(0, 0, 0)';
                this.ctx.fillRect((x - xStart) * miniMapScaleX + offsetX, (y - yStart) * miniMapScaleY + offsetY, miniMapScaleX, miniMapScaleY);
            }
        }

        // Draw the player
        const playerMapX = this.player.x - xStart;
        const playerMapY = this.player.y - yStart;
        this.ctx.fillStyle = 'rgb(200, 200, 200)';
        this.ctx.beginPath();
        this.ctx.arc(playerMapX * miniMapScaleX + offsetX, playerMapY * miniMapScaleY + offsetY, miniMapScaleX / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw a line indicating the player's direction
        const dirLength = 2;
        const dirX = Math.cos(this.player.angle) * dirLength;
        const dirY = Math.sin(this.player.angle) * dirLength;
        this.ctx.strokeStyle = 'rgb(200, 200, 200)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(playerMapX * miniMapScaleX + offsetX, playerMapY * miniMapScaleY + offsetY);
        this.ctx.lineTo((playerMapX + dirX) * miniMapScaleX + offsetX, (playerMapY + dirY) * miniMapScaleY + offsetY);
        this.ctx.stroke();
    }

    // Update gameLoop function to include updatePlayer
    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update player state based on key presses
        if (this.focused) this.updatePlayer();

        // Rendering logic
        this.raycast();

        // Rendering Map
        this.drawMiniMap();

        requestAnimationFrame(this.gameLoop);
    }
}

const RC01 = new Raycaster();