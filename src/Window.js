export class Window {

    static #instance;

    #canvas;
    #ctx;

    #width;
    #height;

    #focused = true;

    constructor() {
        this.#canvas = this.#getCanvasElement();
        this.#ctx = this.#canvas.getContext('2d');
        this.setDimensions(window.innerWidth, window.innerHeight);
        this.init();
    }

    /**
     * @return {Window}
     */
    static getInstance() {
        if(!this.#instance)
            this.#instance = new Window();
        return this.#instance;
    }

    isFocused() {
        return this.#focused
    }

    init() {
        window.addEventListener('resize', event => {
            this.setDimensions(event.target.innerWidth, event.target.innerHeight);
        })

        this.#canvas.addEventListener('focus', () => this.#focused = true);
        this.#canvas.addEventListener('blur', () => this.#focused = false);
    }

    /**
     * @return {HTMLCanvasElement}
     */
    #getCanvasElement() {
        return document.querySelector('canvas');
    }

    /**
     * @param {number} width
     * @param {number} height
     */
    setDimensions(width, height) {
        this.#canvas.width = this.#width = width;
        this.#canvas.height = this.#height = height;
    }

    getWidth() {
        return this.#width;
    }

    getHeight() {
        return this.#height;
    }

    getContext() {
        return this.#ctx;
    }

    clear() {
        this.getContext().clearRect(0, 0, this.#width, this.#height);
    }

}