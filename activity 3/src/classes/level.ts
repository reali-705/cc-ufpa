import { Porco } from "./porco.js";
import { Passaro } from "./passaro.js";

export class Level {
    public porcos: Porco[] = [];
    public passaros: Passaro[] = [];
    public pontuacao: number = 0;

    constructor(maxPorcos: number = 10) {
        if (maxPorcos < 5) maxPorcos = 5;
            
    }
}