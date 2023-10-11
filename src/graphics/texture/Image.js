export class Image {

    #texture;

    /**
     * @param {Texture} texture
     */
    constructor(texture) {
        this.#texture = texture;
    }

    getTexture() {
        return this.#texture;
    }

}