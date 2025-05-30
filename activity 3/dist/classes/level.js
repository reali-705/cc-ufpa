export class Level {
    constructor(maxPorcos = 10) {
        this.porcos = [];
        this.passaros = [];
        this.pontuacao = 0;
        if (maxPorcos < 5)
            maxPorcos = 5;
    }
}
