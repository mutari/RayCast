export class Random {

    #seed = +new Date();
    #generator;

    constructor(seed) {
        this.#seed = seed;
        this.#generator = this.init(this.#seed);
    }

    getInt() {
        return this.#generator(1000);
    }

    getFloat() {
        let max = 1000000;
        return this.#generator(max) / max;
    }

    init(state1, state2) {
        let mod1 = 4294967087;
        let mul1 = 65539;
        let mod2 = 4294965887;
        let mul2 = 65537;

        (typeof state1 != "number") && (state1 = this.#seed);
        (typeof state2 != "number") && (state2 = state1);
        state1 = state1 % (mod1 - 1) + 1
        state2 = state2 % (mod2 - 1) + 1

        function random(limit) {
            state1 = (state1 * mul1) % mod1
            state2 = (state2 * mul2) % mod2
            if (state1 < limit && state2 < limit && state1 < mod1 % limit && state2 < mod2 % limit) {
                return random(limit)
            }
            return (state1 + state2) % limit
        }

        return random
    }

}