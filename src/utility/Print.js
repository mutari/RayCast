export class Print {

    static log = [];

    static ones(text, id = "print") {
        if(!this.log[id])
            console.log(text)
        this.log[id] = true;
    }

}